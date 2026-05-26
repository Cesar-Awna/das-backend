import { Link } from 'react-router-dom';
import { PageHeader, KpiCard, Badge, Button, Loader, ErrorState } from '../../components/ui/index.js';
import { useDashboardSummary, useDashboardActivity } from '../../hooks/useDashboard.js';

const Dashboard = () => {
  const summary = useDashboardSummary();
  const activity = useDashboardActivity();

  // Fallback con datos por defecto si el backend no responde aún
  const data = summary.data?.data || defaultSummary;
  const actData = activity.data?.data || defaultActivity;

  const headerActions = (
    <>
      <Link to="/eventos" className="btn btn-secondary">
        <i className="ti ti-alert-triangle text-status-danger" /> Notificar evento adverso
      </Link>
      <button className="w-10 h-10 border border-paper-200 flex items-center justify-center relative hover:border-ink-800 bg-white">
        <i className="ti ti-bell text-stone-700" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
      </button>
    </>
  );

  if (summary.isLoading) return <Loader message="Cargando panel…" />;
  if (summary.isError && !summary.data) return <ErrorState error={summary.error} onRetry={summary.refetch} />;

  return (
    <>
      <PageHeader overline="Panel principal" title={`Buenos días, ${data.userName || 'Daniel'}`} actions={headerActions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10">
          <div className="grid grid-cols-12 gap-10 items-end">
            <div className="col-span-7">
              <div className="overline-accent mb-3">Resumen ejecutivo · {data.periodLabel}</div>
              <h2 className="font-display text-4xl text-ink-950 leading-tight mb-4">
                Tienes <em className="italic-accent">{data.pendingTasks} tareas</em> pendientes y{' '}
                <em className="italic-danger">{data.criticalAlerts} alertas</em> que requieren atención inmediata.
              </h2>
            </div>
            <div className="col-span-5 grid grid-cols-2 gap-6 text-[13px] text-stone-600">
              <div>
                <div className="overline">Periodo evaluado</div>
                <div className="text-ink-950 text-[15px] mt-1">{data.periodLabel}</div>
              </div>
              <div>
                <div className="overline">Cumplimiento global</div>
                <div className="text-ink-950 text-[15px] mt-1">
                  {data.globalCompliance}% <span className="text-status-ok">↑ {data.complianceDelta}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-px bg-paper-100 border border-paper-100 mb-12">
          <KpiCard label="Documental" value={data.documents.total} icon="ti-files" footer={<><i className="ti ti-clock text-sm" /> {data.documents.expiring} próximos a vencer</>} footerVariant="warn" />
          <KpiCard label="Indicadores" value={data.indicators.value} suffix=",4%" icon="ti-target" footer={<><i className="ti ti-trending-up text-sm" /> +{data.complianceDelta}% vs Q1</>} footerVariant="ok" />
          <KpiCard label="Eventos" value={data.events.inGestion} icon="ti-alert-triangle" footer={<><i className="ti ti-flag text-sm" /> {data.events.graves} graves sin asignar</>} footerVariant="danger" />
          <KpiCard label="Mejora" value={data.plans.active} icon="ti-clipboard-list" footer={<><i className="ti ti-progress text-sm" /> {data.plans.avgProgress}% avance promedio</>} />
        </section>

        <section className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-ink-950">Tareas pendientes</h3>
              <Link to="/mi-dia" className="btn-link">Ver todas →</Link>
            </div>
            <div className="card">
              {data.tasks.map((task, i) => (
                <div key={i} className="grid items-center gap-4 p-6 border-b border-paper-100 last:border-0" style={{ gridTemplateColumns: 'auto 1fr auto auto' }}>
                  <div className={`w-1 h-10 bg-status-${task.urgencyColor}`} />
                  <div>
                    <div className="text-[14px] text-ink-950 font-medium">{task.title}</div>
                    <div className="text-[12px] text-stone-600 mt-0.5">{task.subtitle}</div>
                  </div>
                  <Badge variant={task.urgencyColor === 'danger' ? 'danger' : task.urgencyColor === 'warn' ? 'warn' : 'default'}>
                    {task.urgencyLabel}
                  </Badge>
                  <Link to={task.link} className="btn-link">{task.action} →</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-display text-xl text-ink-950 mb-4">Cumplimiento por ámbito</h3>
            <div className="card card-padded space-y-5">
              {data.ambitos.map((a, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[13px] text-ink-950">{a.name}</span>
                    <span className={`font-display text-[15px] text-status-${a.variant}`}>{a.value}%</span>
                  </div>
                  <div className="h-1.5 bg-paper-100">
                    <div className={`h-full bg-status-${a.variant}`} style={{ width: `${a.value}%` }} />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-paper-100">
                <Link to="/acreditacion" className="btn-link flex items-center gap-1">
                  Ver detalle completo <i className="ti ti-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-xl text-ink-950">Actividad reciente</h3>
            <Link to="/auditoria" className="btn-link">Ver auditoría →</Link>
          </div>
          <div className="card divide-y divide-paper-100">
            {actData.map((item, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4 text-[13px]">
                <span className="text-[11px] text-stone-500 w-24">{item.time}</span>
                <i className={`ti ${item.icon} text-${item.iconColor || 'stone-500'}`} />
                <span className="text-ink-950 flex-1">
                  <strong className="font-medium">{item.user}</strong> {item.text}{' '}
                  <em className="italic-accent">{item.target}</em>
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

// Fallback data
const defaultSummary = {
  userName: 'Daniel',
  periodLabel: 'Q2 2026 · Abril–Junio',
  pendingTasks: 7,
  criticalAlerts: 3,
  globalCompliance: '87,4',
  complianceDelta: '2,1',
  documents: { total: 142, expiring: 8 },
  indicators: { value: 87 },
  events: { inGestion: 12, graves: 2 },
  plans: { active: 9, avgProgress: 68 },
  tasks: [
    { title: 'Cargar medición de indicador IAAS-03', subtitle: 'Tasa de infecciones · Vencimiento ayer', urgencyColor: 'danger', urgencyLabel: 'Vencido', action: 'Atender', link: '/indicadores/IAAS-03' },
    { title: 'Aprobar protocolo POL-018 v2.3', subtitle: 'Manejo de heridas crónicas · M. Soto', urgencyColor: 'warn', urgencyLabel: 'Aprobar', action: 'Revisar', link: '/documental' },
    { title: 'Aplicar pauta de supervisión PSE-007', subtitle: 'Programada para hoy · Servicio Dental', urgencyColor: 'warn', urgencyLabel: 'Hoy', action: 'Aplicar', link: '/supervision' },
    { title: 'Verificar evento adverso EA-2026-0042', subtitle: 'Notificado hace 2h · Caída de paciente', urgencyColor: 'default', urgencyLabel: 'Pendiente', action: 'Verificar', link: '/eventos/EA-2026-0042' },
  ],
  ambitos: [
    { name: 'Dignidad del paciente', value: 94, variant: 'ok' },
    { name: 'Gestión de la calidad', value: 89, variant: 'ok' },
    { name: 'Acceso, oportunidad', value: 76, variant: 'warn' },
    { name: 'Registros clínicos', value: 71, variant: 'warn' },
    { name: 'Seguridad equipamiento', value: 58, variant: 'danger' },
  ],
};

const defaultActivity = [
  { time: '10:42', icon: 'ti-edit', user: 'M. Soto', text: 'subió versión 2.3 del protocolo', target: 'POL-018' },
  { time: '10:15', icon: 'ti-alert-triangle', iconColor: 'status-danger', user: 'C. Pérez', text: 'notificó evento adverso', target: 'EA-2026-0042' },
  { time: '09:33', icon: 'ti-check', iconColor: 'status-ok', user: 'D. Cáceres', text: 'aprobó la autoevaluación de', target: 'CEMSCO Lorenzo Arenas' },
  { time: '08:50', icon: 'ti-clipboard-check', user: 'R. Vidal', text: 'aplicó pauta', target: 'PSE-005 en Servicio Dental' },
];

export default Dashboard;
