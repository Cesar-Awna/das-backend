import { Link } from 'react-router-dom';
import { PageHeader, Button } from '../../components/ui/index.js';
import { useIndicatorComparison } from '../../hooks/useIndicators.js';

const Comparativa = () => {
  const cmp = useIndicatorComparison('Q1-2026', 'Q2-2026');
  const data = cmp.data?.data || defaultCompare;

  const breadcrumb = (
    <>
      <Link to="/acreditacion" className="hover:text-ink-950">Acreditación</Link>
      <i className="ti ti-chevron-right text-[10px]" /> <span>Comparativa</span>
    </>
  );

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title="Comparativa entre periodos" actions={<Button variant="secondary" icon="ti-download">Exportar comparativa</Button>} />
      <div className="p-10 max-w-7xl">
        <section className="mb-8">
          <div className="overline-accent mb-3">Evolución del cumplimiento</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Compare resultados entre periodos para identificar tendencias y mejoras.
          </h2>
        </section>

        <div className="card card-padded mb-8">
          <div className="grid grid-cols-3 gap-6 items-end">
            <div>
              <label className="input-label mb-2">Periodo A (referencia)</label>
              <select className="input-line"><option>Q1 2026 · Enero–Marzo</option><option>Q4 2025 · Octubre–Diciembre</option></select>
            </div>
            <div>
              <label className="input-label mb-2">Periodo B (comparar)</label>
              <select className="input-line"><option>Q2 2026 · Abril–Junio</option></select>
            </div>
            <div>
              <label className="input-label mb-2">Filtrar por</label>
              <select className="input-line"><option>Todos los ámbitos</option><option>Solo obligatorios</option></select>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-px bg-paper-100 border border-paper-100 mb-10">
          <div className="bg-white p-6">
            <div className="overline mb-2">{data.periodA.label}</div>
            <div className="font-display text-4xl text-ink-950">{data.periodA.value}%</div>
            <div className="text-[12px] text-stone-600 mt-1">Cumplimiento global</div>
          </div>
          <div className="bg-white p-6">
            <div className="overline mb-2">{data.periodB.label}</div>
            <div className="font-display text-4xl text-ink-950">{data.periodB.value}%</div>
            <div className="text-[12px] text-stone-600 mt-1">Cumplimiento global</div>
          </div>
          <div className="bg-paper-50 p-6">
            <div className="overline mb-2">Variación</div>
            <div className="font-display text-4xl text-status-ok">+{data.delta}%</div>
            <div className="text-[12px] text-status-ok mt-1 flex items-center gap-1">
              <i className="ti ti-trending-up text-sm" /> Mejora respecto al anterior
            </div>
          </div>
        </section>

        <section className="card card-padded mb-10">
          <h3 className="font-display text-xl text-ink-950 mb-1">Cumplimiento por ámbito</h3>
          <p className="text-[13px] text-stone-600 mb-6">{data.periodA.label} vs {data.periodB.label}</p>
          <div className="space-y-5">
            {data.ambitos.map((a) => (
              <div key={a.name}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] text-ink-950 font-medium">{a.name}</span>
                  <div className="flex items-baseline gap-4 text-[12px]">
                    <span className="text-stone-600">A: {a.a}%</span>
                    <span className="text-ink-950 font-medium">B: {a.b}%</span>
                    <span className={`text-status-${a.b > a.a ? 'ok' : 'danger'}`}>{a.b > a.a ? '+' : ''}{a.b - a.a}%</span>
                  </div>
                </div>
                <div className="relative h-6 bg-paper-100">
                  <div className="absolute h-full bg-paper-200" style={{ width: `${a.a}%` }} />
                  <div className={`absolute h-full bg-status-${a.variant}`} style={{ width: `${a.b}%`, opacity: 0.85 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-6 pt-6 border-t border-paper-100 text-[12px] text-stone-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-paper-200" /> {data.periodA.label}</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-status-ok opacity-85" /> {data.periodB.label}</div>
          </div>
        </section>

        <section>
          <h3 className="font-display text-xl text-ink-950 mb-4">Indicadores con mayor variación</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] tracking-wider uppercase text-status-ok mb-3">Mejoras destacadas</div>
              <div className="card">
                {data.improvements.map((d, i) => (
                  <div key={i} className="p-4 border-b border-paper-100 last:border-0 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-ink-950 font-medium">{d.code} · {d.name}</div>
                      <div className="text-[11px] text-stone-500">{d.from} → {d.to}</div>
                    </div>
                    <span className="font-display text-lg text-status-ok">{d.delta}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] tracking-wider uppercase text-status-danger mb-3">Deterioros</div>
              <div className="card">
                {data.declines.map((d, i) => (
                  <div key={i} className="p-4 border-b border-paper-100 last:border-0 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-ink-950 font-medium">{d.code} · {d.name}</div>
                      <div className="text-[11px] text-stone-500">{d.from} → {d.to}</div>
                    </div>
                    <span className="font-display text-lg text-status-danger">{d.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const defaultCompare = {
  periodA: { label: 'Q1 2026', value: '85,3' },
  periodB: { label: 'Q2 2026', value: '87,4' },
  delta: '2,1',
  ambitos: [
    { name: 'Dignidad del paciente', a: 91, b: 94, variant: 'ok' },
    { name: 'Gestión de la calidad', a: 86, b: 89, variant: 'ok' },
    { name: 'Acceso, oportunidad', a: 78, b: 76, variant: 'warn' },
    { name: 'Registros clínicos', a: 68, b: 71, variant: 'warn' },
    { name: 'Seguridad del equipamiento', a: 62, b: 58, variant: 'danger' },
  ],
  improvements: [
    { code: 'DIG-01', name: 'Consentimiento informado', from: '92%', to: '97,8%', delta: '+5,8%' },
    { code: 'CAL-04', name: 'Pautas planificadas', from: '88%', to: '92,5%', delta: '+4,5%' },
    { code: 'REG-02', name: 'Registros completos', from: '68%', to: '71,3%', delta: '+3,3%' },
  ],
  declines: [
    { code: 'IAAS-03', name: 'Infecciones IAAS', from: '2,8%', to: '5,2%', delta: '-2,4 p.p.' },
    { code: 'EQP-01', name: 'Mantención equipos', from: '62%', to: '58%', delta: '-4,0%' },
    { code: 'ACC-03', name: 'Tiempo de espera', from: '32 min', to: '38 min', delta: '+6 min' },
  ],
};

export default Comparativa;
