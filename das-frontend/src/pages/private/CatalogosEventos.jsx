import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';

const TABS = ['Ámbitos', 'Tipos de eventos', 'Medidas preventivas', 'Asignaciones'];

const CatalogosEventos = () => {
  const [tab, setTab] = useState(0);

  const actions = <Button variant="primary" icon="ti-plus">Nuevo elemento</Button>;

  return (
    <>
      <PageHeader overline="Configuración · Eventos adversos" title="Catálogos del sistema" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-8">
          <div className="overline-accent mb-3">Estructura configurable</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Administre los ámbitos, tipos de eventos y medidas preventivas.
          </h2>
        </section>

        <div className="flex gap-1 border-b border-paper-200 mb-6">
          {TABS.map((t, i) => (
            <button key={i} className={`tab-btn ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>
              {t} <span className="text-stone-500 ml-1">{[4, 18, 23, 12][i]}</span>
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-5">
              <h3 className="font-display text-lg text-ink-950 mb-4">Ámbitos definidos</h3>
              <div className="card">
                {defaultAmbitos.map((a, i) => (
                  <div key={i} className={`p-4 border-b border-paper-100 last:border-0 hover:bg-paper-50 cursor-pointer ${i === 0 ? 'bg-paper-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[12px] font-mono text-stone-600">{a.code}</span>
                        </div>
                        <div className="text-[14px] text-ink-950 font-medium">{a.name}</div>
                        <div className="text-[12px] text-stone-600 mt-1">{a.summary}</div>
                      </div>
                      <i className="ti ti-arrow-right text-stone-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-7">
              <h3 className="font-display text-lg text-ink-950 mb-4">Ámbito Clínico · Detalle</h3>
              <div className="card card-padded mb-6">
                <div className="overline mb-3">Configuración</div>
                <div className="grid grid-cols-2 gap-6">
                  <div><div className="input-label">Código</div><div className="text-[14px] text-ink-950 font-mono">AMB-01</div></div>
                  <div><div className="input-label">Estado</div><Badge variant="ok">Activo</Badge></div>
                  <div className="col-span-2"><div className="input-label">Descripción</div><div className="text-[13px] text-stone-700">Eventos ocurridos durante la atención clínica directa al paciente.</div></div>
                </div>
              </div>

              <div className="overline mb-3">Tipos de eventos en este ámbito</div>
              <div className="card mb-6">
                {defaultTipos.map((t, i) => (
                  <div key={i} className="p-4 border-b border-paper-100 last:border-0 flex items-center justify-between">
                    <div>
                      <div className="text-[13px] text-ink-950 font-medium">{t.name}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{t.code} · {t.notification} · Gravedad: {t.gravity}</div>
                    </div>
                    <i className="ti ti-edit text-stone-600 cursor-pointer hover:text-ink-950" />
                  </div>
                ))}
              </div>

              <div className="overline mb-3">Medidas preventivas vinculadas</div>
              <div className="card card-padded">
                <div className="grid grid-cols-2 gap-3">
                  {defaultMedidas.map((m, i) => (
                    <span key={i} className="text-[12px] text-stone-700 flex items-center gap-1">
                      <i className="ti ti-shield-check text-sm" /> {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div className="card">
            <div className="table-header" style={{ gridTemplateColumns: '100px 1fr 140px 140px 80px' }}>
              <span>Código</span><span>Nombre</span><span>Ámbito</span><span>Gravedad</span><span /></div>
            {[...defaultTipos, ...moreTipos].map((t, i) => (
              <div key={i} className="table-row" style={{ gridTemplateColumns: '100px 1fr 140px 140px 80px' }}>
                <span className="text-[12px] text-stone-600 font-mono">{t.code}</span>
                <span className="text-[13px] text-ink-950">{t.name}</span>
                <span className="text-[12px] text-stone-700">{t.ambito || 'Clínico'}</span>
                <span className="text-[12px] text-stone-700">{t.gravity}</span>
                <i className="ti ti-edit text-stone-600 cursor-pointer" />
              </div>
            ))}
          </div>
        )}

        {tab === 2 && (
          <div className="card">
            <div className="table-header" style={{ gridTemplateColumns: '100px 1fr 200px 80px' }}>
              <span>Código</span><span>Medida preventiva</span><span>Aplica a</span><span /></div>
            {[
              { code: 'MP-007', name: 'Aplicación de escala de Morse al ingreso', applies: 'Caídas' },
              { code: 'MP-012', name: 'Mantención de barandas en posición segura', applies: 'Caídas' },
              { code: 'MP-015', name: 'Identificación visual de paciente de alto riesgo', applies: 'Todos' },
              { code: 'MP-018', name: 'Doble verificación medicación', applies: 'Errores medicación' },
              { code: 'MP-022', name: 'Higiene de manos según protocolo OMS', applies: 'IAAS' },
            ].map((m, i) => (
              <div key={i} className="table-row" style={{ gridTemplateColumns: '100px 1fr 200px 80px' }}>
                <span className="text-[12px] text-stone-600 font-mono">{m.code}</span>
                <span className="text-[13px] text-ink-950">{m.name}</span>
                <span className="text-[12px] text-stone-700">{m.applies}</span>
                <i className="ti ti-edit text-stone-600 cursor-pointer" />
              </div>
            ))}
          </div>
        )}

        {tab === 3 && (
          <div>
            <div className="overline-accent mb-2">Asignación de usuarios</div>
            <h3 className="font-display text-xl text-ink-950 mb-1">Notificación por servicio (gap 4.1)</h3>
            <p className="text-[13px] text-stone-600 mb-6">Configure qué usuarios deben ser notificados cuando ocurre un evento en cada servicio.</p>

            <div className="card">
              <div className="table-header" style={{ gridTemplateColumns: '1fr 1fr 100px' }}>
                <span>Servicio / Unidad</span><span>Usuarios a notificar</span><span /></div>
              {[
                { service: 'CEMSCO Lorenzo Arenas · Box atención', users: 'D. Cáceres, M. Soto, Dr. P. Henríquez' },
                { service: 'CEMSCO Lorenzo Arenas · Vacunatorio', users: 'A. Reyes, D. Cáceres' },
                { service: 'CESFAM Tucapel · Farmacia', users: 'L. Muñoz, D. Cáceres' },
                { service: 'Servicio Dental · Box 3', users: 'R. Vidal, D. Cáceres' },
              ].map((row, i) => (
                <div key={i} className="table-row" style={{ gridTemplateColumns: '1fr 1fr 100px' }}>
                  <span className="text-[13px] text-ink-950 font-medium">{row.service}</span>
                  <span className="text-[12px] text-stone-700">{row.users}</span>
                  <Button variant="ghost" icon="ti-edit">Editar</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const defaultAmbitos = [
  { code: 'AMB-01', name: 'Clínico', summary: '8 tipos de eventos asociados · 12 medidas preventivas' },
  { code: 'AMB-02', name: 'Administrativo', summary: '4 tipos de eventos · 5 medidas' },
  { code: 'AMB-03', name: 'Infraestructura', summary: '3 tipos de eventos · 3 medidas' },
  { code: 'AMB-04', name: 'Equipamiento', summary: '3 tipos de eventos · 3 medidas' },
];

const defaultTipos = [
  { code: 'TE-001', name: 'Caída de paciente', notification: 'Notificación obligatoria', gravity: 'variable' },
  { code: 'TE-002', name: 'Error de medicación', notification: 'Notificación obligatoria', gravity: 'moderado–grave' },
  { code: 'TE-003', name: 'Reacción adversa a medicamento', notification: 'Notificación obligatoria', gravity: 'leve–centinela' },
  { code: 'TE-004', name: 'Identificación incorrecta de muestra', notification: 'Notificación obligatoria', gravity: 'grave' },
  { code: 'TE-005', name: 'Infección asociada a la atención', notification: 'Notificación obligatoria', gravity: 'grave–centinela' },
];
const moreTipos = [
  { code: 'TE-006', name: 'Demora en atención', gravity: 'leve', ambito: 'Administrativo' },
  { code: 'TE-007', name: 'Pérdida de documentación clínica', gravity: 'moderado', ambito: 'Administrativo' },
  { code: 'TE-008', name: 'Fallo de equipamiento crítico', gravity: 'grave', ambito: 'Equipamiento' },
];

const defaultMedidas = ['MP-007 · Escala de Morse al ingreso', 'MP-012 · Barandas en posición segura', 'MP-015 · Identificación visual', 'MP-018 · Doble verificación medicación'];

export default CatalogosEventos;
