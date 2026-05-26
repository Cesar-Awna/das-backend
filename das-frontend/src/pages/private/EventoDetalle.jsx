import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useEvent } from '../../hooks/useEvents.js';

const TABS = ['Verificación ✓', 'Análisis y gestión', 'Plan de mejora', 'Seguimiento', 'Estadísticas'];

const EventoDetalle = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(1);
  const ev = useEvent(id);
  const data = ev.data?.data || defaultEvent;

  const breadcrumb = (
    <>
      <Link to="/eventos" className="hover:text-ink-950">Eventos adversos</Link>
      <i className="ti ti-chevron-right text-[10px]" /> <span>{id}</span>
    </>
  );

  const actions = (
    <>
      <Button variant="secondary" icon="ti-mail">Enviar resumen</Button>
      <Link to={`/plan-mejora/${id}`} className="btn btn-primary"><i className="ti ti-clipboard-list" /> Crear plan de mejora</Link>
    </>
  );

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} title={data.title} actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10 grid grid-cols-12 gap-10">
          <div className="col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="danger">{data.gravity}</Badge>
              <span className="text-[12px] font-mono text-stone-600">{id}</span>
              <Badge variant="ink">{data.status}</Badge>
            </div>
            <h2 className="font-display text-3xl text-ink-950 leading-tight mb-4">
              El caso ha sido verificado y está en fase de análisis de causas.
            </h2>
            <p className="text-[15px] text-stone-600 leading-relaxed">{data.description}</p>
          </div>
          <div className="col-span-4 card card-padded">
            <div className="overline mb-3">Información del caso</div>
            <div className="space-y-3 text-[13px]">
              {[
                ['Fecha evento', data.date],
                ['Ámbito', data.ambito],
                ['Tipo', data.type],
                ['Servicio', data.service],
                ['Notificador', data.notifier],
                ['Gestor asignado', data.manager],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between"><span className="text-stone-600">{k}</span><span className="text-ink-950">{v}</span></div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex gap-1 border-b border-paper-200 mb-8">
          {TABS.map((t, i) => (
            <button key={i} className={`tab-btn ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-8 space-y-6">
            <div className="card card-padded">
              <h3 className="font-display text-lg text-ink-950 mb-1">Causas detonantes</h3>
              <p className="text-[13px] text-stone-600 mb-4">Análisis causa-raíz del evento</p>
              <div className="space-y-3">
                {defaultCauses.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 border border-paper-100">
                    <i className={`ti ti-point-filled text-status-${c.variant} mt-0.5`} />
                    <div className="flex-1">
                      <div className="text-[13px] text-ink-950">{c.text}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{c.factor}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="secondary" icon="ti-plus" className="mt-4">Agregar causa</Button>
            </div>

            <div className="card card-padded">
              <h3 className="font-display text-lg text-ink-950 mb-1">Medidas preventivas aplicables</h3>
              <p className="text-[13px] text-stone-600 mb-4">Revisar si las medidas existentes cubren este caso</p>
              <div className="space-y-3">
                {defaultMeasures.map((m, i) => (
                  <label key={i} className="flex items-start gap-3 p-3 border border-paper-100 cursor-pointer">
                    <input type="checkbox" defaultChecked={m.applied} className="mt-1 accent-ink-950" />
                    <div className="flex-1">
                      <div className="text-[13px] text-ink-950">{m.text}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{m.meta}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="card card-padded">
              <h3 className="font-display text-lg text-ink-950 mb-1">Otros pacientes en igual situación</h3>
              <p className="text-[13px] text-stone-600 mb-4">¿Existen otros casos similares que requieran intervención?</p>
              <textarea className="input-line" rows="3" defaultValue="Se identifican 4 pacientes mayores de 75 años en sala de espera al momento del evento. Todos fueron evaluados y reubicados a butacas con apoyabrazos." />
            </div>

            <div className="card card-padded">
              <h3 className="font-display text-lg text-ink-950 mb-1">Resumen final del caso</h3>
              <p className="text-[13px] text-stone-600 mb-4">Se enviará por email a las jefaturas correspondientes</p>
              <textarea className="input-line" rows="4" defaultValue="El evento se origina por falla en la aplicación de medidas preventivas vigentes. Se requiere reforzar capacitación en triage de riesgo de caídas y mejorar señalización de pacientes vulnerables." />
              <div className="mt-4 p-4 bg-paper-50 border border-paper-200">
                <div className="overline mb-2">Destinatarios del resumen</div>
                <div className="space-y-2">
                  {['Dr. Pablo Henríquez · Jefe CEMSCO L. Arenas', 'M. Soto · Suplente jefatura', 'Dra. Ana Vargas · Directora DAS (Autoridad)'].map((d, i) => (
                    <label key={i} className="flex items-center gap-2 text-[13px]">
                      <input type="checkbox" defaultChecked className="accent-ink-950" /> {d}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="primary" icon="ti-mail">Enviar resumen por email</Button>
                <Button variant="secondary" icon="ti-device-floppy">Guardar sin enviar</Button>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <h3 className="font-display text-lg text-ink-950 mb-4">Línea de tiempo</h3>
            <div className="card card-padded">
              <div className="space-y-5 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-paper-200" />
                {defaultTimeline.map((t, i) => (
                  <div key={i} className={`flex gap-4 relative ${t.pending ? 'opacity-50' : ''}`}>
                    <div className={`w-4 h-4 ${t.current ? 'bg-accent ring-4 ring-accent/20' : t.pending ? 'bg-paper-200' : 'bg-status-ok'} rounded-full flex-shrink-0 z-10 mt-1`} />
                    <div>
                      <div className="text-[12px] text-stone-500">{t.time}</div>
                      <div className="text-[13px] text-ink-950 font-medium">{t.event}</div>
                      {t.detail && <div className={`text-[11px] ${t.current ? 'text-accent-dark' : 'text-stone-600'} mt-0.5`}>{t.detail}</div>}
                    </div>
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

const defaultEvent = { title: 'Caída de paciente en sala de espera', gravity: 'Grave', status: 'En gestión', date: '26 may 2026 · 10:15', ambito: 'Clínico', type: 'Caída de paciente', service: 'CEMSCO L. Arenas', notifier: 'C. Pérez', manager: 'D. Cáceres', description: 'Paciente femenina, 78 años, se desliza desde camilla mientras esperaba evaluación. Sin pérdida de conciencia. Refiere dolor leve en cadera derecha. Trasladada a urgencias para descartar fractura.' };

const defaultCauses = [
  { text: 'Camilla sin barandas laterales en posición elevada', factor: 'Factor estructural', variant: 'danger' },
  { text: 'Paciente sin acompañante durante la espera', factor: 'Factor organizacional', variant: 'danger' },
  { text: 'No se aplicó escala de riesgo de caídas al ingreso', factor: 'Factor humano', variant: 'warn' },
];

const defaultMeasures = [
  { text: 'Aplicación de escala de Morse al ingreso', meta: 'Medida MP-007 · No se cumplió', applied: true },
  { text: 'Mantención de barandas en posición segura', meta: 'Medida MP-012 · No se cumplió', applied: true },
  { text: 'Identificación visual de paciente de alto riesgo', meta: 'Medida MP-015', applied: false },
];

const defaultTimeline = [
  { time: '26 may · 10:15', event: 'Evento notificado', detail: 'Por C. Pérez' },
  { time: '26 may · 10:17', event: 'Email automático enviado', detail: 'A D. Cáceres (gestor)' },
  { time: '26 may · 11:30', event: 'Verificado y clasificado', detail: 'Confirmado · Gravedad: Grave' },
  { time: '26 may · 11:32', event: 'Notificación a jefatura', detail: 'Dr. P. Henríquez' },
  { time: '26 may · 11:35', event: 'Informe a autoridad', detail: 'Dra. A. Vargas (Directora)' },
  { time: 'Ahora', event: 'Análisis y gestión', detail: 'En curso', current: true },
  { time: 'Pendiente', event: 'Plan de mejora', pending: true },
  { time: 'Pendiente', event: 'Cierre del caso', pending: true },
];

export default EventoDetalle;
