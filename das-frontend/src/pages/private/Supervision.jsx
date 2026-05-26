import { useState } from 'react';
import { PageHeader, Badge, Button, Modal } from '../../components/ui/index.js';
import { useSupervisionPautas } from '../../hooks/useDomain.js';

const Supervision = () => {
  const pautasQuery = useSupervisionPautas();
  const pautas = pautasQuery.data?.data || defaultPautas;
  const [scheduleModal, setScheduleModal] = useState(false);

  const actions = (
    <>
      <Button variant="secondary" icon="ti-calendar" onClick={() => setScheduleModal(true)}>Programar pauta</Button>
      <Button variant="primary" icon="ti-plus">Nueva pauta</Button>
    </>
  );

  return (
    <>
      <PageHeader overline="Módulo 3 · Gestión de calidad" title="Pautas de supervisión" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="grid grid-cols-4 gap-px bg-paper-100 border border-paper-100 mb-10">
          <div className="bg-white p-6"><div className="overline mb-2">Pautas vigentes</div><div className="font-display text-3xl text-ink-950">18</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Aplicadas este mes</div><div className="font-display text-3xl text-status-ok">14</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Programadas hoy</div><div className="font-display text-3xl text-status-warn">3</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Cumplimiento promedio</div><div className="font-display text-3xl text-ink-950">82%</div></div>
        </section>

        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-7">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl text-ink-950">Pautas activas</h3>
              <div className="relative">
                <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input className="input-box pl-10" placeholder="Buscar pauta…" style={{ minWidth: 250 }} />
              </div>
            </div>

            <div className="card">
              {pautas.map((p, i) => (
                <div key={i} className="p-5 border-b border-paper-100 last:border-0 hover:bg-paper-50 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-1 self-stretch bg-status-${p.variant}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] font-mono text-stone-600">{p.code}</span>
                        <Badge variant={p.variant}>{p.badge}</Badge>
                      </div>
                      <div className="text-[14px] text-ink-950 font-medium">{p.name}</div>
                      <div className="text-[12px] text-stone-600 mt-1">{p.meta}</div>
                    </div>
                    <Badge variant={p.status === 'Programada' ? 'warn' : p.status === 'Aplicada' ? 'ok' : 'default'}>{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <div className="overline-accent mb-2">Aplicar pauta</div>
            <h3 className="font-display text-xl text-ink-950 mb-1">PSE-007 · Esterilización dental</h3>
            <p className="text-[13px] text-stone-600 mb-6">Programada para hoy. Complete los criterios evaluados.</p>

            <div className="card card-padded space-y-5">
              <div>
                <label className="input-label mb-3">Fecha de aplicación</label>
                <input type="date" className="input-line" defaultValue="2026-05-26" />
              </div>

              <div className="space-y-4">
                <div className="overline">Criterios evaluados</div>
                {[
                  { text: 'Equipo esterilizador con calibración vigente', state: 'cumple' },
                  { text: 'Registro de ciclos de esterilización completo', state: 'cumple' },
                  { text: 'Indicadores químicos y biológicos correctos', state: 'no_cumple', obs: 'Falta registro de indicador biológico del día 23/05' },
                  { text: 'Almacenamiento adecuado del material estéril', state: 'cumple' },
                ].map((c, i) => (
                  <div key={i} className="border border-paper-100 p-4">
                    <div className="text-[13px] text-ink-950 mb-2">{i + 1}. {c.text}</div>
                    <div className="flex gap-2">
                      <button className={`px-4 py-1.5 text-[12px] ${c.state === 'cumple' ? 'bg-status-ok/10 text-status-ok border border-status-ok/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>Cumple</button>
                      <button className={`px-4 py-1.5 text-[12px] ${c.state === 'no_cumple' ? 'bg-status-danger/10 text-status-danger border border-status-danger/30' : 'border border-paper-200 text-stone-600 bg-white'}`}>No cumple</button>
                    </div>
                    {c.obs && <textarea className="input-line mt-2 text-[12px]" rows="1" defaultValue={c.obs} />}
                  </div>
                ))}
              </div>

              <div className="bg-paper-50 border border-paper-200 p-4 flex items-center justify-between">
                <div><div className="overline">Cumplimiento</div><div className="font-display text-2xl text-status-ok mt-1">75%</div></div>
                <Badge variant="warn">3 de 4 criterios</Badge>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" full>Finalizar aplicación</Button>
                <Button variant="secondary">Guardar borrador</Button>
              </div>
            </div>
          </div>
        </section>

        {/* MODAL DE PLANIFICACIÓN (gap 3.2) */}
        <Modal open={scheduleModal} onClose={() => setScheduleModal(false)} title="Programar pauta de supervisión">
          <p className="text-[13px] text-stone-600 mb-4">El sistema enviará aviso por correo electrónico el día programado para su aplicación.</p>
          <div className="space-y-5">
            <div>
              <label className="input-label">Pauta a programar</label>
              <select className="input-line">
                <option>PSE-002 · Revisión de eventos adversos</option>
                <option>PSE-009 · Verificación IAAS</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="input-label">Fecha programada</label><input type="date" className="input-line" defaultValue="2026-05-30" /></div>
              <div><label className="input-label">Hora</label><input type="time" className="input-line" defaultValue="09:00" /></div>
            </div>
            <div>
              <label className="input-label">Responsable de aplicación</label>
              <select className="input-line"><option>D. Cáceres (titular)</option><option>M. Soto (suplente)</option></select>
            </div>
            <div>
              <label className="input-label">Frecuencia</label>
              <select className="input-line"><option>Mensual</option><option>Trimestral</option><option>Única vez</option></select>
            </div>
            <div className="bg-paper-50 border border-paper-200 p-4">
              <div className="overline mb-2">Aviso automático</div>
              <label className="flex items-center gap-2 text-[13px] text-stone-700">
                <input type="checkbox" defaultChecked className="accent-ink-950" />
                Enviar email al responsable el día programado
              </label>
              <label className="flex items-center gap-2 text-[13px] text-stone-700 mt-2">
                <input type="checkbox" defaultChecked className="accent-ink-950" />
                Recordatorio 24h antes
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="primary" full onClick={() => setScheduleModal(false)}>Programar</Button>
              <Button variant="secondary" onClick={() => setScheduleModal(false)}>Cancelar</Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const defaultPautas = [
  { code: 'PSE-007', name: 'Supervisión de protocolo de esterilización dental', meta: 'Vinculada a PRO-042 y EQP-03 · R. Vidal (titular) · A. Reyes (suplente)', variant: 'warn', badge: 'Hoy', status: 'Programada' },
  { code: 'PSE-005', name: 'Verificación de identificación de pacientes', meta: 'Vinculada a DIG-01 · C. Pérez · Aplicada el 25 may', variant: 'ok', badge: '95% cumplimiento', status: 'Aplicada' },
  { code: 'PSE-008', name: 'Aplicación del protocolo de administración de medicamentos', meta: 'Vinculada a PRO-019 · L. Muñoz · Aplicada el 20 may', variant: 'ok', badge: '88% cumplimiento', status: 'Aplicada' },
  { code: 'PSE-002', name: 'Revisión de registros de eventos adversos', meta: 'Mensual · Próxima: 30 may · D. Cáceres', variant: 'default', badge: 'Mensual', status: 'Programada' },
];

export default Supervision;
