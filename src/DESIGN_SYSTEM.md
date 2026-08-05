# QuickStor Design System

A calm, dense-but-legible enterprise design language for the QuickStor storage-cluster
admin console. The reference register is NetApp / Pure Storage / VMware vSphere:
trustworthy, restrained, zero decoration-for-decoration's-sake.

All tokens live in **`index.css`** as Tailwind v4 `@theme` variables (CSS-first config —
there is **no** `tailwind.config.js`). Declaring a token there generates the matching
utility (`--color-brand-600` → `bg-brand-600`, `text-brand-600`, `border-brand-600`, …).
We intentionally **override** the built-in `gray`, `radius`, and `shadow` token names so the
whole app — including out-of-scope screens — inherits the new system with no per-file churn.

Icons are standardized on **lucide-react**. FontAwesome (`fas fa-*`), AdminLTE, Bootstrap,
and select2 styling have been removed from every file in this set.

---

## 1. Color

### Brand — one accent, anchored on `#495BE2`
A single brand blue replaces the old per-page indigo-vs-emerald split. Use `brand-600`
for primary actions, `brand-500` as the pure anchor, `brand-50/100` for tinted
backgrounds and selected states.

| Token | Hex | Use |
|---|---|---|
| `brand-50` | `#EEF1FD` | tint backgrounds, selected rows/tiles |
| `brand-100` | `#DCE1FB` | chip backgrounds, focus rings |
| `brand-500` | `#495BE2` | anchor / accents |
| `brand-600` | `#3746CC` | **primary button**, active nav, key icons |
| `brand-700` | `#2D39A6` | hover on primary, active link text |

### Neutral gray ramp (cool, calm) — overrides Tailwind `gray`
`50 #F7F9FB · 100 #EFF2F6 · 200 #E2E7EE · 300 #CBD3DE · 400 #97A2B2 · 500 #69748A ·
600 #4B5567 · 700 #38414F · 800 #232A35 · 900 #151A22`

Text: body `gray-800`, headings `gray-900`, secondary `gray-500`, muted/placeholder `gray-400`.

### Surfaces & borders
| Token | Hex | Use |
|---|---|---|
| `surface` | `#FFFFFF` | cards, panels, inputs |
| `surface-muted` | `#F7F9FB` | table headers, footers, readout boxes |
| `surface-sunken` | `#EFF2F6` | wells |
| `canvas` | `#F1F4F8` | app background behind the floating canvas |
| `border` | `#E2E7EE` | default hairline border |
| `border-strong` | `#CBD3DE` | hover borders, dividers needing weight |

### Semantic status — status ONLY, never decoration
Each has `50/100` (soft bg) + `500/600/700` (fg). Use for node state, validation, badges —
never as a panel theme color.

- **success** `#1F9D6B` — node online, applied changes
- **warning** `#C77A12` — degraded, cautions
- **danger** `#D64545` — node offline, destructive actions (delete, evacuate), errors
- **info** = brand blue `#495BE2` — discovered nodes, informational

---

## 2. Typography

`--font-sans: system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif`
`--font-mono: "SFMono-Regular", "JetBrains Mono", Menlo, Consolas, monospace` — IPs,
ports, bond labels, config readouts.

| Role | Classes |
|---|---|
| Page title | `text-2xl font-semibold tracking-tight text-gray-900` |
| Panel title | `text-base font-semibold text-gray-800` |
| Subtitle / secondary | `text-sm text-gray-500` |
| Body / inputs | `text-sm text-gray-800` |
| Field label | `text-sm font-medium text-gray-700` |
| Table head / eyebrow | `text-xs font-semibold uppercase tracking-wide text-gray-500` |

Micro-labels are reduced to a single, restrained `text-xs uppercase` treatment — the old
`text-[10px] font-black tracking-[0.2em]` "giant uppercase" labels are gone.

---

## 3. Radius — 3 meaningful steps

| Token | px | Use |
|---|---|---|
| `rounded-sm` | 6 | badges, status pills, chips |
| `rounded-md` | 8 | buttons, inputs, selects, small controls |
| `rounded-lg` | 12 | cards / panels |
| `rounded-xl` | 16 | modal, floating canvas |

(`rounded-2xl` is aliased to 16 so stray usages stay in-system.) The previous mix of
`rounded-lg/xl/2xl/24px` is collapsed onto these.

