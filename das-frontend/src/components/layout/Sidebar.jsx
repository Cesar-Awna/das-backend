import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MENU_GROUPS, ROUTE_PARENT_MAP } from '../../config/menu.js';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Resolver path activo (incluye sub-rutas)
  const activePath = (() => {
    const pathname = location.pathname;
    // Match exacto primero
    const all = MENU_GROUPS.flatMap((g) => g.items.map((i) => i.path));
    if (all.includes(pathname)) return pathname;
    // Sub-rutas (ej: /eventos/EA-2026-0042 → /eventos)
    for (const [prefix, parent] of Object.entries(ROUTE_PARENT_MAP)) {
      if (pathname.startsWith(prefix)) return parent;
    }
    return pathname;
  })();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Leer info del usuario
  let userName = 'Daniel Cáceres';
  let userRole = 'Gestor de calidad';
  let userInitials = 'DC';
  try {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    if (u?.name) {
      userName = u.name;
      userInitials = u.name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
    }
    if (u?.role) userRole = u.role;
  } catch (e) {
    /* noop */
  }

  return (
    <aside className="sidebar">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-paper/30 flex items-center justify-center">
            <span className="font-display text-lg">D</span>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.15em] uppercase opacity-80 leading-tight">
              DAS Concepción
            </div>
            <div className="text-[10px] tracking-wider opacity-50">Sistema de calidad</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {MENU_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.title && <div className="nav-section">{group.title}</div>}
            {group.items.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`nav-item ${activePath === item.path ? 'active' : ''}`}
              >
                <i className={`ti ${item.icon}`} />
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 bg-accent/20 border border-accent/30 flex items-center justify-center text-accent-light font-display text-sm">
            {userInitials}
          </div>
          <div className="text-xs leading-tight">
            <div className="font-medium">{userName}</div>
            <div className="opacity-50 text-[11px]">{userRole}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-[11px] tracking-wider uppercase opacity-60 hover:opacity-100 flex items-center gap-1 cursor-pointer bg-transparent border-none"
        >
          <i className="ti ti-logout" /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
