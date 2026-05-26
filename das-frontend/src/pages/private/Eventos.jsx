import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PageHeader, Badge, Button, useToast } from '../../components/ui/index.js';
import { useEvents, useEventStats, useNotifyEvent } from '../../hooks/useEvents.js';

const Eventos = () => {
  const list = useEvents();
  const stats = useEventStats();
  const notify = useNotifyEvent();
  const toast = useToast();
  const [form, setForm] = useState({ date: '2026-05-26T10:15', ambito: 'Clínico', tipo: 'Caída de paciente', service: 'CEMSCO Lorenzo Arenas', description: 'Paciente femenina, 78 años, se desliza desde camilla mientras esperaba evaluación. Sin pérdida de conciencia.', anonymous: false });

  const events = list.data?.data || defaultEvents;
  const statsData = stats.data?.data || defaultStats;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await notify.mutateAsync(form);
      toast.success('Evento notificado correctamente');
    } catch (err) {
      toast.error('No se pudo notificar el evento');
    }
  };

  const actions = (
    <>
      <Link to="/catalogos-eventos" className="btn btn-secondary"><i className="ti ti-settings" /> Configurar catálogos</Link>
      <Link to="/formularios-eventos" className="btn btn-secondary"><i className="ti ti-forms" /> Formularios</Link>
      <Button variant="primary" icon="ti-alert-triangle">Notificar nuevo evento</Button>
    </>
  );

  return (
    <>
      <PageHeader overline="Módulo 4 · Seguimiento" title="Eventos adversos" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="grid grid-cols-4 gap-px bg-paper-100 border border-paper-100 mb-10">
          <div className="bg-white p-6"><div className="overline mb-2">Notificados este mes</div><div className="font-display text-3xl text-ink-950">{statsData.thisMonth}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Pendientes de verificar</div><div className="font-display text-3xl text-status-warn">{statsData.pending}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">En gestión</div><div className="font-display text-3xl text-ink-950">{statsData.inGestion}</div></div>
          <div className="bg-white p-6"><div className="overline mb-2">Graves abiertos</div><div className="font-display text-3xl text-status-danger">{statsData.graves}</div></div>
        </section>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-5">
            <div className="overline-accent mb-2">Acción rápida</div>
            <h3 className="font-display text-xl text-ink-950 mb-1">Notificar evento adverso</h3>
            <p className="text-[13px] text-stone-600 mb-6">Complete el formulario. Se notificará automáticamente al responsable.</p>
            <form onSubmit={handleSubmit} className="card card-padded space-y-5">
              <div>
                <label className="input-label">Fecha y hora del evento</label>
                <input type="datetime-local" className="input-line" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Ámbito</label>
                  <select className="input-line" value={form.ambito} onChange={(e) => setForm({ ...form, ambito: e.target.value })}>
                    <option>Clínico</option><option>Administrativo</option><option>Infraestructura</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Tipo de evento</label>
                  <select className="input-line" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                    <option>Caída de paciente</option><option>Error medicación</option><option>Reacción adversa</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">Servicio</label>
                <select className="input-line" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                  <option>CEMSCO Lorenzo Arenas · Box atención</option>
                  <option>CESFAM Tucapel · Sala de espera</option>
                </select>
              </div>
              <div>
                <label className="input-label">Descripción</label>
                <textarea className="input-line" rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="input-label">Evidencias</label>
                <button type="button" className="w-full border border-dashed border-paper-200 px-4 py-6 text-[12px] text-stone-600 hover:border-ink-800 flex items-center justify-center gap-2 bg-white">
                  <i className="ti ti-upload" /> Adjuntar archivos
                </button>
              </div>
              <label className="flex items-center gap-2 text-[13px] text-stone-700">
                <input type="checkbox" className="w-3.5 h-3.5 accent-ink-950" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} />
                Notificar de forma anónima
              </label>
              <div className="flex gap-3 pt-2">
                <Button type="submit" variant="primary" full disabled={notify.isPending}>
                  {notify.isPending ? 'Enviando…' : 'Enviar notificación'}
                </Button>
                <Button type="button" variant="secondary">Cancelar</Button>
              </div>
            </form>
          </div>

          <div className="col-span-7">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl text-ink-950">Eventos recientes</h3>
              <a className="btn-link">Ver todos →</a>
            </div>
            <p className="text-[13px] text-stone-600 mb-6">Listado de los últimos eventos notificados.</p>

            <div className="card">
              {events.map((ev) => (
                <Link key={ev.code} to={ev.hasPlan ? `/plan-mejora/${ev.code}` : `/eventos/${ev.code}`} className="border-b border-paper-100 last:border-0 p-5 hover:bg-paper-50 cursor-pointer block">
                  <article className="flex items-start gap-4">
                    <div className={`w-1 self-stretch bg-status-${ev.gravityVariant}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={ev.gravityVariant}>{ev.gravity}</Badge>
                        <span className="text-[11px] text-stone-500 font-mono">{ev.code}</span>
                        <span className="text-[11px] text-stone-500">· {ev.time}</span>
                      </div>
                      <div className="text-[14px] text-ink-950 font-medium">{ev.title}</div>
                      <div className="text-[12px] text-stone-600 mt-1">{ev.location}</div>
                    </div>
                    <Badge variant={ev.statusVariant} className="self-start">{ev.status}</Badge>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const defaultStats = { thisMonth: 24, pending: 5, inGestion: 12, graves: 2 };
const defaultEvents = [
  { code: 'EA-2026-0042', gravity: 'Grave', gravityVariant: 'danger', time: 'hace 2h', title: 'Caída de paciente en sala de espera', location: 'CEMSCO Lorenzo Arenas · C. Pérez', status: 'Sin verificar', statusVariant: 'warn' },
  { code: 'EA-2026-0041', gravity: 'Moderado', gravityVariant: 'warn', time: 'hace 6h', title: 'Error de medicación – dosis incorrecta', location: 'CESFAM Tucapel · Farmacia · L. Muñoz', status: 'En gestión', statusVariant: 'ink' },
  { code: 'EA-2026-0040', gravity: 'Moderado', gravityVariant: 'warn', time: 'hace 1 día', title: 'Reacción adversa a vacuna pediátrica', location: 'CESFAM Lorenzo Arenas · A. Reyes', status: 'En gestión', statusVariant: 'ink' },
  { code: 'EA-2026-0039', gravity: 'Leve', gravityVariant: 'default', time: 'hace 2 días', title: 'Demora en atención odontológica', location: 'Servicio Dental · R. Vidal', status: 'Cerrado', statusVariant: 'ok' },
  { code: 'EA-2026-0038', gravity: 'Grave', gravityVariant: 'danger', time: 'hace 3 días', title: 'Identificación incorrecta de muestra de laboratorio', location: 'CEMSCO Lorenzo Arenas · D. Cáceres', status: 'Plan de mejora', statusVariant: 'ink', hasPlan: true },
];

export default Eventos;