---

## 4. Elevation — two soft shadows, no drama

| Token | Use |
|---|---|
| `shadow-xs` | buttons, subtle lift |
| `shadow-sm` | resting cards / panels, floating canvas |
| `shadow-md` | slightly raised |
| `shadow-lg` | dropdown menus / popovers |
| `shadow-xl` | modal |

`shadow-2xl` is toned down to a soft value — no more `shadow-2xl` drama or colored
glow shadows (`shadow-blue-500/30` etc. removed).

---

## 5. Spacing & density

Enterprise-comfortable. Reference values:
- Panel header: `px-5 py-4`
- Panel body: `p-5`–`p-6`
- Table cell: `px-5 py-4` (head `py-3`)
- Control padding: `px-3 py-2.5` (inputs), `px-4 py-2.5` (buttons)
- Section gap (stacked panels): `space-y-6`
- Grid gaps: `gap-3` (tiles) / `gap-4`–`gap-5` (form fields)

Prefer flex/grid + `gap` over per-element margins.

---

## 6. Component patterns

All primitives live in `components/Common/`.

### `Panel` — Card/Panel
Header (icon + title + subtitle + optional `actions`) → body → optional `footer`.
No gradient accent bars. Props: `collapsible`, `defaultOpen`, `icon`, `title`, `subtitle`,
`actions`, `footer`, `bodyClass` (use `p-0` for flush tables).

### `Button` — variants
`primary` (brand) · `secondary` (white/border) · `ghost` · `danger`.
Sizes `sm` / `md`. States are subtle — color-only hover, a focus ring, `opacity-50` when
disabled. **No** bounce/translate/scale animation.
Backward-compatible: legacy `bgColor` is mapped to a variant (`rose/red → danger`,
`white → secondary`, else `primary`), so existing call sites keep working while the
indigo/emerald/blue split collapses onto one accent.

### `Input` — Field + label
Label above, optional leading icon, `error`/`hint` helper text. Focus = brand border +
`ring-4 ring-brand-100`. Disabled = `bg-gray-50`.

### `Dropdown` — Select (single / multi)
Pure-React replacement for select2 in the **Users** screens. `isMulti` renders removable
brand chips; `onChange` returns a string (single) or `string[]` (multi). Click-outside +
Escape to close. (Node-config select2 multi-selects are **not** replaced — see §7.)

### `ServerNode` — node tile
Selectable tile with server icon, name, mono IP, and a status dot.
`state`: `up` (success) · `down` (danger) · `discovered` (brand). Selected = brand ring.

### Badge / Status pill
`inline-flex … rounded-full border border-border bg-surface-muted px-3 py-1 text-xs
font-medium` + a colored status dot. Account counts, etc.

### Table
`surface-muted` header row with uppercase `text-xs` headers; `divide-y divide-border`
body; `hover:bg-gray-50/60` rows. Wrap in `Panel` with `bodyClass="p-0"`.

### Modal
`fixed inset-0 bg-gray-900/40 backdrop-blur-sm` scrim → `rounded-xl border bg-surface
shadow-xl` dialog with header (icon + title + close) / body / `surface-muted` footer.

### Page header
`text-2xl font-semibold` title + `text-sm text-gray-500` subtitle on the left, actions
(e.g. a `secondary` Sync button) on the right.

### Sidebar
Fixed 260px rail, `surface` background, brand active sub-item, collapsible sections,
menu search, lucide icons. Pure React + Tailwind — no AdminLTE. Honors the
`body.sidebar-collapse` contract (see §7).

---

## 7. Integration notes / contracts preserved

