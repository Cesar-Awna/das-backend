import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { PageHeader, Badge, Loader, ErrorState, Button, useToast } from '../../components/ui/index.js';
import { useIndicator, useIndicatorMeasurements, useAddMeasurement } from '../../hooks/useIndicators.js';

const IndicadorDetalle = () => {
  const { id } = useParams();
  const ind = useIndicator(id);
  const measurements = useIndicatorMeasurements(id);
  const addMeasurement = useAddMeasurement(id);
  const toast = useToast();

  const [numerator, setNumerator] = useState(18);
  const [denominator, setDenominator] = useState(346);
  const computed = ((numerator / denominator) * 100).toFixed(2).replace('.', ',');

  const indicator = ind.data?.data || defaultIndicator;
  const history = measurements.data?.data || defaultMeasurements;

  const handleSave = async () => {
    try {
      await addMeasurement.mutateAsync({ numerator, denominator, period: '2026-05' });
      toast.success('Medición guardada');
    } catch (e) {
      toast.error('No se pudo guardar la medición');
    }
  };

  const breadcrumb = (
    <>
      <Link to="/acreditacion" className="hover:text-ink-950">Indicadores</Link>
      <i className="ti ti-chevron-right text-[10px]" /> <span>{id}</span>
    </>
  );

  const actions = (
    <>
      <button className="btn btn-secondary"><i className="ti ti-edit" /> Editar</button>
      <button className="btn btn-primary" onClick={handleSave}><i className="ti ti-plus" /> Cargar medición</button>
    </>
  );

  if (ind.isLoading) return <Loader message="Cargando indicador…" />;

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title={indicator.name} actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="grid grid-cols-12 gap-10 mb-10">
          <div className="col-span-8">
            <div className="text-[11px] tracking-[0.2em] uppercase text-status-danger mb-3">Última medición no cumple meta</div>
            <h2 className="font-display text-4xl text-ink-950 leading-tight mb-4">
              La tasa actual es de <em className="italic-danger">{indicator.currentValue}</em>, superando la meta institucional de {indicator.goal}.
            </h2>
            <p className="text-[15px] text-stone-600 leading-relaxed">{indicator.description}</p>
          </div>
          <div className="col-span-4 card card-padded">
            <div className="overline mb-3">Configuración</div>
            <div className="space-y-3 text-[13px]">
              {[
                ['Código', indicator.code],
                ['Ámbito', indicator.ambito],
                ['Periodicidad', indicator.frequency],
                ['Meta', indicator.goal],
                ['Responsable', indicator.responsible],
                ['Suplente', indicator.deputy],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-stone-600">{k}</span>
                  <span className="text-ink-950">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="card card-padded mb-10">
          <h3 className="font-display text-xl text-ink-950 mb-1">Evolución histórica</h3>
          <p className="text-[13px] text-stone-600 mb-6">Últimos 6 meses · % infecciones</p>
          <svg viewBox="0 0 800 280" className="w-full">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a83a30" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#a83a30" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 100, 160, 220].map((y, i) => <line key={i} x1="60" y1={y} x2="780" y2={y} stroke="#eaeae0" strokeWidth="0.5" />)}
            {['6%', '4%', '2%', '0%'].map((t, i) => <text key={i} x="50" y={44 + i * 60} textAnchor="end" fill="#6b6b62" fontSize="11">{t}</text>)}
            {['Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May'].map((m, i) => <text key={i} x={120 + i * 120} y="260" textAnchor="middle" fill="#6b6b62" fontSize="11">{m}</text>)}
            <line x1="60" y1="130" x2="780" y2="130" stroke="#b8854a" strokeWidth="1" strokeDasharray="4 4" />
            <text x="775" y="126" textAnchor="end" fill="#b8854a" fontSize="10">Meta ≤ 3,0%</text>
            <path d="M120,154 L240,148 L360,142 L480,124 L600,112 L720,94 L720,240 L120,240 Z" fill="url(#g2)" />
            <polyline points="120,154 240,148 360,142 480,124 600,112 720,94" fill="none" stroke="#a83a30" strokeWidth="2" />
            {[[120, 154], [240, 148], [360, 142], [480, 124], [600, 112]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#a83a30" strokeWidth="2" />
            ))}
            <circle cx="720" cy="94" r="5" fill="#a83a30" />
            <text x="720" y="82" textAnchor="middle" fill="#a83a30" fontSize="13" fontWeight="600" fontFamily="Fraunces">5,2%</text>
          </svg>
        </section>

        <section className="grid grid-cols-12 gap-8 mb-10">
          <div className="col-span-7">
            <div className="overline-accent mb-2">Cargar medición</div>
            <h3 className="font-display text-xl text-ink-950 mb-1">Nueva medición · Mayo 2026</h3>
            <p className="text-[13px] text-stone-600 mb-6">El sistema calculará automáticamente el porcentaje.</p>
            <div className="card card-padded space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="input-label">Periodo</label><input type="month" className="input-line" defaultValue="2026-05" /></div>
                <div><label className="input-label">Fecha medición</label><input type="date" className="input-line" defaultValue="2026-05-26" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Numerador (infecciones)</label>
                  <input type="number" className="input-line" value={numerator} onChange={(e) => setNumerator(+e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Denominador (atenciones)</label>
                  <input type="number" className="input-line" value={denominator} onChange={(e) => setDenominator(+e.target.value)} />
                </div>
              </div>
              <div className="bg-paper-50 border border-paper-200 p-4 flex items-center justify-between">
                <div>
                  <div className="overline">Resultado calculado</div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className={`font-display text-3xl ${parseFloat(computed.replace(',', '.')) > 3 ? 'text-status-danger' : 'text-status-ok'}`}>{computed}%</span>
                    <Badge variant={parseFloat(computed.replace(',', '.')) > 3 ? 'danger' : 'ok'}>
                      {parseFloat(computed.replace(',', '.')) > 3 ? 'No cumple' : 'Cumple'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right text-[12px] text-stone-600"><div>Meta: ≤ 3,0%</div></div>
              </div>
              <div>
                <label className="input-label">Documento de respaldo</label>
                <button className="w-full border border-dashed border-paper-200 px-4 py-6 text-[12px] text-stone-600 hover:border-ink-800 flex items-center justify-center gap-2 bg-white">
                  <i className="ti ti-upload" /> Adjuntar archivo PDF
                </button>
              </div>
              <div><label className="input-label">Observaciones</label><textarea className="input-line" rows="2" /></div>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" full onClick={handleSave} disabled={addMeasurement.isPending}>
                  {addMeasurement.isPending ? 'Guardando…' : 'Guardar medición'}
                </Button>
                <Button variant="secondary">Cancelar</Button>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="overline mb-2">Historial</div>
            <h3 className="font-display text-xl text-ink-950 mb-1">Últimas mediciones</h3>
            <p className="text-[13px] text-stone-600 mb-6">Registro cronológico con respaldos adjuntos.</p>
            <div className="card">
              {history.map((m, i) => (
                <div key={i} className="p-4 border-b border-paper-100 last:border-0 flex items-start gap-3">
                  <div className={`font-display text-2xl text-status-${m.variant} w-16`}>{m.value}</div>
                  <div className="flex-1">
                    <div className="text-[13px] text-ink-950 font-medium">{m.period}</div>
                    <div className="text-[11px] text-stone-500">{m.user} · {m.date}</div>
                    <button className="btn-link mt-1 flex items-center gap-1"><i className="ti ti-file text-sm" /> Ver respaldo</button>
                  </div>
                  <Badge variant={m.variant}>{m.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const defaultIndicator = { name: 'Tasa de infecciones asociadas a atención', code: 'IAAS-03', ambito: 'Seguridad del paciente', frequency: 'Mensual', goal: '≤ 3,0%', responsible: 'D. Cáceres', deputy: 'M. Soto', currentValue: '5,2%', description: 'Este indicador mide la proporción de pacientes que desarrollan infección asociada durante la atención. Una variación al alza requiere análisis causa-raíz y plan de mejora.' };
const defaultMeasurements = [
  { value: '5,2%', period: 'Mayo 2026', user: 'D. Cáceres', date: '26 may', variant: 'danger', status: 'No cumple' },
  { value: '4,5%', period: 'Abril 2026', user: 'D. Cáceres', date: '28 abr', variant: 'warn', status: 'Bajo meta' },
  { value: '3,9%', period: 'Marzo 2026', user: 'M. Soto', date: '30 mar', variant: 'warn', status: 'Bajo meta' },
  { value: '2,8%', period: 'Febrero 2026', user: 'D. Cáceres', date: '27 feb', variant: 'ok', status: 'Cumple' },
  { value: '2,5%', period: 'Enero 2026', user: 'D. Cáceres', date: '31 ene', variant: 'ok', status: 'Cumple' },
];

export default IndicadorDetalle;
