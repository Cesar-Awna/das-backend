import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useAuditLogs } from '../../hooks/useDomain.js';

const ACTION_VARIANT = { Crear: 'ok', Editar: 'warn', Eliminar: 'danger', Aprobar: 'ink', Acceder: 'default' };

const Auditoria = () => {
  const logs = useAuditLogs();
  const data = logs.data?.data || defaultLogs;

  const actions = (
    <>
      <Button variant="secondary" icon="ti-download">Exportar logs</Button>
      <Button variant="secondary" icon="ti-filter">Filtros avanzados</Button>
    </>
  );

  return (
    <>
      <PageHeader overline="Administración" title="Auditoría del sistema" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10 grid grid-cols-12 gap-10 items-end">
          <div className="col-span-7">
            <div className="overline-accent mb-3">Trazabilidad completa</div>
            <h2 className="font-display text-3xl text-ink-950 leading-tight">
              Registro de todas las acciones realizadas por los usuarios del sistema.
            </h2>
          </div>
          <div className="col-span-5 grid grid-cols-3 gap-4 text-[13px]">
            <div><div className="overline">Hoy</div><div className="font-display text-2xl text-ink-950 mt-1">127</div></div>
            <div><div className="overline">Esta semana</div><div className="font-display text-2xl text-ink-950 mt-1">842</div></div>
            <div><div className="overline">Este mes</div><div className="font-display text-2xl text-ink-950 mt-1">3.247</div></div>
          </div>
        </section>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input className="input-box pl-10" placeholder="Buscar por usuario, acción, entidad…" />
          </div>
          <select className="input-box max-w-xs"><option>Todas las acciones</option><option>Crear</option><option>Editar</option><option>Eliminar</option><option>Aprobar</option></select>
          <input type="date" className="input-box max-w-[180px]" defaultValue="2026-05-20" />
          <input type="date" className="input-box max-w-[180px]" defaultValue="2026-05-26" />
        </div>

        <div className="card">
          <div className="table-header" style={{ gridTemplateColumns: '140px 160px 100px 1fr 130px 140px' }}>
            <span>Fecha · Hora</span><span>Usuario</span><span>Acción</span><span>Entidad</span><span>IP</span><span>Estado</span>
          </div>
          {data.map((log, i) => (
            <div key={i} className="table-row" style={{ gridTemplateColumns: '140px 160px 100px 1fr 130px 140px' }}>
              <div>
                <div className="text-[13px] text-ink-950">{log.date}</div>
                <div className="text-[11px] text-stone-500">{log.time}</div>
              </div>
              <div>
                <div className="text-[13px] text-ink-950">{log.user}</div>
                <div className="text-[11px] text-stone-500">{log.userRole}</div>
              </div>
              <Badge variant={ACTION_VARIANT[log.action]}>{log.action}</Badge>
              <div>
                <div className="text-[13px] text-ink-950">{log.entity}</div>
                <div className="text-[11px] text-stone-500 font-mono">{log.entityId}</div>
              </div>
              <span className="text-[11px] text-stone-600 font-mono">{log.ip}</span>
              <Badge variant={log.success ? 'ok' : 'danger'}>{log.success ? 'Exitoso' : 'Error'}</Badge>
            </div>
          ))}
          <div className="px-6 py-4 flex items-center justify-between border-t border-paper-100">
            <span className="text-[12px] text-stone-600">Mostrando {data.length} de 3.247 registros</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 border border-paper-200 text-stone-600 hover:border-ink-800 bg-white"><i className="ti ti-chevron-left" /></button>
              <button className="w-8 h-8 bg-ink-950 text-paper">1</button>
              <button className="w-8 h-8 border border-paper-200 text-stone-600 bg-white">2</button>
              <button className="w-8 h-8 border border-paper-200 text-stone-600 bg-white">3</button>
              <button className="w-8 h-8 border border-paper-200 text-stone-600 hover:border-ink-800 bg-white"><i className="ti ti-chevron-right" /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const defaultLogs = [
  { date: '26 may 2026', time: '14:32:18', user: 'D. Cáceres', userRole: 'Admin', action: 'Aprobar', entity: 'Autoevaluación CEMSCO L. Arenas', entityId: 'AE-2026-Q2-CLA', ip: '10.0.12.45', success: true },
  { date: '26 may 2026', time: '14:28:02', user: 'M. Soto', userRole: 'Usuario', action: 'Editar', entity: 'Protocolo POL-018 v2.3', entityId: 'DOC-018', ip: '10.0.12.47', success: true },
  { date: '26 may 2026', time: '14:15:51', user: 'C. Pérez', userRole: 'Usuario', action: 'Crear', entity: 'Evento adverso EA-2026-0042', entityId: 'EA-0042', ip: '10.0.12.52', success: true },
  { date: '26 may 2026', time: '13:58:30', user: 'D. Cáceres', userRole: 'Admin', action: 'Acceder', entity: 'Reporte cumplimiento Q1', entityId: 'REP-Q1-2026', ip: '10.0.12.45', success: true },
  { date: '26 may 2026', time: '13:42:11', user: 'R. Vidal', userRole: 'Usuario', action: 'Crear', entity: 'Aplicación pauta PSE-007', entityId: 'APL-PSE-007-052', ip: '10.0.12.61', success: true },
  { date: '26 may 2026', time: '12:30:08', user: 'L. Muñoz', userRole: 'Usuario', action: 'Editar', entity: 'Medición indicador IAAS-03', entityId: 'MED-IAAS-03', ip: '10.0.12.58', success: true },
  { date: '26 may 2026', time: '11:48:22', user: 'A. Reyes', userRole: 'Usuario', action: 'Crear', entity: 'Notificación rápida evento', entityId: 'EA-0041', ip: '10.0.12.63', success: true },
  { date: '26 may 2026', time: '10:18:01', user: 'D. Cáceres', userRole: 'Admin', action: 'Eliminar', entity: 'Borrador autoevaluación', entityId: 'AE-DRAFT-2026-09', ip: '10.0.12.45', success: true },
  { date: '26 may 2026', time: '09:55:32', user: 'unknown', userRole: '—', action: 'Acceder', entity: 'Intento login fallido', entityId: 'AUTH-FAIL', ip: '177.213.42.18', success: false },
  { date: '26 may 2026', time: '09:12:44', user: 'D. Cáceres', userRole: 'Admin', action: 'Aprobar', entity: 'Plan de mejora PM-2026-0028', entityId: 'PM-0028', ip: '10.0.12.45', success: true },
];

export default Auditoria;
