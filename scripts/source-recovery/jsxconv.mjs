// Convert minified React.jsx() calls recovered from a Next.js chunk back into readable JSX source.
import { readFileSync } from 'node:fs';

const SRC = readFileSync(process.env.SP + '/chunks/0mokd9d27eek8.js', 'utf8');

/** Scan a balanced expression starting at `i` (which must point at '('). Returns end index (exclusive). */
export function balanced(src, i) {
  const open = '([{', close = ')]}';
  const stack = [];
  let q = null, prev = '';
  const REGEX_PREV = '(,=:[!&|?{};+-*%~^<>';
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) {
      if (c === String.fromCharCode(92)) { i++; continue; }
      if (c === q) q = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { q = c; prev = c; continue; }
    if (c === '/' && REGEX_PREV.includes(prev)) {
      // regex literal: skip to unescaped closing '/' (bracket-aware)
      let inClass = false;
      for (i++; i < src.length; i++) {
        const d = src[i];
        if (d === String.fromCharCode(92)) { i++; continue; }
        if (d === '[') inClass = true;
        else if (d === ']') inClass = false;
        else if (d === '/' && !inClass) break;
      }
      prev = '/';
      continue;
    }
    if (open.includes(c)) stack.push(c);
    else if (close.includes(c)) {
      const want = open[close.indexOf(c)];
      if (stack[stack.length - 1] !== want) throw new Error('unbalanced at ' + i);
      stack.pop();
      if (!stack.length) return i + 1;
    }
    if (!/s/.test(c)) prev = c;
  }
  throw new Error('eof');
}

/** Magic proxy: any identifier / property path resolves and records itself. */
const magic = (path) => new Proxy(function () {}, {
  get(_, k) {
    if (k === Symbol.toPrimitive || k === 'toString') return () => `\u0000${path}\u0000`;
    if (k === '__path') return path;
    if (typeof k === 'symbol') return undefined;
    return magic(path ? `${path}.${k}` : String(k));
  },
  apply: () => magic(path + '()'),
});

const scope = new Proxy({}, {
  has: () => true,
  get: (_, k) => {
    if (k === '__J') return (type, props, key) => ({ __el: true, type, props: props || {}, key });
    if (k === Symbol.unscopables) return undefined;
    return magic(String(k));
  },
});

/** Evaluate a recovered JSX expression into an element tree. */
export function evalJsx(expr) {
  const code = expr.replace(/\(0,\s*[A-Za-z_$][\w$]*\.jsxs?\)\(/g, '__J(')
                   .replace(/\(0,\s*[A-Za-z_$][\w$]*\.jsxDEV\)\(/g, '__J(');
  // eslint-disable-next-line no-new-func
  const fn = new Function('__scope', `with(__scope){ return (${code}); }`);
  return fn(scope);
}

const MARK = /\u0000([^\u0000]*)\u0000/;
const isEl = (v) => v && typeof v === 'object' && v.__el;
const pathOf = (v) => (v && (typeof v === 'object' || typeof v === 'function') && v.__path) || null;

function compName(v) {
  const p = pathOf(v);
  if (!p) return 'Unknown';
  const parts = p.split('.');
  let n = parts[parts.length - 1];
  if (n === 'default') n = parts[parts.length - 2] || 'Default';
  if (n === 'Fragment') return '';
  return n[0].toUpperCase() + n.slice(1);
}

function valToJsx(v, ind) {
  if (typeof v === 'string') {
    const m = v.match(MARK);
    if (m) return `{${cls(m[1])}}`;
    return JSON.stringify(v);
  }
  if (typeof v === 'number' || typeof v === 'boolean') return `{${v}}`;
  if (v === null || v === undefined) return `{${String(v)}}`;
  const p = pathOf(v);
  if (p) return `{${cls(p)}}`;
  if (typeof v === 'function') return '{null}';
  if (Array.isArray(v)) return `{[${v.map((x) => valToJsx(x, ind)).join(', ')}]}`;
  if (typeof v === 'object') {
    const inner = Object.entries(v).map(([k, x]) => `${JSON.stringify(k)}: ${valToJsx(x, ind).replace(/^\{|\}$/g, '')}`);
    return `{{ ${inner.join(', ')} }}`;
  }
  return `{null}`;
}

/** CSS-module path -> styles.x ; component path -> Name */
function cls(p) {
  const parts = p.split('.');
  if (parts.length >= 2 && parts[parts.length - 2] === 'default') return `styles.${parts[parts.length - 1]}`;
  if (parts[parts.length - 1] === 'default') return compName({ __path: p });
  return `styles.${parts[parts.length - 1]}`;
}

function classNameVal(v) {
  if (typeof v === 'string') {
    if (!MARK.test(v)) return JSON.stringify(v);
    // template with markers -> template literal
    const lit = v.replace(/\u0000([^\u0000]*)\u0000/g, (_, p) => '${' + cls(p) + '}');
    return '{`' + lit + '`}';
  }
  const p = pathOf(v);
  if (p) return `{${cls(p)}}`;
  return valToJsx(v);
}

export function serialize(node, depth = 0) {
  const pad = '  '.repeat(depth);
  if (node === null || node === undefined || node === false) return '';
  if (typeof node === 'string') {
    const m = node.match(MARK);
    if (m) return pad + `{${cls(m[1])}}`;
    return pad + node.replace(/([{}])/g, '{"$1"}');
  }
  if (typeof node === 'number') return pad + String(node);
  if (Array.isArray(node)) return node.map((n) => serialize(n, depth)).filter(Boolean).join('\n');
  if (!isEl(node)) {
    const p = pathOf(node);
    return p ? pad + `{${cls(p)}}` : '';
  }

  const tag = typeof node.type === 'string' ? node.type : compName(node.type);
  const { children, ...props } = node.props;

  const attrs = Object.entries(props).map(([k, v]) => {
    if (k === 'className') return `${k}=${classNameVal(v)}`;
    if (typeof v === 'string' && !MARK.test(v)) return `${k}=${JSON.stringify(v)}`;
    return `${k}=${valToJsx(v, depth)}`;
  });

  const open = tag === '' ? '<>' : `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  const closeTag = tag === '' ? '</>' : `</${tag}>`;

  const kids = children === undefined ? null : serialize(children, depth + 1);
  if (!kids) return pad + (tag === '' ? '<></>' : open + ' />');
  return `${pad}${open}${tag === '' ? '' : '>'}\n${kids}\n${pad}${closeTag}`;
}

/** Extract + convert the JSX expression that begins at the first `(0,x.jsx` at/after `from`. */
export function convertAt(from) {
  const m = /\(0,\s*[A-Za-z_$][\w$]*\.jsxs?\)\(/g;
  m.lastIndex = from;
  const hit = m.exec(SRC);
  if (!hit) throw new Error('no jsx call after ' + from);
  const parenIdx = hit.index + hit[0].length - 1;
  const end = balanced(SRC, parenIdx);
  const expr = SRC.slice(hit.index, end);
  return serialize(evalJsx(expr), 0);
}

export { SRC };
