import { useState } from 'react';
import { PageHeader, Badge } from '../../components/ui/index.js';
import { useSearch } from '../../hooks/useDomain.js';

const Busqueda = () => {
  const [q, setQ] = useState('esterilización');
  const [filter, setFilter] = useState('all');
  const search = useSearch(q);
  const results = search.data?.data || defaultResults;
  const filtered = filter === 'all' ? results : results.filter(r => r.type === filter);

  return (
    <>
      <PageHeader overline="Herramientas" title="Búsqueda global" />
      <div className="p-10 max-w-7xl">
        <section className="mb-10">
          <div className="overline-accent mb-3">Buscar en todo el sistema</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight mb-6">
            Encuentra documentos, indicadores, pautas y eventos en un solo lugar.
          </h2>
          <div className="relative max-w-3xl">
            <i className="ti ti-search absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 text-lg" />
            <input className="input-box pl-12" value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingTop: 14, paddingBottom: 14, fontSize: 15 }} />
          </div>
          <div className="flex gap-2 mt-4 text-[12px]">
            <span className="text-stone-600">Filtrar:</span>
            {[
              { k: 'all', label: 'Todo', count: results.length },
              { k: 'document', label: 'Documentos', count: results.filter(r => r.type === 'document').length },
              { k: 'indicator', label: 'Indicadores', count: results.filter(r => r.type === 'indicator').length },
              { k: 'pauta', label: 'Pautas', count: results.filter(r => r.type === 'pauta').length },
              { k: 'event', label: 'Eventos', count: results.filter(r => r.type === 'event').length },
            ].map(f => (
              <button key={f.k} onClick={() => setFilter(f.k)} className={`px-3 py-1 ${filter === f.k ? 'bg-ink-950 text-paper' : 'border border-paper-200 text-stone-600 bg-white hover:border-ink-800'}`}>
                {f.label} · {f.count}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          {filtered.map((r, i) => (
            <div key={i} className="card p-5 hover:bg-paper-50 cursor-pointer">
              <div className="flex items-start gap-4">
                <i className={`ti ${r.icon} text-stone-500 text-xl`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge>{r.typeLabel}</Badge>
                    <span className="text-[11px] font-mono text-stone-500">{r.code}</span>
                    {r.status && <Badge variant={r.statusVariant}>{r.status}</Badge>}
                  </div>
                  <div className="text-[14px] text-ink-950 font-medium" dangerouslySetInnerHTML={{ __html: r.title }} />
                  {r.meta && <div className="text-[12px] text-stone-600 mt-1">{r.meta}</div>}
                  {r.excerpt && <div className="text-[12px] text-stone-700 mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: r.excerpt }} />}
                </div>
                <i className="ti ti-arrow-up-right text-stone-600" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

const mark = (text, term) => text.replace(new RegExp(`(${term})`, 'gi'), '<mark class="bg-accent/20 text-ink-950 px-0.5">$1</mark>');

const defaultResults = [
  { type: 'document', typeLabel: 'Documento', code: 'PRO-042', status: 'Vigente', statusVariant: 'ok', icon: 'ti-files', title: 'Esterilización de instrumental dental', meta: 'Procedimiento · Servicio Dental · v1.7 · 28 ene 2026', excerpt: mark('…protocolo de esterilización química y por autoclave para instrumental dental, incluyendo indicadores biológicos y químicos…', 'esterilización') },
  { type: 'pauta', typeLabel: 'Pauta de supervisión', code: 'PSE-007', status: 'Programada hoy', statusVariant: 'warn', icon: 'ti-list-check', title: mark('Supervisión de protocolo de esterilización dental', 'esterilización'), meta: 'Vinculada a PRO-042 · R. Vidal' },
  { type: 'indicator', typeLabel: 'Indicador', code: 'EQP-03', icon: 'ti-target', title: mark('Validación de equipo esterilizador', 'esterilizador'), meta: 'Seguridad del equipamiento · Trimestral · L. Muñoz' },
  { type: 'document', typeLabel: 'Documento', code: 'MAN-007', status: 'Por vencer', statusVariant: 'warn', icon: 'ti-files', title: 'Manual de bioseguridad institucional', excerpt: mark('…sección 4.2 sobre esterilización y desinfección de superficies clínicas en zonas críticas…', 'esterilización') },
];

export default Busqueda;
