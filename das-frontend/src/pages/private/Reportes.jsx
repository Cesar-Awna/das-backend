import { PageHeader, Button } from '../../components/ui/index.js';
import { useReports, useRecentReports } from '../../hooks/useDomain.js';

const Reportes = () => {
  const reportTypes = useReports().data?.data || defaultTypes;
  const recent = useRecentReports().data?.data || defaultRecent;

  return (
    <>
      <PageHeader overline="Herramientas" title="Reportes y exportaciones" actions={<Button variant="primary" icon="ti-plus">Reporte personalizado</Button>} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10">
          <div className="overline-accent mb-3">Reportes disponibles</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Exporta información consolidada para presentar a autoridades y comités.
          </h2>
        </section>

        <section className="grid grid-cols-3 gap-6 mb-12">
          {reportTypes.map((r) => (
            <div key={r.key} className="card card-padded hover:border-ink-800 transition-colors cursor-pointer">
              <i className={`ti ${r.icon} text-2xl text-accent mb-4`} />
              <h3 className="font-display text-lg text-ink-950 mb-2">{r.title}</h3>
              <p className="text-[13px] text-stone-600 mb-4">{r.description}</p>
              <div className="flex gap-2">
                {r.formats.map((f) => (
                  <button key={f} className="btn-link flex items-center gap-1">
                    <i className={`ti ${f === 'PDF' ? 'ti-file-type-pdf' : 'ti-file-spreadsheet'}`} /> {f}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="font-display text-xl text-ink-950 mb-4">Reportes generados recientemente</h3>
          <div className="card divide-y divide-paper-100">
            {recent.map((r, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <i className={`ti ${r.format === 'pdf' ? 'ti-file-type-pdf text-status-danger' : 'ti-file-spreadsheet text-status-ok'} text-xl`} />
                <div className="flex-1">
                  <div className="text-[14px] text-ink-950 font-medium">{r.name}</div>
                  <div className="text-[12px] text-stone-600">{r.user} · {r.date} · {r.size}</div>
                </div>
                <a className="btn-link cursor-pointer"><i className="ti ti-download" /> Descargar</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

const defaultTypes = [
  { key: 'acreditacion', icon: 'ti-target', title: 'Cumplimiento de acreditación', description: 'Consolidado de indicadores, autoevaluación y planes de mejora.', formats: ['PDF', 'Excel'] },
  { key: 'eventos', icon: 'ti-alert-triangle', title: 'Eventos adversos', description: 'Estadísticas por tipo, gravedad, unidad y periodo.', formats: ['PDF', 'Excel'] },
  { key: 'ntb', icon: 'ti-clipboard-check', title: 'Autorización Sanitaria', description: 'Informes NTB con valorización e historial de cambios.', formats: ['PDF'] },
  { key: 'documental', icon: 'ti-files', title: 'Estado documental', description: 'Listado de vigentes, por vencer, vencidos y archivados.', formats: ['PDF', 'Excel'] },
  { key: 'supervision', icon: 'ti-list-check', title: 'Pautas de supervisión', description: 'Consolidado de pautas aplicadas y cumplimiento.', formats: ['PDF'] },
  { key: 'planes', icon: 'ti-clipboard-list', title: 'Planes de mejora', description: 'Avance, actividades pendientes y evidencias.', formats: ['PDF'] },
];

const defaultRecent = [
  { name: 'Cumplimiento Q1 2026.pdf', user: 'D. Cáceres', date: '02 abr 2026', size: '1.2 MB', format: 'pdf' },
  { name: 'Eventos adversos enero-marzo.xlsx', user: 'M. Soto', date: '28 mar 2026', size: '480 KB', format: 'xlsx' },
  { name: 'Informe NTB CEMSCO Lorenzo Arenas.pdf', user: 'D. Cáceres', date: '15 mar 2026', size: '2.8 MB', format: 'pdf' },
];

export default Reportes;
