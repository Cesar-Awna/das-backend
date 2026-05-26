import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';

const ELEMENTS = [
  { id: 'EM 1.1.a', text: 'Existe un documento institucional aprobado', verification: 'Procedimiento POL-023 vigente', state: 'cumple' },
  { id: 'EM 1.1.b', text: 'El consentimiento se aplica en procedimientos invasivos', verification: 'Auditoría de 30 fichas · ≥ 95%', state: 'cumple' },
  { id: 'EM 1.2.a', text: 'Pacientes son identificados con 2 datos al menos', state: 'no_cumple', justification: 'Auditoría revela que en 8/30 fichas falta segundo identificador' },
  { id: 'EM 1.2.b', text: 'Existe brazalete o sistema de identificación visual', state: 'no_aplica', justification: 'Atención abierta, no aplica' },
];

const Autoevaluacion = () => {
  const [elements, setElements] = useState(ELEMENTS);

  const setState = (idx, state) => {
    const next = [...elements];
    next[idx].state = state;
    setElements(next);
  };

  const breadcrumb = (
    <>
      <Link to="/acreditacion" className="hover:text-ink-950">Acreditación</Link>
      <i className="ti ti-chevron-right text-[10px]" /> <span>Autoevaluación</span>
    </>
  );

  const actions = (
    <>
      <Button variant="secondary" icon="ti-device-floppy">Guardar borrador</Button>
      <Button variant="primary" icon="ti-check">Finalizar autoevaluación</Button>
    </>
  );

  const StateBtn = ({ state, current, onClick, children, variant }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] border ${
        current === state
          ? `bg-status-${variant}/10 text-status-${variant} border-status-${variant}/30`
          : 'border-paper-200 text-stone-600 bg-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title="Pauta del Manual de Acreditación" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10 grid grid-cols-12 gap-10 items-end">
          <div className="col-span-7">
            <div className="overline-accent mb-3">Manual de Acreditación · Superintendencia de Salud</div>
            <h2 className="font-display text-3xl text-ink-950 leading-tight">CEMSCO Lorenzo Arenas · Periodo Q2 2026</h2>
            <p className="text-[14px] text-stone-600 mt-2">Estado: borrador · 78 de 108 elementos evaluados (72%)</p>
          </div>
          <div className="col-span-5 grid grid-cols-3 gap-4 text-[13px]">
            <div><div className="overline">Cumple</div><div className="font-display text-2xl text-status-ok mt-1">58</div></div>
            <div><div className="overline">No cumple</div><div className="font-display text-2xl text-status-danger mt-1">14</div></div>
            <div><div className="overline">No aplica</div><div className="font-display text-2xl text-stone-700 mt-1">6</div></div>
          </div>
        </section>

        <div className="card mb-6">
          <div className="px-6 py-4 border-b border-paper-100 bg-paper-50 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-ink-950">Ámbito DIG · Dignidad del paciente</h3>
              <p className="text-[12px] text-stone-600 mt-0.5">12 características · 24 elementos medibles · 87% cumplimiento</p>
            </div>
            <i className="ti ti-chevron-up text-stone-600" />
          </div>

          <div className="p-6 border-b border-paper-100">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-mono text-stone-600">DIG-1.1</span>
                <Badge variant="danger">Obligatoria</Badge>
              </div>
              <h4 className="font-medium text-ink-950">Existe procedimiento de consentimiento informado</h4>
            </div>
            <div className="space-y-3">
              {elements.slice(0, 2).map((em, i) => (
                <div key={em.id} className="p-4 border border-paper-100 bg-paper-50">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="text-[13px] text-ink-950 mb-1">{em.id} · {em.text}</div>
                      {em.verification && <div className="text-[11px] text-stone-600">Punto de verificación: {em.verification}</div>}
                    </div>
                    <div className="flex gap-2">
                      <StateBtn state="cumple" current={em.state} onClick={() => setState(i, 'cumple')} variant="ok">Cumple</StateBtn>
                      <StateBtn state="no_cumple" current={em.state} onClick={() => setState(i, 'no_cumple')} variant="danger">No cumple</StateBtn>
                      <StateBtn state="no_aplica" current={em.state} onClick={() => setState(i, 'no_aplica')} variant="warn">N/A</StateBtn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border-b border-paper-100">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[12px] font-mono text-stone-600">DIG-1.2</span>
                <Badge variant="danger">Obligatoria</Badge>
              </div>
              <h4 className="font-medium text-ink-950">Existe procedimiento de identificación segura</h4>
            </div>
            <div className="space-y-3">
              {elements.slice(2, 4).map((em, idx) => {
                const i = idx + 2;
                return (
                  <div key={em.id} className="p-4 border border-paper-100 bg-paper-50">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="text-[13px] text-ink-950 mb-1">{em.id} · {em.text}</div>
                      </div>
                      <div className="flex gap-2">
                        <StateBtn state="cumple" current={em.state} onClick={() => setState(i, 'cumple')} variant="ok">Cumple</StateBtn>
                        <StateBtn state="no_cumple" current={em.state} onClick={() => setState(i, 'no_cumple')} variant="danger">No cumple</StateBtn>
                        <StateBtn state="no_aplica" current={em.state} onClick={() => setState(i, 'no_aplica')} variant="warn">N/A</StateBtn>
                      </div>
                    </div>
                    {em.justification && (
                      <textarea className="input-line mt-3 text-[12px]" rows="1" defaultValue={em.justification} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-paper-50 flex items-center justify-between">
            <div>
              <div className="overline">Evidencias del ámbito</div>
              <div className="flex gap-2 mt-2 text-[12px] text-stone-700">
                <span className="flex items-center gap-1"><i className="ti ti-paperclip" /> POL-023_v1.4.pdf</span>
                <span className="flex items-center gap-1"><i className="ti ti-paperclip" /> Auditoria_fichas_may26.xlsx</span>
              </div>
            </div>
            <Button variant="secondary" icon="ti-upload">Adjuntar evidencia</Button>
          </div>
        </div>

        {['CAL · Gestión de la calidad', 'ACC · Acceso, oportunidad y continuidad', 'REG · Registros clínicos'].map((title, i) => (
          <div key={i} className="card mb-6 px-6 py-4 bg-paper-50 flex items-center justify-between cursor-pointer">
            <div>
              <h3 className="font-medium text-ink-950">Ámbito {title}</h3>
              <p className="text-[12px] text-stone-600 mt-0.5">{[10, 8, 9][i]} características · {[21, 16, 18][i]} elementos · {[89, 76, 71][i]}% cumplimiento</p>
            </div>
            <i className="ti ti-chevron-down text-stone-600" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Autoevaluacion;
