/**
 * Configuración única del menú del sidebar.
 * Para agregar/quitar items, editar SOLO este archivo.
 */
export const MENU_GROUPS = [
  {
    title: null, // grupo sin título (primer grupo)
    items: [
      { key: 'dashboard', label: 'Panel principal', icon: 'ti-layout-dashboard', path: '/dashboard' },
      { key: 'workspace', label: 'Mi día', icon: 'ti-checkbox', path: '/mi-dia' },
    ],
  },
  {
    title: 'Módulos',
    items: [
      { key: 'acreditacion', label: 'Acreditación', icon: 'ti-target', path: '/acreditacion' },
      { key: 'ntb', label: 'Autorización Sanitaria', icon: 'ti-clipboard-check', path: '/autorizacion-sanitaria' },
      { key: 'documental', label: 'Gestión documental', icon: 'ti-files', path: '/documental' },
      { key: 'supervision', label: 'Pautas de supervisión', icon: 'ti-list-check', path: '/supervision' },
      { key: 'eventos', label: 'Eventos adversos', icon: 'ti-alert-triangle', path: '/eventos' },
    ],
  },
  {
    title: 'Herramientas',
    items: [
      { key: 'busqueda', label: 'Búsqueda global', icon: 'ti-search', path: '/busqueda' },
      { key: 'muestral', label: 'Cálculo muestral', icon: 'ti-calculator', path: '/calculo-muestral' },
      { key: 'reportes', label: 'Reportes', icon: 'ti-chart-histogram', path: '/reportes' },
    ],
  },
  {
    title: 'Administración',
    items: [
      { key: 'usuarios', label: 'Usuarios', icon: 'ti-users', path: '/usuarios' },
      { key: 'organizacion', label: 'Organización', icon: 'ti-affiliate', path: '/organizacion' },
      { key: 'configuracion', label: 'Configuración', icon: 'ti-settings', path: '/configuracion' },
      { key: 'auditoria', label: 'Auditoría', icon: 'ti-shield-check', path: '/auditoria' },
    ],
  },
];

/**
 * Sub-rutas que mantienen activo el item padre del sidebar.
 */
export const ROUTE_PARENT_MAP = {
  '/indicadores/': '/acreditacion',
  '/autoevaluacion': '/acreditacion',
  '/comparativa': '/acreditacion',
  '/eventos/': '/eventos',
  '/plan-mejora/': '/eventos',
  '/catalogos-eventos': '/eventos',
  '/formularios-eventos': '/eventos',
};
