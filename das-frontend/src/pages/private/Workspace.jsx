import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useState } from 'react';
import { useMyTasks } from '../../hooks/useDomain.js';

const Workspace = () => {
  const tasksQuery = useMyTasks();
  const tasks = tasksQuery.data?.data || defaultTasks;
  const [numerator, setNumerator] = useState(18);
  const [denominator, setDenominator] = useState(346);
  const computed = ((numerator / denominator) * 100).toFixed(2).replace('.', ',');

  return (
    <>
      <PageHeader
        overline="Mi día · Tareas pendientes"
        title="Espacio de trabajo"
        actions={
          <>
            <span className="text-[12px] text-stone-600">Filtrar:</span>
            <select className="input-box"><option>Todas mis tareas</option><option>Vencidas</option><option>Hoy</option></select>
          </>
        }
      />
      <div className="p-10 max-w-7xl">
        <section className="mb-8">
          <div className="overline-accent mb-3">Carga unificada</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Ingrese mediciones de indicadores y aplique pautas de supervisión en una sola ventana.
          </h2>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <h3 className="font-display text-lg text-ink-950 mb-4">Pendientes asignadas a ti</h3>
            <div className="space-y-3">
              {tasks.map((t, i) => (
                <div key={i} className={`card p-4 cursor-pointer ${i === 0 ? 'border border-accent' : 'hover:border-paper-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`ti ${t.icon} ${i === 0 ? 'text-accent' : 'text-stone-600'}`} />
                    <span className="text-[11px] font-mono text-stone-600">{t.code}</span>
                    <Badge variant={t.urgentVariant} className="ml-auto">{t.urgentLabel}</Badge>
                  </div>
                  <div className="text-[14px] text-ink-950 font-medium">{t.title}</div>
                  <div className="text-[12px] text-stone-600 mt-1">{t.meta}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-8">
            <div className="overline-accent mb-2">Editando indicador</div>
            <h3 className="font-display text-2xl text-ink-950 mb-1">IAAS-03 · Tasa de infecciones</h3>
            <p className="text-[13px] text-stone-600 mb-6">Periodo: Mayo 2026 · Vencimiento: ayer</p>

            <div className="card card-padded mb-4">
              <div className="flex items-center gap-2 mb-4">
                <i className="ti ti-target text-accent" />
                <h4 className="font-medium text-ink-950">Medición del indicador</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="input-label">Numerador (infecciones)</label>
                  <input type="number" className="input-line" value={numerator} onChange={(e) => setNumerator(+e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Denominador (atenciones)</label>
                  <input type="number" className="input-line" value={denominator} onChange={(e) => setDenominator(+e.target.value)} />
                </div>
              </div>
              <div className="bg-paper-50 border border-paper-200 p-4 flex items-center justify-between mb-4">
                <div>
                  <div className="overline">Resultado calculado</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-display text-3xl text-status-danger">{computed}%</span>
                    <Badge variant="danger">No cumple meta</Badge>
                  </div>
                </div>
                <div className="text-right text-[12px] text-stone-600"><div>Meta: ≤ 3,0%</div></div>
              </div>
              <div>
                <label className="input-label">Respaldo</label>
                <button className="w-full border border-dashed border-paper-200 px-4 py-3 text-[12px] text-stone-600 hover:border-ink-800 flex items-center justify-center gap-2 bg-white">
                  <i className="ti ti-upload" /> Adjuntar PDF
                </button>
              </div>
            </div>

            <div className="card card-padded mb-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ti ti-list-check text-accent" />
                <h4 className="font-medium text-ink-950">Pauta de supervisión vinculada</h4>
              </div>
              <p className="text-[12px] text-stone-600 mb-4">PSE-009 · Verificación de protocolo IAAS · Aplicar simultáneamente</p>
              <div className="space-y-2">
                {[
                  { text: 'Lavado de manos según protocolo', state: 'cumple' },
                  { text: 'Uso de EPP en procedimientos', state: 'cumple' },
                  { text: 'Esterilización de instrumental', state: 'no_cumple' },
                  { text: 'Limpieza de superficies clínicas', state: 'cumple' },
                ].map((c, i) => (
                  <div key={i} className="border border-paper-100 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[13px] text-ink-950">{i + 1}. {c.text}</div>
                      <div className="flex gap-2">
                        <button className={`px-3 py-1 text-[11px] ${c.state === 'cumple' ? 'bg-status-ok/10 text-status-ok border border-status-ok/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>Cumple</button>
                        <button className={`px-3 py-1 text-[11px] ${c.state === 'no_cumple' ? 'bg-status-danger/10 text-status-danger border border-status-danger/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>No cumple</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" full icon="ti-device-floppy" style={{ padding: 14 }}>
                Guardar indicador y pauta
              </Button>
              <Button variant="secondary" icon="ti-x">Cancelar</Button>
            </div>
            <p className="text-[12px] text-stone-600 mt-4 text-center">
              Al guardar, se registra la medición + la pauta aplicada + se actualizan los gráficos vinculados.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const defaultTasks = [
  { icon: 'ti-target', code: 'IAAS-03', title: 'Tasa de infecciones IAAS', meta: 'Indicador · Mensual · Mayo 2026', urgentLabel: 'Vencido', urgentVariant: 'danger' },
  { icon: 'ti-list-check', code: 'PSE-007', title: 'Esterilización dental', meta: 'Pauta supervisión · Servicio Dental', urgentLabel: 'Hoy', urgentVariant: 'warn' },
  { icon: 'ti-target', code: 'CAL-04', title: 'Pautas planificadas', meta: 'Indicador · Trimestral · Q2 2026', urgentLabel: 'Esta semana', urgentVariant: 'default' },
  { icon: 'ti-list-check', code: 'PSE-002', title: 'Revisión de eventos adversos', meta: 'Pauta supervisión · Mensual', urgentLabel: '30 may', urgentVariant: 'default' },
  { icon: 'ti-target', code: 'DIG-01', title: 'Consentimiento informado', meta: 'Indicador · Mensual', urgentLabel: '1 jun', urgentVariant: 'default' },
];

export default Workspace;
