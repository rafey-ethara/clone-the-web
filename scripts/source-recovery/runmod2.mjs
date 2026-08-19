import { readFileSync, writeFileSync } from 'node:fs';
import { serialize, balanced } from './jsxconv.mjs';

const SP = process.env.SP;
const [chunkFile, modId, outFile] = process.argv.slice(2);
const T = readFileSync(`${SP}/chunks/${chunkFile}`, 'utf8');

// locate `,<modId>[,<id>...],<param>=>{` — factory param name varies per chunk (e, o, ...)
let sm = null, PARAM = 'e';
for (let p = T.indexOf(',' + modId); p !== -1; p = T.indexOf(',' + modId, p + 1)) {
  let q = p + 1 + modId.length;
  while (T[q] === ',' && /[0-9]/.test(T[q + 1] || '')) { q++; while (/[0-9]/.test(T[q])) q++; }
  const m = /^,([A-Za-z_$][w$]*)=>{/.exec(T.slice(q, q + 24));
  if (m) { PARAM = m[1]; sm = { index: p, 0: T.slice(p, q + m[0].length) }; break; }
}
if (!sm) throw new Error('module not found');
const braceIdx = sm.index + sm[0].length - 1; // the '{' of e=>{
const bodyEnd = balanced(T, braceIdx);
let body = T.slice(braceIdx + 1, bodyEnd - 1);
body = body.replace(/^"use strict";/, '');

const ARR = new Set(['map', 'slice', 'filter', 'forEach', 'flatMap', 'concat', 'join', 'find']);
const magic = (path) => new Proxy(function () {}, {
  get(_, k) {
    if (k === Symbol.toPrimitive || k === 'toString') return () => `\u0000${path}\u0000`;
    if (k === Symbol.iterator) return function* () { yield magic(path + '[0]'); };
    if (k === '__path') return path;
    if (k === 'length') return 1;
    if (typeof k === 'symbol') return undefined;
    if (ARR.has(k)) return (fn) => {
      if (k === 'map' || k === 'flatMap') return [fn(magic(path + '[0]'), 0, magic(path))];
      if (k === 'forEach') { fn(magic(path + '[0]'), 0, magic(path)); return undefined; }
      if (k === 'join') return `\u0000${path}\u0000`;
      if (k === 'find') return magic(path + '[0]');
      return magic(path);
    };
    return magic(path ? `${path}.${k}` : String(k));
  },
  apply: () => magic(path + '()'),
});

const jsxImpl = (type, props, key) => ({ __el: true, type, props: props || {}, key });
const realS = new Proxy({}, { get: (_, k) =>
  (k === 'jsx' || k === 'jsxs' || k === 'jsxDEV') ? jsxImpl : (k === 'Fragment' ? magic('React.Fragment') : magic('s.' + String(k))) });

const EXPORTS = {};
const e = {
  i: (id) => (id === 462361 ? realS : magic('m' + id)),
  v: (o) => o,
  n: (o) => o,
  g: {},
  A: () => Promise.resolve(magic("asyncMod")),
  l: () => Promise.resolve(),
  r: (o) => o,
  e: (o) => o,
  s: (spec) => { if (Array.isArray(spec)) for (let i = 0; i < spec.length; i += 3) EXPORTS[spec[i]] = spec[i + 2]; },
};

const scope = new Proxy({}, {
  has: (_, k) => k !== PARAM,
  get: (t, k) => { if (k === Symbol.unscopables) return undefined; if (k in t) return t[k]; return magic(String(k)); },
  set: (t, k, v) => { t[k] = v; return true; },
});

new Function(PARAM, '__scope', `with(__scope){ ${body} }`)(e, scope);

const names = Object.keys(EXPORTS);
console.log('exports:', names.join(', ') || '(none)');
let out = '';
for (const n of names) {
  const f = EXPORTS[n];
  if (typeof f !== 'function') continue;
  let tree;
  try { tree = f(magic('props')); } catch (err) { out += `\n// ${n}: ERR ${err.message}\n`; continue; }
  out += `\n// ===== export: ${n} =====\n` + serialize(tree, 0) + '\n';
}
writeFileSync(`${SP}/${outFile}`, out);
console.log('wrote', outFile, out.length, 'chars');
