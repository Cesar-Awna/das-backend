import { useState } from 'react';
import { PageHeader, Badge, Button, useToast } from '../../components/ui/index.js';

const TABS = ['Notificaciones por email', 'Alarmas automáticas', 'Periodos de evaluación', 'Plantillas de email', 'Integraciones'];

const Configuracion = () => {
  const [tab, setTab] = useState(0);
  const toast = useToast();

  // Estado de toggles (cierra gap 1.2 y 3.1 - alarmas email)
  const [alerts, setAlerts] = useState({
    indicatorOverdue: true,
    indicatorAdvance: true,
    docExpiring: true,
    docExpired: true,
    pautaScheduled: true,
    pautaReminder: true,
    eventNotification: true,
    eventGrave: true,
    planActivityDue: true,
    weeklyDigest: false,
  });

  const handleSave = () => toast.success('Configuración guardada correctamente');
  const toggle = (key) => setAlerts({ ...alerts, [key]: !alerts[key] });

  const ToggleRow = ({ k, title, description, badge }) => (
    <div className="flex items-start justify-between py-4 border-b border-paper-100 last:border-0">
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-[14px] text-ink-950 font-medium">{title}</div>
          {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
        </div>
        <p className="text-[12px] text-stone-600">{description}</p>
      </div>
      <button onClick={() => toggle(k)} className={`relative w-11 h-6 transition-colors ${alerts[k] ? 'bg-status-ok' : 'bg-paper-200'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white transition-transform ${alerts[k] ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );

  return (
    <>
      <PageHeader overline="Administración" title="Configuración del sistema" actions={<Button variant="primary" icon="ti-device-floppy" onClick={handleSave}>Guardar cambios</Button>} />
      <div className="p-10 max-w-7xl">
        <section className="mb-8">
          <div className="overline-accent mb-3">Parámetros del sistema</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Configure las alarmas automáticas, notificaciones por email y periodos de evaluación.
          </h2>
        </section>

        <div className="flex gap-1 border-b border-paper-200 mb-8">
          {TABS.map((t, i) => (
            <button key={i} className={`tab-btn ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {tab === 0 && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <div className="card card-padded mb-6">
                <h3 className="font-display text-lg text-ink-950 mb-1">Indicadores</h3>
                <p className="text-[13px] text-stone-600 mb-4">Alarmas por correo electrónico relacionadas con indicadores de acreditación.</p>
                <ToggleRow
                  k="indicatorOverdue"
                  title="Alarma de retraso en ingreso de mediciones"
                  description="Envía email al responsable cuando una medición no se ha cargado tras el vencimiento del periodo."
                  badge={{ label: 'Ítem 1.2', variant: 'accent' }}
                />
                <ToggleRow
                  k="indicatorAdvance"
                  title="Aviso anticipado de vencimiento"
                  description="Recordatorio 5 días antes del vencimiento del periodo de medición."
                />
              </div>

              <div className="card card-padded mb-6">
                <h3 className="font-display text-lg text-ink-950 mb-1">Documental</h3>
                <p className="text-[13px] text-stone-600 mb-4">Alarmas sobre el ciclo de vida de documentos.</p>
                <ToggleRow
                  k="docExpiring"
                  title="Documento próximo a vencer"
                  description="Email al responsable 30 días antes del vencimiento."
                  badge={{ label: 'Ítem 3.1', variant: 'accent' }}
                />
                <ToggleRow
                  k="docExpired"
                  title="Documento vencido"
                  description="Email diario al responsable hasta que se renueve o archive."
                />
              </div>

              <div className="card card-padded mb-6">
                <h3 className="font-display text-lg text-ink-950 mb-1">Pautas de supervisión</h3>
                <p className="text-[13px] text-stone-600 mb-4">Avisos de planificación y aplicación.</p>
                <ToggleRow
                  k="pautaScheduled"
                  title="Aviso del día programado para aplicación"
                  description="Email al responsable el mismo día que la pauta debe aplicarse."
                  badge={{ label: 'Ítem 3.2', variant: 'accent' }}
                />
                <ToggleRow
                  k="pautaReminder"
                  title="Recordatorio 24h antes"
                  description="Envía recordatorio al titular y suplente con 1 día de anticipación."
                />
              </div>

              <div className="card card-padded mb-6">
                <h3 className="font-display text-lg text-ink-950 mb-1">Eventos adversos</h3>
                <p className="text-[13px] text-stone-600 mb-4">Notificación de eventos y planes de mejora.</p>
                <ToggleRow
                  k="eventNotification"
                  title="Notificación al responsable de gestión"
                  description="Email automático al gestor asignado cuando se notifica un nuevo evento."
                  badge={{ label: 'Ítem 4.1', variant: 'accent' }}
                />
                <ToggleRow
                  k="eventGrave"
                  title="Evento grave o centinela"
                  description="Email inmediato a la jefatura del servicio y a la autoridad del establecimiento."
                />
                <ToggleRow
                  k="planActivityDue"
                  title="Actividad de plan de mejora pendiente"
                  description="Email al responsable cuando una actividad está vencida o por vencer."
                />
              </div>

              <div className="card card-padded">
                <h3 className="font-display text-lg text-ink-950 mb-1">Resúmenes periódicos</h3>
                <p className="text-[13px] text-stone-600 mb-4">Reportes consolidados enviados por correo.</p>
                <ToggleRow
                  k="weeklyDigest"
                  title="Resumen semanal del sistema"
                  description="Cada lunes a las 08:00, envía panorama general de la semana anterior."
                />
              </div>
            </div>

            <div className="col-span-4">
              <div className="card card-padded sticky top-24">
                <div className="overline mb-3">Estado del envío</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-stone-600">Activas</span>
                    <span className="font-display text-xl text-status-ok">{Object.values(alerts).filter(Boolean).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-stone-600">Inactivas</span>
                    <span className="font-display text-xl text-stone-700">{Object.values(alerts).filter(v => !v).length}</span>
                  </div>
                </div>
                <hr className="my-4 border-paper-100" />
                <div className="overline mb-3">Servidor SMTP</div>
                <div className="text-[12px] text-stone-600 space-y-1">
                  <div className="flex justify-between"><span>Host</span><span className="text-ink-950">smtp.dasconcepcion.cl</span></div>
                  <div className="flex justify-between"><span>Puerto</span><span className="text-ink-950">587</span></div>
                  <div className="flex justify-between"><span>Estado</span><Badge variant="ok">Operativo</Badge></div>
                </div>
                <Button variant="secondary" full className="mt-4" icon="ti-mail">Probar envío</Button>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="card card-padded">
            <h3 className="font-display text-lg text-ink-950 mb-2">Alarmas automáticas del sistema</h3>
            <p className="text-[13px] text-stone-600 mb-6">Configure los umbrales y plazos de las alarmas automáticas.</p>
            <div className="space-y-4">
              {[
                { label: 'Días de anticipación · Vencimiento documental', value: '30' },
                { label: 'Días de anticipación · Pauta planificada', value: '1' },
                { label: 'Días después del vencimiento · Indicador no cargado', value: '3' },
                { label: 'Horas para verificar evento adverso grave', value: '24' },
                { label: 'Días para crear plan de mejora tras verificación', value: '7' },
              ].map((c, i) => (
                <div key={i} className="grid grid-cols-2 gap-6 items-center pb-3 border-b border-paper-100">
                  <label className="text-[13px] text-ink-950">{c.label}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" className="input-box max-w-[120px]" defaultValue={c.value} />
                    <span className="text-[12px] text-stone-600">días</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 2 && (
          <div className="card card-padded">
            <h3 className="font-display text-lg text-ink-950 mb-2">Periodos de evaluación</h3>
            <p className="text-[13px] text-stone-600 mb-6">Configure los periodos trimestrales y anuales utilizados en el sistema.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { code: 'Q1 2026', range: '01 ene → 31 mar', state: 'Cerrado' },
                { code: 'Q2 2026', range: '01 abr → 30 jun', state: 'Activo' },
                { code: 'Q3 2026', range: '01 jul → 30 sep', state: 'Próximo' },
                { code: 'Q4 2026', range: '01 oct → 31 dic', state: 'Próximo' },
              ].map((p, i) => (
                <div key={i} className="border border-paper-100 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] text-ink-950 font-medium">{p.code}</div>
                    <div className="text-[12px] text-stone-600">{p.range}</div>
                  </div>
                  <Badge variant={p.state === 'Activo' ? 'ok' : p.state === 'Cerrado' ? 'default' : 'warn'}>{p.state}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 3 && (
          <div className="card card-padded">
            <h3 className="font-display text-lg text-ink-950 mb-2">Plantillas de correo</h3>
            <p className="text-[13px] text-stone-600 mb-6">Personalice el contenido de los correos automáticos.</p>
            <div className="space-y-2">
              {[
                'Alarma de indicador con retraso',
                'Alarma de documento por vencer',
                'Aviso de pauta programada',
                'Notificación de evento adverso',
                'Resumen final de evento adverso',
                'Recordatorio de actividad pendiente',
              ].map((t, i) => (
                <div key={i} className="border border-paper-100 px-4 py-3 flex items-center justify-between hover:bg-paper-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <i className="ti ti-mail text-stone-500" />
                    <span className="text-[13px] text-ink-950">{t}</span>
                  </div>
                  <i className="ti ti-edit text-stone-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 4 && (
          <div className="card card-padded">
            <h3 className="font-display text-lg text-ink-950 mb-2">Integraciones externas</h3>
            <p className="text-[13px] text-stone-600 mb-6">Conexión con sistemas de terceros.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Superintendencia de Salud', desc: 'Reporte automático trimestral', status: 'connected' },
                { name: 'Servicio de Salud', desc: 'Sincronización de indicadores', status: 'connected' },
                { name: 'Active Directory', desc: 'Autenticación corporativa SSO', status: 'disconnected' },
                { name: 'API RAYEN', desc: 'Integración registro clínico', status: 'disconnected' },
              ].map((s, i) => (
                <div key={i} className="border border-paper-100 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[14px] text-ink-950 font-medium">{s.name}</div>
                    <Badge variant={s.status === 'connected' ? 'ok' : 'default'}>{s.status === 'connected' ? 'Conectado' : 'Pendiente'}</Badge>
                  </div>
                  <div className="text-[12px] text-stone-600">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Configuracion;
