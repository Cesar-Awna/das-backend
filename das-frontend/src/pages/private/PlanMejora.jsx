import { Link, useParams } from 'react-router-dom';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useImprovementPlan } from '../../hooks/useDomain.js';

const PlanMejora = () => {
  const { id } = useParams();
  const plan = useImprovementPlan(id);
  const data = plan.data?.data || defaultPlan;

  const breadcrumb = (
    <>
      <Link to="/eventos" className="hover:text-ink-950">Eventos adversos</Link>
      <i className="ti ti-chevron-right text-[10px]" />
      <Link to={`/eventos/${id}`} className="hover:text-ink-950">{id}</Link>
      <i className="ti ti-chevron-right text-[10px]" /> <span>Plan de mejora</span>
    </>
  );

  const actions = (
    <>
      <Button variant="secondary" icon="ti-download">Exportar PDF</Button>
      <Button variant="primary" icon="ti-plus">Nueva actividad</Button>
    </>
  );

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title={`Plan de mejora · ${data.planCode}`} actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10 grid grid-cols-12 gap-10">
          <div className="col-span-8">
            <div className="overline-accent mb-3">Caso {id} · {data.eventTitle}</div>
            <h2 className="font-display text-3xl text-ink-950 leading-tight mb-4">
              Avance del <em className="italic-accent">{data.progress}%</em> · {data.completed} de {data.total} actividades completadas
            </h2>
            <p className="text-[14px] text-stone-600">Plan creado el {data.createdAt} por {data.creator}. Plazo de cierre estimado: {data.deadline}.</p>
          </div>
          <div className="col-span-4">
            <div className="card card-padded">
              <div className="overline mb-3">Avance global</div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-4xl text-ink-950">{data.progress}%</span>
                <span className="text-[13px] text-stone-600">completado</span>
              </div>
              <div className="h-2 bg-paper-100 mb-4"><div className="h-full bg-status-ok" style={{ width: `${data.progress}%` }} /></div>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                <div><div className="font-display text-lg text-status-ok">{data.completed}</div><div className="text-stone-600">Completas</div></div>
                <div><div className="font-display text-lg text-accent">{data.inProgress}</div><div className="text-stone-600">En curso</div></div>
                <div><div className="font-display text-lg text-stone-600">{data.pending}</div><div className="text-stone-600">Pendientes</div></div>
                <div><div className="font-display text-lg text-status-danger">{data.overdue}</div><div className="text-stone-600">Vencidas</div></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-display text-xl text-ink-950 mb-4">Actividades del plan</h3>
          {data.activities.map((act) => (
            <div key={act.code} className={`card mb-3 ${act.state === 'in_progress' ? 'border border-accent' : ''}`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 flex items-center justify-center mt-1 ${
                    act.state === 'completed' ? 'bg-status-ok' : act.state === 'in_progress' ? 'border-2 border-accent' : 'border border-paper-200'
                  }`}>
                    {act.state === 'completed' && <i className="ti ti-check text-white text-sm" />}
                    {act.state === 'in_progress' && <i className="ti ti-progress text-accent text-sm" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-mono text-stone-600">{act.code}</span>
                      <Badge variant={act.state === 'completed' ? 'ok' : act.state === 'in_progress' ? 'accent' : 'default'}>
                        {act.state === 'completed' ? 'Completada' : act.state === 'in_progress' ? 'En curso' : 'Pendiente'}
                      </Badge>
                    </div>
                    <div className="text-[15px] text-ink-950 font-medium">{act.title}</div>
                    <div className="text-[12px] text-stone-600 mt-1">{act.meta}</div>
                    <div className="text-[12px] text-stone-700 mt-2">{act.description}</div>
                    {act.progress !== undefined && (
                      <div className="h-1.5 bg-paper-100 mt-3"><div className="h-full bg-accent" style={{ width: `${act.progress}%` }} /></div>
                    )}
                    {act.evidence && (
                      <div className="flex gap-2 mt-3 text-[11px] text-stone-700">
                        {act.evidence.map((e, i) => (
                          <span key={i} className="flex items-center gap-1"><i className="ti ti-paperclip" /> {e}</span>
                        ))}
                      </div>
                    )}
                    {act.state === 'in_progress' && (
                      <div className="flex gap-3 mt-3">
                        <button className="btn-link"><i className="ti ti-upload text-sm" /> Subir evidencia</button>
                        <button className="btn-link"><i className="ti ti-check text-sm" /> Marcar completada</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

const defaultPlan = {
  planCode: 'PM-2026-0028',
  eventTitle: 'Caída de paciente',
  progress: 40,
  completed: 2,
  inProgress: 1,
  pending: 2,
  overdue: 0,
  total: 5,
  createdAt: '27 may 2026',
  creator: 'D. Cáceres',
  deadline: '30 jun 2026',
  activities: [
    { code: 'ACT-01', state: 'completed', title: 'Inspección y reposición de barandas en camillas', meta: 'Responsable: L. Muñoz · Plazo: 28 may · Completada: 27 may', description: '12 camillas inspeccionadas. 3 requirieron reposición. Trabajo finalizado y firmado.', evidence: ['acta_inspeccion.pdf', 'foto_barandas.jpg'] },
    { code: 'ACT-02', state: 'completed', title: 'Reubicación de pacientes en igual situación', meta: 'Responsable: M. Soto · Plazo: 27 may · Completada: 26 may', description: '4 pacientes adultos mayores reubicados a butacas con apoyabrazos.' },
    { code: 'ACT-03', state: 'in_progress', title: 'Capacitación al personal en aplicación de escala Morse', meta: 'Responsable: D. Cáceres · Plazo: 15 jun · 60% avance', description: '18 de 30 funcionarios capacitados. Pendiente turno de noche.', progress: 60 },
    { code: 'ACT-04', state: 'pending', title: 'Diseño e instalación de señalización de pacientes de alto riesgo', meta: 'Responsable: A. Reyes · Plazo: 20 jun', description: 'Brazaletes de color amarillo para pacientes con Morse ≥ 45 puntos.' },
    { code: 'ACT-05', state: 'pending', title: 'Auditoría de verificación a 60 días', meta: 'Responsable: D. Cáceres · Plazo: 27 jul', description: 'Revisión de 30 fichas para verificar aplicación de las medidas.' },
  ],
};

export default PlanMejora;
