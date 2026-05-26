# Sistema de Diseño · DAS Frontend

## Filosofía

**Centralizado, modular, escalable, sin repetición.** Cada decisión visual vive en un solo lugar.

- Si necesito cambiar el color primario → toco `tokens.css` y se actualiza todo.
- Si necesito un botón nuevo → uso `<Button variant="…" />`, nunca recreo el botón con clases sueltas.
- Si necesito una tarjeta KPI → uso `<KpiCard />`, no copio la estructura HTML.

---

## Capas del sistema

```
┌─────────────────────────────────────────┐
│  4. Componentes (Badge, Button, Card)   │  ← Lo que usas en JSX
├─────────────────────────────────────────┤
│  3. Clases reutilizables (.btn, .badge) │  ← components.css
├─────────────────────────────────────────┤
│  2. Tailwind tokens (@theme)            │  ← index.css
├─────────────────────────────────────────┤
│  1. Variables CSS (--color-ink-950)     │  ← tokens.css
└─────────────────────────────────────────┘
```

### Capa 1 · `tokens.css`

Variables CSS puras. Única fuente de verdad de **TODOS** los valores numéricos del diseño.

```css
:root {
  --color-ink-950: #0a1628;
  --color-paper: #fafaf7;
  --color-accent: #b8854a;
  --font-display: 'Fraunces', serif;
  --space-4: 16px;
  /* … */
}
```

### Capa 2 · `index.css` (bloque `@theme`)

Mismos tokens, expuestos a Tailwind v4 vía CSS-first config:

```css
@theme {
  --color-ink-950: #0a1628;  /* → habilita bg-ink-950, text-ink-950, border-ink-950… */
  --font-display: 'Fraunces', serif;  /* → habilita font-display */
}
```

### Capa 3 · `components.css`

Clases utilitarias que combinan tokens. Aquí vive todo lo que se repite.

```css
.btn { padding: 10px 20px; font-size: var(--text-body); /* … */ }
.btn-primary { background: var(--color-ink-900); color: var(--color-paper); }
.badge { font-size: 10px; letter-spacing: 0.08em; /* … */ }
.nav-item { /* … */ }
.tab-btn { /* … */ }
```

### Capa 4 · Componentes React UI

Encapsulan markup repetido. Importados desde `src/components/ui/index.js`:

```js
import { Badge, Button, Card, KpiCard, PageHeader, Modal, useToast } from '../../components/ui/index.js';
```

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--color-ink-950` | `#0a1628` | Texto principal, sidebar, botones primarios |
| `--color-ink-900` | `#0f2240` | Botón primario hover |
| `--color-paper` | `#fafaf7` | Fondo general |
| `--color-paper-50` | `#f5f5f0` | Hover de filas, fondos secundarios |
| `--color-paper-100` | `#eaeae0` | Bordes finos |
| `--color-paper-200` | `#d4d4cc` | Bordes y separadores |
| `--color-stone-500` a `-800` | grises cálidos | Texto secundario y terciario |
| `--color-accent` | `#b8854a` | Bronce/ocre — único acento decorativo |
| `--color-status-ok` | `#3d6b4f` | Verde institucional (cumple) |
| `--color-status-warn` | `#a87830` | Naranja apagado (atención) |
| `--color-status-danger` | `#a83a30` | Rojo apagado (no cumple, vencido) |

---

## Tipografía

| Token | Font | Uso |
|---|---|---|
| `--font-display` | **Fraunces** (serif) | Títulos, cifras grandes |
| `--font-sans` | **Inter** | Cuerpo, UI |
| `--font-mono` | **JetBrains Mono** | Códigos, IDs, RUT |

---

## Cómo usar el sistema

### ✅ Bien (usa el sistema)

```jsx
import { Badge, Button, Card } from '../../components/ui/index.js';

<Card>
  <h3 className="font-display text-xl text-ink-950">Mi título</h3>
  <Badge variant="ok">Cumple</Badge>
  <Button variant="primary" icon="ti-plus">Crear</Button>
</Card>
```

### ❌ Mal (rompe el sistema)

```jsx
<div style={{ background: '#fafaf7', padding: 24, border: '1px solid #eaeae0' }}>
  <h3 style={{ fontFamily: 'Fraunces', fontSize: 20, color: '#0a1628' }}>Mi título</h3>
  <span style={{ background: 'green', padding: '3px 8px', color: 'white' }}>Cumple</span>
  <button style={{ background: '#0a1628', color: '#fafaf7', padding: '10px 20px' }}>Crear</button>
</div>
```

---

## Componentes UI disponibles

| Componente | Ejemplo de uso |
|---|---|
| `<PageHeader />` | Encabezado sticky con overline, título, acciones |
| `<Badge />` | `<Badge variant="ok\|warn\|danger\|ink\|accent">…</Badge>` |
| `<Button />` | `<Button variant="primary\|secondary\|ghost\|link" icon="ti-plus" full>…</Button>` |
| `<Card />` | Contenedor blanco con borde. `padded` por default |
| `<KpiCard />` | Tarjeta de métrica con label, valor, icono, footer |
| `<ProgressBar />` | `<ProgressBar value={87} />` (color automático según meta) |
| `<Modal />` | `<Modal open onClose title>…</Modal>` |
| `<Loader />` `<EmptyState />` `<ErrorState />` | Estados de query |
| `useToast()` | `toast.success("…")`, `toast.error("…")`, `toast.warn("…")` |

---

## Clases utilitarias clave

| Clase | Uso |
|---|---|
| `.overline` | Texto pequeño, uppercase, gris (etiquetas de metadata) |
| `.overline-accent` | Igual que `.overline` pero en color acento |
| `.italic-accent` | Cursiva editorial en bronce |
| `.italic-danger` `.italic-ok` | Cursivas semánticas |
| `.font-display` | Fraunces (títulos, cifras) |
| `.font-mono` | JetBrains Mono (códigos) |
| `.input-line` `.input-box` `.input-label` | Inputs editoriales |
| `.card` `.card-padded` | Contenedores |
| `.table-row` `.table-header` | Filas y encabezado de tablas |
| `.tab-btn` `.tab-btn.active` | Tabs |
| `.nav-item` `.nav-section` | Items del sidebar |
| `.grain-bg` | Textura de grano sutil para fondos oscuros |
| `.fade-in` | Animación de entrada |

---

## Sidebar: agregar/quitar items

Editar **solo** `src/config/menu.js`:

```js
export const MENU_GROUPS = [
  {
    title: 'Mi nuevo grupo',
    items: [
      { key: 'foo', label: 'Mi página', icon: 'ti-foo', path: '/foo' },
    ],
  },
];
```

El `<Sidebar />` lo lee automáticamente y muestra el item activo según la ruta.

---

## Iconografía

Usamos **Tabler Icons** via CDN (cargado en `index.html`).

```jsx
<i className="ti ti-bell" />
<i className="ti ti-alert-triangle text-status-danger" />
```

Catálogo: https://tabler.io/icons