- **select2 + inputmask (RunningNodes).** All jQuery hooks are untouched: the multi-select
  ids `#nmports`, `#cmports`, `#dports`, `#iports`, the timezone `#TZ`, the `.ipaddress`
  inputmask class, the `.runningnodes` class, every field id (`#BoxName`, `#IPAddress`,
  `#Mgmt`, `#NTP`, `#GW`, `#DNSname`, …) and readout span id (`#bNode`, `#cTZ`, …), and the
  submit read-back logic. **Only the surrounding Tailwind classes changed.** select2 still
  renders with its `bootstrap4` theme; if you want it to match the new inputs pixel-for-pixel,
  add a small select2 theme override (out of scope here — it would touch select2's own CSS).
- **`body.sidebar-collapse`.** The Sidebar toggle still adds/removes this class on `<body>`;
  `index.css` slides the rail off-canvas and resets the content margin. App.jsx / Navbar are
  unchanged and keep working via `.wrapper` / `.content-wrapper` / `.main-header` /
  `.floating-canvas` hooks.
- **All ids/names that JS depends on are preserved** across QUsers, QNodes, RunningNodes,
  ActiveNodes, DiscoveredNodes (`#readysubmit`, `#activesubmit`, `#updateAndJoinBtn`,
  `#hostsready`, `#hostsactive`, `#hostspossible`, `#DiscoveredBoxName`, etc.).

## 8. Responsiveness

The console is fluid from ~360px phones up to wide desktops. One breakpoint governs the
shell: **1024px (Tailwind `lg`)** — used identically in `index.css`, the component `lg:`
utilities, and the JS viewport checks, so there is never a dead zone where the layout
disagrees with itself.

**Sidebar**
- **≥ 1024px** — persistent 260px rail; content is offset by its width. The in-rail toggle
  collapses it (`body.sidebar-collapse`) to reclaim space; content margin animates to 0.
- **< 1024px** — off-canvas **drawer**. Hidden by default (`translateX(-100%)`), content is
  full-width. The **navbar hamburger** (`lg:hidden`) opens it via `body.sidebar-mobile-open`;
  a dimmed **backdrop** (`.sidebar-backdrop`) overlays the page, and tapping the backdrop or
  any nav item closes it. Drawer sits at `z-50`, backdrop `z-40`, navbar `z-30`.

Two independent body-class contracts, by design: `sidebar-collapse` (desktop hide) and
`sidebar-mobile-open` (mobile show). Each media query only honors its own flag, so resizing
across the breakpoint can never leave the rail in a stuck state.

**Layout & components**
- **Floating canvas** — `margin/padding` and radius step down below `sm` (640px): `0.75rem`
  margin / `1rem` padding / `radius-lg` on phones → `1.25rem` / `1.5rem` / `radius-xl` above.
- **Panel** — header and body padding are responsive (`px-4 py-3.5 sm:px-5 sm:py-4`,
  `p-4 sm:p-6`) for comfortable phone density without feeling cramped.
- **Page header** — title/subtitle stack above the action buttons on phones (`flex-col` →
  `sm:flex-row`); the Sync button goes full-width on the smallest screens.
- **Tables** (User Directory) — wrapped in `overflow-x-auto` with a `min-w-[720px]` table, so
  columns keep their legible widths and the panel scrolls horizontally instead of crushing.
- **Forms** — the node-config rows are a 12-col grid at `lg` and collapse to a single stacked
  column below it; the port / bond / readout clusters `flex-wrap` so nothing overflows on
  narrow widths. The Users form is `1 → 2 → 3` columns (`md` / `lg`).
- **Navbar** — the status pill and fullscreen control are `sm:`-gated (hidden on the smallest
  phones); the breadcrumb and username truncate; the user/notification menus are anchored
  dropdowns that stay on-screen.
- **Modals** — `max-w-sm/md` with a `p-4` viewport gutter, so they never touch the edges.

Minimum hit target for interactive controls is ~36–44px square throughout
(`h-9`/`w-9` and up).

## 9. Out of scope / would touch other files

- **Navbar, NotificationPoller, QLogin, and the footer task table** (in `App.jsx`) were not
  restyled — they live outside this file set. They still rely on `.main-header` /
  `.main-footer` / `.wrapper`; the new tokens apply to them automatically (gray ramp, fonts)
  but their markup is unchanged.
- The remaining route pages (QGroups, QLogs, Volumes, Replication, Pools, Settings) are
  untouched. Apply `Panel` / `Button` / `Input` / `Dropdown` / page-header patterns to bring
  them onto the system.
- A select2 visual theme that exactly matches `Input` requires editing select2's stylesheet
  (or swapping select2 for the `Dropdown` primitive **and** rewiring RunningNodes' submit
  read-back) — flagged, not done, to keep this a behavior-preserving refactor.
- The old `img/logo.png` is still referenced by the Sidebar brand; swap in an SVG mark when
  available.
