# Design tokens — complete, untruncated dump

Every custom property declared on `:root` across all 12 stylesheets, with the value
as authored and the value as resolved by `getComputedStyle(document.documentElement)`.
**383 properties** were found. Nothing here is sampled or abbreviated.

Four de-branding substitutions are applied to this table, and only these four:

- the vendor design-system prefix is rewritten to `--ds-*`
- a radius token named after the company is rewritten to `--radius-card`
- a surface token carrying the company initials is rewritten to `--color-surface-ops`
- the three shipped font-family names are rewritten to the tokens that replace them
  (see `typography.md` and `../notes.md` for the substitution and what it costs)

Everything else — every colour, size, duration, easing and radius value — is verbatim.

| Property | Authored value | Resolved value |
|---|---|---|
| `--font-sans` | `var(--font-body), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` | `var(--font-body), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `--font-mono` | `var(--font-mono-primary), "monospace", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` | `var(--font-mono-primary), "monospace", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |
| `--color-red-50` | `#fef2f2` | `lab(96.5005% 4.18508 1.52328)` |
| `--color-red-100` | `#ffe2e2` | `lab(92.243% 10.2865 3.83865)` |
| `--color-red-200` | `#ffcaca` | `lab(86.017% 19.8815 7.75869)` |
| `--color-red-400` | `#ff6568` | `lab(63.7053% 60.745 31.3109)` |
| `--color-red-500` | `#fb2c36` | `lab(55.4814% 75.0732 48.8528)` |
| `--color-red-600` | `#e40014` | `lab(48.4493% 77.4328 61.5452)` |
| `--color-red-700` | `#bf000f` | `lab(40.4273% 67.2623 53.7441)` |
| `--color-red-800` | `#9f0712` | `lab(33.7174% 55.8993 41.0293)` |
| `--color-orange-100` | `#ffedd5` | `lab(94.7127% 3.58394 14.3151)` |
| `--color-orange-400` | `#ff8b1a` | `lab(70.0429% 42.5156 75.8207)` |
| `--color-amber-50` | `#fffbeb` | `lab(98.6252% -.635922 8.42309)` |
| `--color-amber-500` | `#f99c00` | `lab(72.7183% 31.8672 97.9407)` |
| `--color-amber-600` | `#dd7400` | `lab(60.3514% 40.5624 87.1228)` |
| `--color-amber-700` | `#b75000` | `lab(47.2709% 42.9082 69.2966)` |
| `--color-amber-800` | `#953d00` | `lab(37.8822% 37.1699 52.2718)` |
| `--color-yellow-200` | `#fff085` | `lab(94.3433% -5.00429 52.9663)` |
| `--color-yellow-300` | `#ffe02a` | `lab(89.7033% -.480294 84.4917)` |
| `--color-green-50` | `#f0fdf4` | `lab(98.1563% -5.60117 2.75915)` |
| `--color-green-100` | `#dcfce7` | `lab(96.1861% -13.8464 6.52365)` |
| `--color-green-200` | `#b9f8cf` | `lab(92.4222% -26.4702 12.9427)` |
| `--color-green-400` | `#05df72` | `lab(78.503% -64.9265 39.7492)` |
| `--color-green-500` | `#00c758` | `lab(70.5521% -66.5147 45.8073)` |
| `--color-green-600` | `#00a544` | `lab(59.0978% -58.6621 41.2579)` |
| `--color-green-700` | `#008138` | `lab(47.0329% -47.0239 31.4788)` |
| `--color-emerald-500` | `#00bb7f` | `lab(66.9756% -58.27 19.5419)` |
| `--color-blue-500` | `#3080ff` | `lab(54.1736% 13.3369 -74.6839)` |
| `--color-blue-600` | `#155dfc` | `lab(44.0605% 29.0279 -86.0352)` |
| `--color-violet-300` | `#c4b4ff` | `lab(76.7419% 18.3911 -37.0706)` |
| `--color-violet-500` | `#8d54ff` | `lab(49.9355% 55.1776 -81.8963)` |
| `--color-violet-600` | `#7f22fe` | `lab(41.088% 68.9966 -91.995)` |
| `--color-rose-600` | `#e70044` | `lab(49.1882% 81.577 36.0311)` |
| `--color-gray-50` | `#f9fafb` | `lab(98.2596% -.247031 -.706708)` |
| `--color-gray-100` | `#f3f4f6` | `lab(96.1596% -.0823438 -1.13575)` |
| `--color-gray-200` | `#e5e7eb` | `lab(91.6229% -.159115 -2.26791)` |
| `--color-gray-300` | `#d1d5dc` | `lab(85.1236% -.612259 -3.7138)` |
| `--color-gray-400` | `#99a1af` | `lab(65.9269% -.832707 -8.17473)` |
| `--color-gray-500` | `#6a7282` | `lab(47.7841% -.393182 -10.0268)` |
| `--color-gray-700` | `#364153` | `lab(27.1134% -.956401 -12.3224)` |
| `--color-gray-800` | `#1e2939` | `lab(16.1051% -1.18239 -11.7533)` |
| `--color-neutral-50` | `#fafafa` | `lab(98.26% 0 0)` |
| `--color-neutral-100` | `#f5f5f5` | `lab(96.52% -.0000298023 .0000119209)` |
| `--color-neutral-200` | `#e5e5e5` | `lab(90.952% 0 -.0000119209)` |
| `--color-neutral-300` | `#d4d4d4` | `lab(84.92% 0 -.0000119209)` |
| `--color-neutral-400` | `#a1a1a1` | `lab(66.128% -.0000298023 .0000119209)` |
| `--color-neutral-500` | `#737373` | `lab(48.496% 0 0)` |
| `--color-neutral-600` | `#525252` | `lab(34.924% 0 0)` |
| `--color-neutral-700` | `#404040` | `lab(27.036% 0 0)` |
| `--color-neutral-800` | `#262626` | `lab(15.204% 0 -.00000596046)` |
| `--color-neutral-900` | `#171717` | `lab(7.78201% -.0000149012 0)` |
| `--color-black` | `#000` | `#000` |
| `--color-white` | `#fff` | `#fff` |
| `--spacing` | `.25rem` | `.25rem` |
| `--breakpoint-sm` | `40rem` | `40rem` |
| `--breakpoint-md` | `48rem` | `48rem` |
| `--breakpoint-lg` | `64rem` | `64rem` |
| `--breakpoint-xl` | `80rem` | `80rem` |
| `--breakpoint-2xl` | `96rem` | `96rem` |
| `--container-xs` | `20rem` | `20rem` |
| `--container-sm` | `24rem` | `24rem` |
| `--container-md` | `28rem` | `28rem` |
| `--container-lg` | `32rem` | `32rem` |
| `--container-xl` | `36rem` | `36rem` |
| `--container-2xl` | `42rem` | `42rem` |
| `--container-3xl` | `48rem` | `48rem` |
| `--container-4xl` | `56rem` | `56rem` |
| `--container-5xl` | `64rem` | `64rem` |
| `--container-6xl` | `72rem` | `72rem` |
| `--container-7xl` | `80rem` | `80rem` |
| `--text-xs` | `14px` | `14px` |
| `--text-xs--line-height` | `18px` | `18px` |
| `--text-sm` | `16px` | `16px` |
| `--text-sm--line-height` | `24px` | `24px` |
| `--text-base` | `18px` | `18px` |
| `--text-base--line-height` | `28px` | `28px` |
| `--text-lg` | `22px` | `22px` |
| `--text-lg--line-height` | `33px` | `33px` |
| `--text-xl` | `26px` | `26px` |
| `--text-xl--line-height` | `36px` | `36px` |
| `--text-2xl` | `40px` | `40px` |
| `--text-2xl--line-height` | `50px` | `50px` |
| `--text-3xl` | `45px` | `45px` |
| `--text-3xl--line-height` | `55px` | `55px` |
| `--text-4xl` | `50px` | `50px` |
| `--text-4xl--line-height` | `60px` | `60px` |
| `--text-5xl` | `62px` | `62px` |
| `--text-5xl--line-height` | `72px` | `72px` |
| `--text-6xl` | `70px` | `70px` |
| `--text-6xl--line-height` | `80px` | `80px` |
| `--text-7xl` | `100px` | `100px` |
| `--text-7xl--line-height` | `106px` | `106px` |
| `--font-weight-thin` | `100` | `100` |
| `--font-weight-normal` | `400` | `400` |
| `--font-weight-medium` | `500` | `500` |
| `--font-weight-semibold` | `600` | `600` |
| `--font-weight-bold` | `700` | `700` |
| `--tracking-tight` | `-.025em` | `-.025em` |
| `--tracking-normal` | `0em` | `0em` |
| `--tracking-wide` | `.025em` | `.025em` |
| `--tracking-wider` | `.05em` | `.05em` |
| `--tracking-widest` | `.1em` | `.1em` |
| `--leading-snug` | `1.375` | `1.375` |
| `--leading-relaxed` | `1.625` | `1.625` |
| `--radius-xs` | `.125rem` | `.125rem` |
| `--radius-sm` | `calc(.5rem - 4px)` | `calc(.5rem - 4px)` |
| `--radius-md` | `calc(.5rem - 2px)` | `calc(.5rem - 2px)` |
| `--radius-lg` | `.5rem` | `.5rem` |
| `--radius-xl` | `.75rem` | `.75rem` |
| `--radius-2xl` | `1rem` | `1rem` |
| `--radius-3xl` | `1.5rem` | `1.5rem` |
| `--ease-in` | `cubic-bezier(.4, 0, 1, 1)` | `cubic-bezier(.4, 0, 1, 1)` |
| `--ease-out` | `cubic-bezier(0, 0, .2, 1)` | `cubic-bezier(0, 0, .2, 1)` |
| `--ease-in-out` | `cubic-bezier(.4, 0, .2, 1)` | `cubic-bezier(.4, 0, .2, 1)` |
| `--animate-spin` | `spin 1s linear infinite` | `spin 1s linear infinite` |
| `--animate-pulse` | `pulse 2s cubic-bezier(.4, 0, .6, 1) infinite` | `pulse 2s cubic-bezier(.4, 0, .6, 1) infinite` |
| `--blur-md` | `12px` | `12px` |
| `--blur-lg` | `16px` | `16px` |
| `--blur-xl` | `24px` | `24px` |
| `--aspect-video` | `16 / 9` | `16 / 9` |
| `--default-transition-duration` | `.15s` | `.15s` |
| `--default-transition-timing-function` | `cubic-bezier(.4, 0, .2, 1)` | `cubic-bezier(.4, 0, .2, 1)` |
| `--default-font-family` | `var(--font-sans)` | `var(--font-body), ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| `--default-mono-font-family` | `var(--font-mono)` | `var(--font-mono-primary), "monospace", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |
| `--animate-in` | `enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease)var(--tw-animation-delay,0s)var(--tw-animation-iteration-count,1)var(--tw-animation-direction,normal)var(--tw-animation-fill-mode,none)` | `enter .15s/**/ease/**/0s/**/1/**/normal/**/none` |
| `--color-ash-100` | `var(--ds-color-ash-100)` | `#e2e0d6` |
| `--color-ash-50` | `var(--ds-color-ash-50)` | `#f1efeb` |
| `--color-black-100` | `var(--ds-color-black-100)` | `#0a0a0a` |
| `--color-black-15` | `var(--ds-color-black-15)` | `#d9d9d9` |
| `--color-black-30` | `var(--ds-color-black-30)` | `#b2b2b2` |
| `--color-black-50` | `var(--ds-color-black-50)` | `#737373` |
| `--color-black-70` | `var(--ds-color-black-70)` | `#4d4d4d` |
| `--color-black-80` | `var(--ds-color-black-80)` | `#333` |
| `--color-bone-100` | `var(--ds-color-bone-100)` | `#f5f3eb` |
| `--color-bone-50` | `#faf9f5` | `#faf9f5` |
| `--color-brand-accent-red` | `var(--ds-color-brand-accent-red)` | `#f0314b` |
| `--color-brand-green` | `var(--ds-color-brand-green)` | `#55f5a3` |
| `--color-button-primary` | `var(--ds-color-button-primary)` | `#0a0a0a` |
| `--color-button-primary-active` | `var(--ds-color-button-primary-active)` | `#333` |
| `--color-button-primary-disabled` | `var(--ds-color-button-primary-disabled)` | `#d9d9d9` |
| `--color-button-primary-edge-active` | `var(--ds-color-button-primary-edge-active)` | `#787365` |
| `--color-button-primary-foreground` | `var(--ds-color-button-primary-foreground)` | `#fff` |
| `--color-button-primary-foreground-disabled` | `var(--ds-color-button-primary-foreground-disabled)` | `#fff` |
| `--color-button-secondary-active` | `var(--ds-color-button-secondary-active)` | `#e2e0d6` |
| `--color-button-secondary-edge` | `var(--ds-color-button-secondary-edge)` | `#e2e0d6` |
| `--color-button-secondary-edge-active` | `var(--ds-color-button-secondary-edge-active)` | `#787365` |
| `--color-button-secondary-foreground` | `var(--ds-color-button-secondary-foreground)` | `#0a0a0a` |
| `--color-button-secondary-foreground-disabled` | `var(--ds-color-button-secondary-foreground-disabled)` | `#b2b2b2` |
| `--color-button-secondary-hover` | `var(--ds-color-button-secondary-hover)` | `#faf9f5` |
| `--color-clay-20` | `var(--ds-color-clay-20)` | `#dcdbd4` |
| `--color-clay-30` | `var(--ds-color-clay-30)` | `#b9b6a9` |
| `--color-clay-50` | `var(--ds-color-clay-50)` | `#787365` |
| `--color-edge-default` | `var(--ds-color-edge-default)` | `#e2e0d6` |
| `--color-edge-interaction` | `var(--ds-color-edge-interaction)` | `#787365` |
| `--color-edge-subtle` | `var(--ds-color-edge-subtle)` | `#f1efeb` |
| `--color-foreground-caution` | `var(--ds-color-foreground-caution)` | `#7b4c00` |
| `--color-foreground-disabled` | `var(--ds-color-foreground-disabled)` | `#b2b2b2` |
| `--color-foreground-negative` | `var(--ds-color-foreground-negative)` | `#a70842` |
| `--color-foreground-ops` | `var(--ds-color-foreground-ops)` | `#6a62bb` |
| `--color-foreground-positive` | `var(--ds-color-foreground-positive)` | `#015a3e` |
| `--color-foreground-primary` | `var(--ds-color-foreground-primary)` | `#0a0a0a` |
| `--color-foreground-secondary` | `var(--ds-color-foreground-secondary)` | `#737373` |
| `--color-garnet-10` | `var(--ds-color-garnet-10)` | `#ffe1d8` |
| `--color-garnet-100` | `var(--ds-color-garnet-100)` | `#680025` |
| `--color-garnet-30` | `var(--ds-color-garnet-30)` | `#ffc4b6` |
| `--color-garnet-50` | `var(--ds-color-garnet-50)` | `#ed505a` |
| `--color-garnet-70` | `var(--ds-color-garnet-70)` | `#a70842` |
| `--color-iris-10` | `var(--ds-color-iris-10)` | `#efefff` |
| `--color-iris-100` | `var(--ds-color-iris-100)` | `#443e7a` |
| `--color-iris-30` | `var(--ds-color-iris-30)` | `#d0cfff` |
| `--color-iris-50` | `var(--ds-color-iris-50)` | `#8a7ff4` |
| `--color-iris-70` | `var(--ds-color-iris-70)` | `#6a62bb` |
| `--color-mint-10` | `var(--ds-color-mint-10)` | `#c7f3ea` |
| `--color-mint-100` | `var(--ds-color-mint-100)` | `#03402b` |
| `--color-mint-30` | `var(--ds-color-mint-30)` | `#a7e3d5` |
| `--color-mint-50` | `var(--ds-color-mint-50)` | `#489e86` |
| `--color-mint-70` | `var(--ds-color-mint-70)` | `#015a3e` |
| `--color-ochre-10` | `var(--ds-color-ochre-10)` | `#fff5c7` |
| `--color-ochre-100` | `var(--ds-color-ochre-100)` | `#4c2e00` |
| `--color-ochre-30` | `var(--ds-color-ochre-30)` | `#ebd38f` |
| `--color-ochre-50` | `var(--ds-color-ochre-50)` | `#9f6400` |
| `--color-ochre-70` | `var(--ds-color-ochre-70)` | `#7b4c00` |
| `--color-surface-base` | `var(--ds-color-surface-base)` | `#f5f3eb` |
| `--color-surface-caution` | `var(--ds-color-surface-caution)` | `#fff5c7` |
| `--color-surface-ops` | `var(--ds-color-surface-ops)` | `#efefff` |
| `--color-surface-negative` | `var(--ds-color-surface-negative)` | `#ffe1d8` |
| `--color-surface-overlay-scrim` | `var(--ds-color-surface-overlay-scrim)` | `#787365b3` |
| `--color-surface-positive` | `var(--ds-color-surface-positive)` | `#c7f3ea` |
| `--color-surface-raised` | `var(--ds-color-surface-raised)` | `#fff` |
| `--color-surface-strong` | `var(--ds-color-surface-strong)` | `#e2e0d6` |
| `--color-surface-subtle` | `var(--ds-color-surface-subtle)` | `#faf9f5` |
| `--color-surface-sunken` | `var(--ds-color-surface-sunken)` | `#f5f3eb` |
| `--color-white-100` | `var(--ds-color-white-100)` | `#fff` |
| `--font-weight-regular` | `var(--ds-font-weight-regular)` | `400` |
| `--radius-20` | `var(--ds-radius-20)` | `20px` |
| `--shadow-focus-ring` | `var(--ds-shadow-focus-ring)` | `0 0 0 2px #faf9f5, 0 0 0 4px #787365` |
| `--shadow-overlay` | `var(--ds-shadow-overlay)` | `0 1px 2px 0 #0a0a0a12, 0 6px 8px -2px #0a0a0a1f` |
| `--font-display` | `var(--font-display), ui-sans-serif, system-ui, sans-serif` | `var(--font-display), ui-sans-serif, system-ui, sans-serif` |
| `--font-body` | `var(--font-body), ui-sans-serif, system-ui, sans-serif` | `var(--font-body), ui-sans-serif, system-ui, sans-serif` |
| `--text-xxs` | `12px` | `12px` |
| `--text-xxs--line-height` | `16px` | `16px` |
| `--text-20` | `20px` | `20px` |
| `--text-20--line-height` | `28px` | `28px` |
| `--text-reset` | `0px` | `0px` |
| `--text-reset--line-height` | `0px` | `0px` |
| `--scale-103` | `1.03` | `1.03` |
| `--color-bone` | `#f5f3eb` | `#f5f3eb` |
| `--color-ash` | `#e2e0d6` | `#e2e0d6` |
| `--color-clay` | `#b9b6a9` | `#b9b6a9` |
| `--color-green` | `#55f5a3` | `#55f5a3` |
| `--color-blue` | `#00fff0` | `#00fff0` |
| `--color-red` | `#f0314b` | `#f0314b` |
| `--color-gray` | `#e4e4e4` | `#e4e4e4` |
| `--color-yellow` | `#e1ff25` | `#e1ff25` |
| `--color-dark-yellow` | `#fec83c` | `#fec83c` |
| `--color-yellowB` | `#f6ffbe` | `#f6ffbe` |
| `--color-yellowBG` | `#eeffa0` | `#eeffa0` |
| `--color-banner` | `#ffe196` | `#ffe196` |
| `--color-blackBG` | `#111` | `#111` |
| `--color-background` | `#fff` | `#fff` |
| `--color-foreground` | `#09090b` | `#09090b` |
| `--color-card` | `#fff` | `#fff` |
| `--color-card-foreground` | `#09090b` | `#09090b` |
| `--color-popover` | `#fff` | `#fff` |
| `--color-popover-foreground` | `#09090b` | `#09090b` |
| `--color-primary` | `#18181b` | `#18181b` |
| `--color-primary-foreground` | `#fafafa` | `#fafafa` |
| `--color-secondary` | `#f4f4f5` | `#f4f4f5` |
| `--color-secondary-foreground` | `#18181b` | `#18181b` |
| `--color-muted` | `#f4f4f5` | `#f4f4f5` |
| `--color-muted-foreground` | `#71717a` | `#71717a` |
| `--color-accent` | `#f4f4f5` | `#f4f4f5` |
| `--color-accent-foreground` | `#18181b` | `#18181b` |
| `--color-destructive` | `#ef4444` | `#ef4444` |
| `--color-destructive-foreground` | `#fafafa` | `#fafafa` |
| `--color-border` | `#e4e4e7` | `#e4e4e7` |
| `--color-input` | `#e4e4e7` | `#e4e4e7` |
| `--color-ring` | `#09090b` | `#09090b` |
| `--radius-card` | `1.25rem` | `1.25rem` |
| `--radius-rounded` | `8px` | `8px` |
| `--radius-nav` | `28px` | `28px` |
| `--radius-button` | `25px` | `25px` |
| `--radius-circle` | `50%` | `50%` |
| `--radius-page` | `40px` | `40px` |
| `--animate-marquee` | `marquee 40s linear infinite` | `marquee 40s linear infinite` |
| `--animate-loader` | `loader 2s ease-in-out infinite` | `loader 2s ease-in-out infinite` |
| `--drop-shadow-nav` | `0 10px 20px #00000014` | `0 10px 20px #00000014` |
| `--container-xxs` | `16rem` | `16rem` |
| `--ds-font-size-step-0` | `12px` | `12px` |
| `--ds-font-size-step-1` | `14px` | `14px` |
| `--ds-font-size-step-2` | `16px` | `16px` |
| `--ds-font-size-step-3` | `20px` | `20px` |
| `--ds-font-size-step-4` | `26px` | `26px` |
| `--ds-font-size-step-5` | `40px` | `40px` |
| `--ds-font-weight-helvetica-now-display-0` | `400` | `400` |
| `--ds-font-weight-helvetica-now-display-1` | `500` | `500` |
| `--ds-font-weight-helvetica-now-text-2` | `500` | `500` |
| `--ds-font-weight-helvetica-now-text-3` | `400` | `400` |
| `--ds-letter-spacing-0` | `1.5px` | `1.5px` |
| `--ds-letter-spacing-1` | `.01em` | `.01em` |
| `--ds-letter-spacing-2` | `.03em` | `.03em` |
| `--ds-letter-spacing-3` | `0em` | `0em` |
| `--ds-line-height-0` | `60px` | `60px` |
| `--ds-line-height-1` | `36px` | `36px` |
| `--ds-line-height-10` | `18px` | `18px` |
| `--ds-line-height-2` | `36px` | `36px` |
| `--ds-line-height-3` | `24px` | `24px` |
| `--ds-line-height-4` | `24px` | `24px` |
| `--ds-line-height-5` | `24px` | `24px` |
| `--ds-line-height-6` | `20px` | `20px` |
| `--ds-line-height-7` | `20px` | `20px` |
| `--ds-line-height-8` | `20px` | `20px` |
| `--ds-line-height-9` | `18px` | `18px` |
| `--ds-paragraph-indent-0` | `0px` | `0px` |
| `--ds-paragraph-spacing-0` | `0px` | `0px` |
| `--ds-shadow-focus-ring` | `0 0 0 2px var(--ds-color-bone-50), 0 0 0 4px var(--ds-color-clay-50)` | `0 0 0 2px #faf9f5, 0 0 0 4px #787365` |
| `--ds-text-case-none` | `none` | `none` |
| `--ds-text-decoration-none` | `none` | `none` |
| `--ds-text-decoration-underline` | `underline` | `underline` |
| `--ds-color-ash-100` | `#e2e0d6` | `#e2e0d6` |
| `--ds-color-ash-50` | `#f1efeb` | `#f1efeb` |
| `--ds-color-black-100` | `#0a0a0a` | `#0a0a0a` |
| `--ds-color-black-15` | `#d9d9d9` | `#d9d9d9` |
| `--ds-color-black-30` | `#b2b2b2` | `#b2b2b2` |
| `--ds-color-black-50` | `#737373` | `#737373` |
| `--ds-color-black-70` | `#4d4d4d` | `#4d4d4d` |
| `--ds-color-black-80` | `#333` | `#333` |
| `--ds-color-bone-100` | `#f5f3eb` | `#f5f3eb` |
| `--ds-color-bone-50` | `#faf9f5` | `#faf9f5` |
| `--ds-color-brand-accent-red` | `#f0314b` | `#f0314b` |
| `--ds-color-brand-green` | `#55f5a3` | `#55f5a3` |
| `--ds-color-clay-20` | `#dcdbd4` | `#dcdbd4` |
| `--ds-color-clay-30` | `#b9b6a9` | `#b9b6a9` |
| `--ds-color-clay-50` | `#787365` | `#787365` |
| `--ds-color-garnet-10` | `#ffe1d8` | `#ffe1d8` |
| `--ds-color-garnet-100` | `#680025` | `#680025` |
| `--ds-color-garnet-30` | `#ffc4b6` | `#ffc4b6` |
| `--ds-color-garnet-50` | `#ed505a` | `#ed505a` |
| `--ds-color-garnet-70` | `#a70842` | `#a70842` |
| `--ds-color-iris-10` | `#efefff` | `#efefff` |
| `--ds-color-iris-100` | `#443e7a` | `#443e7a` |
| `--ds-color-iris-30` | `#d0cfff` | `#d0cfff` |
| `--ds-color-iris-50` | `#8a7ff4` | `#8a7ff4` |
| `--ds-color-iris-70` | `#6a62bb` | `#6a62bb` |
| `--ds-color-mint-10` | `#c7f3ea` | `#c7f3ea` |
| `--ds-color-mint-100` | `#03402b` | `#03402b` |
| `--ds-color-mint-30` | `#a7e3d5` | `#a7e3d5` |
| `--ds-color-mint-50` | `#489e86` | `#489e86` |
| `--ds-color-mint-70` | `#015a3e` | `#015a3e` |
| `--ds-color-ochre-10` | `#fff5c7` | `#fff5c7` |
| `--ds-color-ochre-100` | `#4c2e00` | `#4c2e00` |
| `--ds-color-ochre-30` | `#ebd38f` | `#ebd38f` |
| `--ds-color-ochre-50` | `#9f6400` | `#9f6400` |
| `--ds-color-ochre-70` | `#7b4c00` | `#7b4c00` |
| `--ds-color-white-100` | `#fff` | `#fff` |
| `--ds-gradient-brand` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` |
| `--ds-gradient-green-yellow` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` |
| `--ds-shadow-overlay` | `0 1px 2px 0 #0a0a0a12, 0 6px 8px -2px #0a0a0a1f` | `0 1px 2px 0 #0a0a0a12, 0 6px 8px -2px #0a0a0a1f` |
| `--ds-color-button-primary` | `var(--ds-color-black-100)` | `#0a0a0a` |
| `--ds-color-button-primary-active` | `var(--ds-color-black-80)` | `#333` |
| `--ds-color-button-primary-disabled` | `var(--ds-color-black-15)` | `#d9d9d9` |
| `--ds-color-button-primary-edge-active` | `var(--ds-color-clay-50)` | `#787365` |
| `--ds-color-button-primary-edge-hover` | `var(--ds-gradient-brand)` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` |
| `--ds-color-button-primary-foreground` | `var(--ds-color-white-100)` | `#fff` |
| `--ds-color-button-primary-foreground-disabled` | `var(--ds-color-white-100)` | `#fff` |
| `--ds-color-button-secondary-active` | `var(--ds-color-ash-100)` | `#e2e0d6` |
| `--ds-color-button-secondary-edge` | `var(--ds-color-ash-100)` | `#e2e0d6` |
| `--ds-color-button-secondary-edge-active` | `var(--ds-color-clay-50)` | `#787365` |
| `--ds-color-button-secondary-edge-hover` | `var(--ds-gradient-brand)` | `linear-gradient(135deg, #55f5a3 25%, #98fa66 68.27%, #e1ff25 100%)` |
| `--ds-color-button-secondary-foreground` | `var(--ds-color-black-100)` | `#0a0a0a` |
| `--ds-color-button-secondary-foreground-disabled` | `var(--ds-color-black-30)` | `#b2b2b2` |
| `--ds-color-button-secondary-hover` | `var(--ds-color-bone-50)` | `#faf9f5` |
| `--ds-color-edge-default` | `var(--ds-color-ash-100)` | `#e2e0d6` |
| `--ds-color-edge-interaction` | `var(--ds-color-clay-50)` | `#787365` |
| `--ds-color-edge-subtle` | `var(--ds-color-ash-50)` | `#f1efeb` |
| `--ds-color-foreground-caution` | `var(--ds-color-ochre-70)` | `#7b4c00` |
| `--ds-color-foreground-disabled` | `var(--ds-color-black-30)` | `#b2b2b2` |
| `--ds-color-foreground-negative` | `var(--ds-color-garnet-70)` | `#a70842` |
| `--ds-color-foreground-ops` | `var(--ds-color-iris-70)` | `#6a62bb` |
| `--ds-color-foreground-positive` | `var(--ds-color-mint-70)` | `#015a3e` |
| `--ds-color-foreground-primary` | `var(--ds-color-black-100)` | `#0a0a0a` |
| `--ds-color-foreground-secondary` | `var(--ds-color-black-50)` | `#737373` |
| `--ds-color-surface-base` | `var(--ds-color-bone-100)` | `#f5f3eb` |
| `--ds-color-surface-caution` | `var(--ds-color-ochre-10)` | `#fff5c7` |
| `--ds-color-surface-ops` | `var(--ds-color-iris-10)` | `#efefff` |
| `--ds-color-surface-negative` | `var(--ds-color-garnet-10)` | `#ffe1d8` |
| `--ds-color-surface-overlay-scrim` | `#787365b3` | `#787365b3` |
| `--ds-color-surface-positive` | `var(--ds-color-mint-10)` | `#c7f3ea` |
| `--ds-color-surface-raised` | `var(--ds-color-white-100)` | `#fff` |
| `--ds-color-surface-strong` | `var(--ds-color-ash-100)` | `#e2e0d6` |
| `--ds-color-surface-subtle` | `var(--ds-color-bone-50)` | `#faf9f5` |
| `--ds-color-surface-sunken` | `var(--ds-color-bone-100)` | `#f5f3eb` |
| `--ds-font-family-display` | `var(--font-display)` | `var(--font-display)` |
| `--ds-font-family-sans` | `var(--font-body)` | `var(--font-body)` |
| `--ds-font-size-12` | `12px` | `12px` |
| `--ds-font-size-14` | `14px` | `14px` |
| `--ds-font-size-16` | `16px` | `16px` |
| `--ds-font-size-18` | `18px` | `18px` |
| `--ds-font-size-20` | `20px` | `20px` |
| `--ds-font-size-26` | `26px` | `26px` |
| `--ds-font-size-40` | `40px` | `40px` |
| `--ds-font-weight-medium` | `500` | `500` |
| `--ds-font-weight-regular` | `400` | `400` |
| `--ds-space-12` | `12px` | `12px` |
| `--ds-space-16` | `16px` | `16px` |
| `--ds-space-2` | `2px` | `2px` |
| `--ds-space-24` | `24px` | `24px` |
| `--ds-space-32` | `32px` | `32px` |
| `--ds-space-4` | `4px` | `4px` |
| `--ds-space-40` | `40px` | `40px` |
| `--ds-space-48` | `48px` | `48px` |
| `--ds-space-64` | `64px` | `64px` |
| `--ds-space-8` | `8px` | `8px` |
| `--ds-radius-12` | `12px` | `12px` |
| `--ds-radius-16` | `16px` | `16px` |
| `--ds-radius-20` | `20px` | `20px` |
| `--ds-radius-24` | `24px` | `24px` |
| `--ds-radius-4` | `4px` | `4px` |
| `--ds-radius-8` | `8px` | `8px` |
| `--ds-radius-full` | `999px` | `999px` |
| `--ds-duration-default` | `.2s` | `.2s` |
| `--ds-duration-fast` | `.1s` | `.1s` |
| `--ds-duration-slow` | `.3s` | `.3s` |
