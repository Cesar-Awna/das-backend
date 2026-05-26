import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useUsers, useUserStats } from '../../hooks/useDomain.js';

const Usuarios = () => {
  const users = useUsers().data?.data || defaultUsers;
  const stats = useUserStats().data?.data || defaultStats;

  return (
    <>
      <PageHeader overline="Administración" title="Usuarios del sistema" actions={<Button variant="primary" icon="ti-user-plus">Nuevo usuario</Button>} />
      <div className="p-10 max-w-7xl">
        <section className="grid grid-cols-4 gap-px bg-paper-100 border border-paper-100 mb-10">
          <div className="bg-white p-6"><div className="overline mb-2">Total usuarios</div><div className="font-display text-3xl text-ink-950">{stats.total}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Administradores</div><div className="font-display text-3xl text-ink-950">{stats.admins}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Usuarios activos</div><div className="font-display text-3xl text-status-ok">{stats.active}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Conectados hoy</div><div className="font-display text-3xl text-ink-950">{stats.todayOnline}</div></div>
        </section>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input className="input-box pl-10" placeholder="Buscar por nombre, RUT, email…" />
          </div>
          <select className="input-box max-w-xs"><option>Todos los perfiles</option><option>Administradores</option><option>Usuarios</option></select>
          <select className="input-box max-w-xs"><option>Todos los servicios</option></select>
        </div>

        <div className="card">
          <div className="table-header" style={{ gridTemplateColumns: '50px 1fr 180px 160px 120px 80px' }}>
            <span /><span>Usuario</span><span>Cargo</span><span>Servicio</span><span>Perfil</span><span /></div>
          {users.map((u) => (
            <div key={u.rut} className="table-row" style={{ gridTemplateColumns: '50px 1fr 180px 160px 120px 80px' }}>
              <div className={`w-9 h-9 flex items-center justify-center font-display text-sm ${u.isAdmin ? 'bg-accent/20 border border-accent/30 text-accent-dark' : 'bg-stone-100 border border-paper-200 text-stone-700'}`}>
                {u.initials}
              </div>
              <div>
                <div className="text-[14px] text-ink-950 font-medium">{u.name}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">{u.email} · {u.rut}</div>
              </div>
              <span className="text-[13px] text-stone-700">{u.role}</span>
              <span className="text-[13px] text-stone-700">{u.service}</span>
              <Badge variant={u.isAdmin ? 'ink' : 'default'}>{u.isAdmin ? 'Admin' : 'Usuario'}</Badge>
              <i className="ti ti-dots text-stone-600 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const defaultStats = { total: 47, admins: 3, active: 44, todayOnline: 23 };
const defaultUsers = [
  { initials: 'DC', name: 'Daniel Cáceres Cerda', email: 'd.caceres@dasconcepcion.cl', rut: '15.432.876-9', role: 'Gestor de calidad', service: 'Dirección DAS', isAdmin: true },
  { initials: 'MS', name: 'María Soto Vargas', email: 'm.soto@dasconcepcion.cl', rut: '16.789.432-1', role: 'Enfermera coord.', service: 'CEMSCO Lorenzo Arenas' },
  { initials: 'RV', name: 'Roberto Vidal Carrasco', email: 'r.vidal@dasconcepcion.cl', rut: '14.321.987-2', role: 'Cirujano dentista', service: 'Servicio Dental' },
  { initials: 'LM', name: 'Lucía Muñoz Bravo', email: 'l.munoz@dasconcepcion.cl', rut: '17.456.789-K', role: 'Químico farmacéutico', service: 'CESFAM Tucapel' },
  { initials: 'CP', name: 'Carolina Pérez Núñez', email: 'c.perez@dasconcepcion.cl', rut: '18.234.567-3', role: 'Tens encargado', service: 'CEMSCO Lorenzo Arenas' },
  { initials: 'AR', name: 'Antonio Reyes Hidalgo', email: 'a.reyes@dasconcepcion.cl', rut: '13.654.321-8', role: 'Matrón', service: 'CESFAM Lorenzo Arenas' },
];

export default Usuarios;
