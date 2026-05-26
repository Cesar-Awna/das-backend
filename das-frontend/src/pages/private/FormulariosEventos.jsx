import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';

const FormulariosEventos = () => {
  const [selected, setSelected] = useState(0);

  const actions = <Button variant="primary" icon="ti-plus">Nuevo formulario</Button>;

  return (
    <>
      <PageHeader overline="Configuración · Eventos adversos" title="Formularios de notificación" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-8">
          <div className="overline-accent mb-3">Definición de formularios</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Configure los formularios disponibles para notificar eventos adversos.
          </h2>
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <h3 className="font-display text-lg text-ink-950 mb-4">Formularios definidos</h3>
            <div className="card">
              {defaultForms.map((f, i) => (
                <div key={i} className={`p-4 border-b border-paper-100 last:border-0 cursor-pointer hover:bg-paper-50 ${selected === i ? 'bg-paper-50' : ''}`} onClick={() => setSelected(i)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-mono text-stone-600">{f.code}</span>
                    {f.active && <Badge variant="ok">Activo</Badge>}
                  </div>
                  <div className="text-[14px] text-ink-950 font-medium">{f.name}</div>
                  <div className="text-[12px] text-stone-600 mt-1">{f.fields} campos · {f.uses} usos</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-8">
            <h3 className="font-display text-lg text-ink-950 mb-4">{defaultForms[selected].name}</h3>

            <div className="card card-padded mb-6">
              <div className="overline mb-3">Configuración del formulario</div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="input-label">Código</label><input className="input-line font-mono" defaultValue={defaultForms[selected].code} /></div>
                <div><label className="input-label">Estado</label><select className="input-line"><option>Activo</option><option>Inactivo</option></select></div>
                <div className="col-span-2"><label className="input-label">Tipos de evento aplicables</label><div className="text-[13px] text-stone-700 mt-1">{defaultForms[selected].appliesTo.join(' · ')}</div></div>
              </div>
            </div>

            <div className="overline mb-3">Campos del formulario</div>
            <div className="card">
              <div className="table-header" style={{ gridTemplateColumns: '40px 1fr 140px 100px 80px' }}>
                <span>#</span><span>Campo</span><span>Tipo</span><span>Obligatorio</span><span /></div>
              {defaultFields.map((f, i) => (
                <div key={i} className="table-row" style={{ gridTemplateColumns: '40px 1fr 140px 100px 80px' }}>
                  <span className="text-[12px] text-stone-600 font-mono">{i + 1}</span>
                  <div>
                    <div className="text-[13px] text-ink-950">{f.label}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{f.key}</div>
                  </div>
                  <span className="text-[12px] text-stone-700">{f.type}</span>
                  <Badge variant={f.required ? 'danger' : 'default'}>{f.required ? 'Sí' : 'No'}</Badge>
                  <i className="ti ti-edit text-stone-600 cursor-pointer" />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="primary" icon="ti-plus">Agregar campo</Button>
              <Button variant="secondary" icon="ti-eye">Vista previa</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const defaultForms = [
  { code: 'FORM-001', name: 'Notificación rápida', fields: 8, uses: 142, active: true, appliesTo: ['Caída', 'Error medicación', 'Reacción adversa', 'Identificación'] },
  { code: 'FORM-002', name: 'Notificación detallada (grave/centinela)', fields: 15, uses: 23, active: true, appliesTo: ['Grave', 'Centinela'] },
  { code: 'FORM-003', name: 'Notificación anónima', fields: 5, uses: 8, active: true, appliesTo: ['Todos'] },
];

const defaultFields = [
  { label: 'Fecha y hora del evento', key: 'event_date', type: 'datetime', required: true },
  { label: 'Ámbito', key: 'ambito', type: 'select', required: true },
  { label: 'Tipo de evento', key: 'tipo', type: 'select', required: true },
  { label: 'Servicio', key: 'service', type: 'select', required: true },
  { label: 'Descripción', key: 'description', type: 'textarea', required: true },
  { label: 'Evidencias', key: 'attachments', type: 'file', required: false },
  { label: 'Notificar anónimo', key: 'anonymous', type: 'checkbox', required: false },
  { label: 'Edad del paciente', key: 'patient_age', type: 'number', required: false },
];

export default FormulariosEventos;
