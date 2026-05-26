import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useNtbEvaluacion, useNtbInformeValorizado } from '../../hooks/useDomain.js';

const TABS = ['Evaluación', 'Informe valorizado', 'Informe de evaluación', 'Historial de cambios'];

const AutorizacionSanitaria = () => {
  const [activeTab, setActiveTab] = useState(0);
  const evalQuery = useNtbEvaluacion('NTB-2026-CEMSCO-LA');
  const informeQuery = useNtbInformeValorizado('NTB-2026-CEMSCO-LA');

  const data = evalQuery.data?.data || defaultNtb;

  const actions = (
    <>
      <Button variant="secondary" icon="ti-download">Informe valorizado</Button>
      <Button variant="primary" icon="ti-plus">Nueva evaluación</Button>
    </>
  );

  return (
    <>
      <PageHeader overline="Módulo 2 · Autorización Sanitaria" title="Normas Técnicas Básicas" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10 grid grid-cols-12 gap-10 items-end">
          <div className="col-span-7">
            <div className="overline-accent mb-3">Evaluación NTB · {data.unit}</div>
            <h2 className="font-display text-3xl text-ink-950 leading-tight">
              Cumplimiento del <em className="italic-accent">{data.compliance}%</em> con inversión estimada de <em className="italic-accent">${data.investment}M</em>.
            </h2>
          </div>
          <div className="col-span-5 grid grid-cols-3 gap-4 text-[13px]">
            <div><div className="overline">Cumplen</div><div className="font-display text-2xl text-status-ok mt-1">{data.fulfilled}</div></div>
            <div><div className="overline">No cumplen</div><div className="font-display text-2xl text-status-danger mt-1">{data.notFulfilled}</div></div>
            <div><div className="overline">No aplica</div><div className="font-display text-2xl text-stone-700 mt-1">{data.notApplicable}</div></div>
          </div>
        </section>

        <div className="flex gap-1 border-b border-paper-200 mb-6">
          {TABS.map((t, i) => (
            <button key={t} className={`tab-btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>

        {activeTab === 0 && (
          <section>
            <h3 className="font-display text-xl text-ink-950 mb-4">Requisitos por categoría</h3>
            {data.categories.map((cat, ci) => (
              <div key={ci} className="card mb-4">
                <div className="px-6 py-4 border-b border-paper-100 bg-paper-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-ink-950">{cat.name}</h4>
                    <p className="text-[12px] text-stone-600 mt-0.5">{cat.summary}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-display text-xl text-status-${cat.variant}`}>{cat.percent}%</span>
                    <div className="w-24 h-1.5 bg-paper-100"><div className={`h-full bg-status-${cat.variant}`} style={{ width: `${cat.percent}%` }} /></div>
                  </div>
                </div>
                <div className="divide-y divide-paper-100">
                  {cat.requirements.map((r) => (
                    <div key={r.code} className="px-6 py-4 grid items-center gap-4" style={{ gridTemplateColumns: '60px 1fr 200px 120px 100px' }}>
                      <span className="text-[12px] text-stone-600 font-mono">{r.code}</span>
                      <div>
                        <div className="text-[14px] text-ink-950">{r.text}</div>
                        {r.area && <div className="text-[11px] text-stone-500 mt-0.5">{r.area}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button className={`px-3 py-1 text-[11px] ${r.state === 'cumple' ? 'bg-status-ok/10 text-status-ok border border-status-ok/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>Cumple</button>
                        <button className={`px-3 py-1 text-[11px] ${r.state === 'no_cumple' ? 'bg-status-danger/10 text-status-danger border border-status-danger/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>No cumple</button>
                        <button className={`px-3 py-1 text-[11px] ${r.state === 'na' ? 'bg-stone-100 text-stone-700 border border-paper-200' : 'border border-paper-200 text-stone-600 bg-white'}`}>N/A</button>
                      </div>
                      <span className={`text-[13px] ${r.cost ? 'text-status-danger font-medium' : 'text-stone-700'}`}>{r.cost || '—'}</span>
                      <i className="ti ti-paperclip text-stone-500" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-paper-50 border border-paper-200 p-6 flex items-center justify-between">
              <div>
                <div className="overline">Inversión total requerida</div>
                <div className="font-display text-3xl text-ink-950">${data.investmentTotal}</div>
                <div className="text-[12px] text-stone-600 mt-1">Distribuida en corto, mediano y largo plazo</div>
              </div>
              <Button variant="primary" icon="ti-file-text">Generar informe valorizado</Button>
            </div>
          </section>
        )}

        {activeTab === 1 && (
          <section className="card card-padded">
            <h3 className="font-display text-xl text-ink-950 mb-2">Informe valorizado de inversión</h3>
            <p className="text-[13px] text-stone-600 mb-6">Cuantificación económica de las brechas detectadas.</p>
            <div className="space-y-4">
              {(informeQuery.data?.data?.items || defaultInforme).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-paper-100">
                  <div>
                    <div className="text-[13px] text-ink-950 font-medium">{item.code} · {item.description}</div>
                    <div className="text-[11px] text-stone-500">{item.term} · {item.category}</div>
                  </div>
                  <span className="font-display text-lg text-status-danger">${item.cost}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 2 && (
          <section className="card card-padded">
            <h3 className="font-display text-xl text-ink-950 mb-2">Informe de evaluación</h3>
            <p className="text-[13px] text-stone-600 mb-6">Resumen ejecutivo de la evaluación NTB.</p>
            <div className="prose max-w-none text-[14px] text-stone-700 leading-relaxed">
              <p>La evaluación realizada el 15 de marzo de 2026 a las instalaciones del <strong>{data.unit}</strong> arrojó un cumplimiento general del <strong className="italic-accent">{data.compliance}%</strong>.</p>
              <p className="mt-4">Las principales brechas se concentran en infraestructura física y equipamiento médico, requiriendo una inversión estimada de ${data.investmentTotal} para alcanzar el cumplimiento total.</p>
              <p className="mt-4">Se recomienda iniciar el plan de mejora con las brechas de mayor criticidad (acceso para movilidad reducida y sistema de ventilación), seguidas de la renovación de equipamiento crítico.</p>
            </div>
          </section>
        )}

        {activeTab === 3 && (
          <section className="card">
            <div className="px-6 py-4 border-b border-paper-100 bg-paper-50">
              <h3 className="font-medium text-ink-950">Historial de cambios por unidad</h3>
              <p className="text-[12px] text-stone-600 mt-0.5">Registro de modificaciones y evaluaciones previas</p>
            </div>
            {defaultHistorial.map((h, i) => (
              <div key={i} className="px-6 py-4 border-b border-paper-100 last:border-0 flex items-center gap-4">
                <i className="ti ti-history text-stone-500" />
                <div className="flex-1">
                  <div className="text-[13px] text-ink-950 font-medium">{h.action}</div>
                  <div className="text-[11px] text-stone-500">{h.user} · {h.date}</div>
                </div>
                <Badge variant="default">{h.tag}</Badge>
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
};

const defaultNtb = {
  unit: 'CEMSCO Lorenzo Arenas',
  compliance: '76,2',
  investment: '24,5',
  fulfilled: 87,
  notFulfilled: 21,
  notApplicable: 6,
  investmentTotal: '24.500.000',
  categories: [
    { name: 'Infraestructura física', summary: '32 requisitos · 24 cumplen · 6 no cumplen · 2 no aplica', percent: 75, variant: 'warn', requirements: [
      { code: 'INF-04', text: 'Box clínicos con dimensiones mínimas', area: 'Salas de atención abierta', state: 'cumple' },
      { code: 'INF-09', text: 'Acceso para personas con movilidad reducida', area: 'Rampa y ancho de puertas', state: 'no_cumple', cost: '3.500.000' },
      { code: 'INF-12', text: 'Sistema de ventilación en sala de procedimientos', area: 'Renovación de aire', state: 'no_cumple', cost: '8.200.000' },
    ] },
    { name: 'Equipamiento médico', summary: '28 requisitos · 21 cumplen · 5 no cumplen · 2 no aplica', percent: 80, variant: 'warn', requirements: [
      { code: 'EQP-03', text: 'Esterilizador con registros de validación', state: 'cumple' },
      { code: 'EQP-07', text: 'Desfibrilador con mantenimiento vigente', state: 'no_cumple', cost: '2.800.000' },
    ] },
  ],
};

const defaultInforme = [
  { code: 'INF-09', description: 'Acceso para personas con movilidad reducida', term: 'Corto plazo (≤ 6 meses)', category: 'Infraestructura', cost: '3.500.000' },
  { code: 'INF-12', description: 'Sistema de ventilación en sala de procedimientos', term: 'Mediano plazo (6-12 meses)', category: 'Infraestructura', cost: '8.200.000' },
  { code: 'EQP-07', description: 'Desfibrilador con mantenimiento vigente', term: 'Corto plazo', category: 'Equipamiento', cost: '2.800.000' },
  { code: 'INF-15', description: 'Sistema eléctrico de respaldo', term: 'Largo plazo', category: 'Infraestructura', cost: '10.000.000' },
];

const defaultHistorial = [
  { action: 'Evaluación NTB 2026 completada', user: 'D. Cáceres', date: '15 mar 2026', tag: 'Evaluación' },
  { action: 'Modificación de box clínico #3', user: 'L. Muñoz', date: '02 mar 2026', tag: 'Cambio físico' },
  { action: 'Evaluación NTB 2025', user: 'D. Cáceres', date: '20 oct 2025', tag: 'Evaluación' },
  { action: 'Renovación de esterilizador', user: 'R. Vidal', date: '15 jul 2025', tag: 'Equipamiento' },
];

export default AutorizacionSanitaria;
