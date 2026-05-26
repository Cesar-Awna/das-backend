import { useState } from 'react';
import { PageHeader, Badge, Button } from '../../components/ui/index.js';
import { useOrgTree, useOrganization } from '../../hooks/useDomain.js';

const Organizacion = () => {
  const tree = useOrgTree();
  const org = useOrganization('cemsco-lorenzo-arenas');
  const treeData = tree.data?.data || defaultTree;
  const detail = org.data?.data || defaultDetail;
  const [expanded, setExpanded] = useState(['das', 'cemsco', 'cesfam']);
  const [selected, setSelected] = useState('cemsco-lorenzo-arenas');

  const toggle = (id) => setExpanded(expanded.includes(id) ? expanded.filter(x => x !== id) : [...expanded, id]);

  const actions = (
    <>
      <Button variant="secondary" icon="ti-affiliate">Diagrama organizacional</Button>
      <Button variant="primary" icon="ti-plus">Nueva unidad</Button>
    </>
  );

  return (
    <>
      <PageHeader overline="Administración" title="Estructura organizacional" actions={actions} />
      <div className="p-10 max-w-7xl">
        <section className="mb-10">
          <div className="overline-accent mb-3">Jerarquía institucional</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Dirección de Salud DAS Concepción · {treeData.totalUnits} unidades · {treeData.totalUsers} usuarios asignados
          </h2>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Árbol organizacional */}
          <div className="col-span-5">
            <h3 className="font-display text-lg text-ink-950 mb-4">Árbol de unidades</h3>
            <div className="card card-padded">
              <TreeNode node={treeData.root} expanded={expanded} selected={selected} onToggle={toggle} onSelect={setSelected} level={0} />
            </div>
          </div>

          {/* Detalle de unidad seleccionada */}
          <div className="col-span-7">
            <h3 className="font-display text-lg text-ink-950 mb-4">{detail.name}</h3>

            <div className="card card-padded mb-6">
              <div className="overline mb-3">Información de la unidad</div>
              <div className="grid grid-cols-2 gap-4 text-[13px]">
                {[
                  ['Código', detail.code],
                  ['Tipo', detail.type],
                  ['Director', detail.director],
                  ['Dirección', detail.address],
                  ['Teléfono', detail.phone],
                  ['Email', detail.email],
                  ['Población asignada', detail.population],
                  ['Estado', detail.status],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-stone-600 text-[11px] uppercase tracking-wider">{k}</div>
                    <div className="text-ink-950 mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-6">
              <div className="px-6 py-4 border-b border-paper-100 bg-paper-50 flex items-center justify-between">
                <h4 className="font-medium text-ink-950">Personal asignado · {detail.staff?.length || 0}</h4>
                <Button variant="ghost" icon="ti-plus">Asignar usuario</Button>
              </div>
              <div className="divide-y divide-paper-100">
                {(detail.staff || []).map((s, i) => (
                  <div key={i} className="px-6 py-3 flex items-center gap-4">
                    <div className={`w-8 h-8 flex items-center justify-center font-display text-xs ${s.isLead ? 'bg-accent/20 border border-accent/30 text-accent-dark' : 'bg-stone-100 border border-paper-200 text-stone-700'}`}>{s.initials}</div>
                    <div className="flex-1">
                      <div className="text-[13px] text-ink-950 font-medium">{s.name}</div>
                      <div className="text-[11px] text-stone-500">{s.role}</div>
                    </div>
                    <Badge variant={s.isLead ? 'accent' : 'default'}>{s.responsibility}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-padded">
              <div className="overline mb-3">Indicadores asociados</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-display text-2xl text-ink-950">{detail.metrics?.indicators || 18}</div>
                  <div className="text-[11px] text-stone-600 mt-1">Indicadores</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-status-ok">{detail.metrics?.compliance || '87,4'}%</div>
                  <div className="text-[11px] text-stone-600 mt-1">Cumplimiento</div>
                </div>
                <div>
                  <div className="font-display text-2xl text-status-warn">{detail.metrics?.openEvents || 3}</div>
                  <div className="text-[11px] text-stone-600 mt-1">Eventos abiertos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TreeNode = ({ node, expanded, selected, onToggle, onSelect, level }) => {
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected === node.id;
  const hasChildren = node.children?.length > 0;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 px-2 cursor-pointer ${isSelected ? 'bg-paper-50 border-l-2 border-accent' : 'hover:bg-paper-50'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(node.id)}
      >
        {hasChildren ? (
          <button onClick={(e) => { e.stopPropagation(); onToggle(node.id); }} className="bg-transparent border-none cursor-pointer p-0">
            <i className={`ti ti-chevron-${isExpanded ? 'down' : 'right'} text-stone-600 text-sm`} />
          </button>
        ) : <span className="w-3.5" />}
        <i className={`ti ${node.icon || 'ti-building'} text-stone-600 text-sm`} />
        <span className={`text-[13px] flex-1 ${isSelected ? 'text-ink-950 font-medium' : 'text-stone-700'}`}>{node.name}</span>
        {node.count && <span className="text-[10px] text-stone-500">{node.count}</span>}
      </div>
      {isExpanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} expanded={expanded} selected={selected} onToggle={onToggle} onSelect={onSelect} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const defaultTree = {
  totalUnits: 14,
  totalUsers: 47,
  root: {
    id: 'das', name: 'DAS Concepción', icon: 'ti-building-bank', count: '47 usuarios',
    children: [
      { id: 'cemsco', name: 'Establecimientos CEMSCO', icon: 'ti-building-hospital', count: '3 unidades',
        children: [
          { id: 'cemsco-lorenzo-arenas', name: 'CEMSCO Lorenzo Arenas', icon: 'ti-building', count: '12 usuarios' },
          { id: 'cemsco-tucapel', name: 'CEMSCO Tucapel', icon: 'ti-building', count: '8 usuarios' },
          { id: 'cemsco-pedro-medina', name: 'CEMSCO Pedro de Valdivia', icon: 'ti-building', count: '10 usuarios' },
        ] },
      { id: 'cesfam', name: 'CESFAM', icon: 'ti-building-hospital', count: '4 unidades',
        children: [
          { id: 'cesfam-lorenzo-arenas', name: 'CESFAM Lorenzo Arenas', icon: 'ti-building', count: '6 usuarios' },
          { id: 'cesfam-tucapel', name: 'CESFAM Tucapel', icon: 'ti-building', count: '5 usuarios' },
          { id: 'cesfam-pedro-medina', name: 'CESFAM Pedro de Valdivia', icon: 'ti-building', count: '4 usuarios' },
        ] },
      { id: 'dental', name: 'Servicio Dental', icon: 'ti-dental', count: '2 usuarios' },
      { id: 'central', name: 'Dirección DAS · Oficina central', icon: 'ti-briefcase', count: '5 usuarios' },
    ],
  },
};

const defaultDetail = {
  name: 'CEMSCO Lorenzo Arenas',
  code: 'CEMSCO-LA',
  type: 'Centro de Salud Familiar',
  director: 'Dr. Pablo Henríquez',
  address: 'Calle Esmeralda 1234, Concepción',
  phone: '+56 41 234 5678',
  email: 'cemsco.la@dasconcepcion.cl',
  population: '24.500 habitantes',
  status: 'Activo · Acreditado',
  staff: [
    { initials: 'PH', name: 'Dr. Pablo Henríquez', role: 'Director médico', isLead: true, responsibility: 'Jefe de unidad' },
    { initials: 'MS', name: 'María Soto Vargas', role: 'Enfermera coordinadora', responsibility: 'Coordinación calidad' },
    { initials: 'CP', name: 'Carolina Pérez Núñez', role: 'Tens encargado', responsibility: 'Eventos adversos' },
    { initials: 'JR', name: 'Javier Rojas Cruz', role: 'Médico general', responsibility: 'Atención clínica' },
    { initials: 'PS', name: 'Patricia Sandoval', role: 'Matrona', responsibility: 'Atención maternal' },
  ],
  metrics: { indicators: 18, compliance: '87,4', openEvents: 3 },
};

export default Organizacion;
