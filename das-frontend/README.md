# DAS Concepción · Frontend

Sistema de Gestión Documental Web de Calidad para la Dirección de Salud Municipal de Concepción.

**Licitación 2421-16-LE26**

---

## Stack

- React 18 + Vite 5
- React Router DOM v7
- TanStack React Query 5
- Axios
- Tailwind CSS v4 (configuración CSS-first con `@theme`)
- Sin Ant Design — sistema de UI editorial 100% custom

---

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar archivo de variables
cp .env.example .env

# 3. (Opcional) Editar URL del backend en .env
# VITE_API_APP=http://localhost:5001

# 4. Levantar dev server
npm run dev
```

El proyecto queda corriendo en `http://localhost:5173`.

**Backend**: debe estar corriendo en el puerto definido en `VITE_API_APP` (por defecto `5001`). Las páginas tienen datos de fallback, así que se ven aunque el backend no esté arriba — pero las acciones (login, mutaciones) requieren el backend.

---

## Arquitectura

### Flujo de datos

```
Page (JSX) → Hook (React Query) → Service (Axios) → API
```

Ejemplo del Dashboard:

```
Dashboard.jsx
  → useDashboardSummary()        (hook con useQuery)
    → Dashboard.summary()        (service)
      → instance.get('/api/dashboard/summary')   (axios)
```

### Estructura de carpetas

```
src/
├── apis/            app.js - instancia axios con baseURL
├── components/
│   ├── layout/      AppLayout, Sidebar
│   ├── ui/          Badge, Button, Card, KpiCard, Modal, Toast…
│   └── PrivateRoute
├── config/          menu.js (fuente única de verdad del sidebar)
├── hooks/           Un archivo por dominio (useDashboard, useIndicators…)
├── libs/            axios.js - createInstance + interceptors
├── pages/
│   ├── public/      Login
│   └── private/     21 páginas conectadas al backend
├── services/        Una clase por dominio (15 services)
└── styles/          tokens.css + components.css
```

### Sistema de estilos centralizado

Hay **una sola fuente de verdad** para cada decisión visual:

| Decisión | Archivo |
|---|---|
| Colores, espacios, tipografía | `src/styles/tokens.css` (`:root { --color-* }`) |
| Clases reutilizables | `src/styles/components.css` (`.btn`, `.badge`, `.nav-item`, etc.) |
| Tailwind tokens | `src/index.css` (bloque `@theme {}`) |
| Componentes UI | `src/components/ui/` (Badge, Button, Card, etc.) |
| Menú del sidebar | `src/config/menu.js` |

**Regla de oro**: si un patrón visual se repite más de 2 veces en JSX, se vuelve clase en `components.css` o componente en `components/ui/`.

Ver `STYLES.md` para detalle completo del sistema de diseño.

---

## Rutas

| Ruta | Página | Cubre ítem del Anexo N°3 |
|---|---|---|
| `/login` | Login | — |
| `/dashboard` | Panel principal | — |
| `/mi-dia` | Workspace | 5.a (ventana unificada) |
| `/acreditacion` | Indicadores | 1.1, 1.2, 1.3 |
| `/indicadores/:id` | Detalle indicador | 1.2 |
| `/autoevaluacion` | Autoevaluación | 1.1 (cumple/no cumple/N/A) |
| `/comparativa` | Comparativa periodos | 1.3 |
| `/autorizacion-sanitaria` | NTB | 2 |
| `/documental` | Gestión documental | 3.1 |
| `/supervision` | Pautas | 3.2 |
| `/eventos` | Eventos adversos | 4.1, 4.2, 5.e |
| `/eventos/:id` | Detalle evento | 4.2 |
| `/plan-mejora/:id` | Plan de mejora | 4.2 |
| `/catalogos-eventos` | Catálogos | 4.1 |
| `/formularios-eventos` | Formularios | 4.1 |
| `/busqueda` | Búsqueda global | 5.b |
| `/calculo-muestral` | Cálculo muestral | 5.c |
| `/reportes` | Reportes | 5.d |
| `/usuarios` | Usuarios | Administración |
| `/organizacion` | Organización | Administración |
| `/configuracion` | Configuración (alarmas, periodos) | 1.2, 3.1, 3.2, 4.1 |
| `/auditoria` | Auditoría | Trazabilidad |

---

## Cómo agregar una página nueva

1. **Service** en `src/services/MiNueva.js`:
   ```js
   import instance from '../apis/app.js';
   class MiNuevaService {
     list = () => instance.get('/api/mi-nueva');
   }
   export default new MiNuevaService();
   ```

2. **Hook** en `src/hooks/useDomain.js`:
   ```js
   export const useMiNueva = () =>
     useQuery({ queryKey: ['mi-nueva'], queryFn: () => MiNueva.list(), ...baseOptions });
   ```

3. **Página** en `src/pages/private/MiNueva.jsx`:
   ```jsx
   import { PageHeader } from '../../components/ui/index.js';
   import { useMiNueva } from '../../hooks/useDomain.js';
   const MiNueva = () => {
     const q = useMiNueva();
     return <><PageHeader title="Mi nueva página" /><div className="p-10 max-w-7xl">…</div></>;
   };
   export default MiNueva;
   ```

4. **Ruta** en `src/App.jsx`:
   ```jsx
   <Route path="/mi-nueva" element={<MiNueva />} />
   ```

5. **Menú** en `src/config/menu.js`:
   ```js
   { key: 'mi-nueva', label: 'Mi nueva', icon: 'ti-icon', path: '/mi-nueva' }
   ```

---

## Scripts

- `npm run dev` – servidor de desarrollo con HMR
- `npm run build` – build de producción en `dist/`
- `npm run preview` – preview del build de producción

---

## Cobertura del Anexo N°3

Esta implementación cubre los 46 ítems del Anexo N°3, incluyendo los 7 ítems faltantes detectados en la auditoría previa:

✅ Vista previa de PDF (Modal en `/documental`)
✅ Alarma de email por retraso (`/configuracion` → Notificaciones por email)
✅ Selector de versión documental por periodo (Modal en `/documental`)
✅ Documento en varias vistas (filtros por servicio y categoría)
✅ Planificación de pautas con aviso email (Modal en `/supervision`)
✅ Asignación de usuarios por servicio (`/catalogos-eventos` → tab Asignaciones)
✅ Definición de formularios de notificación (`/formularios-eventos`)

---

Desarrollado por Awna Digital Spa · Mayo 2026
