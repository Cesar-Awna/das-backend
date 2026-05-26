import { useState } from 'react';
import { PageHeader, Button } from '../../components/ui/index.js';

const CONFIDENCE_Z = { 80: 1.282, 90: 1.645, 95: 1.96, 99: 2.576 };

const CalculoMuestral = () => {
  const [N, setN] = useState(1200);
  const [confidence, setConfidence] = useState(95);
  const [margin, setMargin] = useState(5);
  const [p, setP] = useState(0.5);

  const Z = CONFIDENCE_Z[confidence];
  const e = margin / 100;
  const numerator = Z * Z * p * (1 - p) * N;
  const denominator = e * e * (N - 1) + Z * Z * p * (1 - p);
  const n = Math.ceil(numerator / denominator);

  return (
    <>
      <PageHeader overline="Herramientas" title="Cálculo del tamaño muestral" />
      <div className="p-10 max-w-7xl">
        <section className="mb-10">
          <div className="overline-accent mb-3">Calculadora estadística</div>
          <h2 className="font-display text-3xl text-ink-950 leading-tight max-w-3xl">
            Determine el tamaño muestral necesario para sus auditorías y supervisiones.
          </h2>
        </section>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <div className="card card-padded space-y-6">
              <div>
                <label className="input-label mb-2">Población total (N)</label>
                <input type="number" className="input-line" value={N} onChange={(e) => setN(+e.target.value)} style={{ fontSize: 18 }} />
                <p className="text-[12px] text-stone-500 mt-1">Cantidad total de elementos del universo a evaluar</p>
              </div>

              <div>
                <label className="input-label mb-2">Nivel de confianza</label>
                <div className="flex gap-2">
                  {[80, 90, 95, 99].map(c => (
                    <button key={c} onClick={() => setConfidence(c)} className={`px-4 py-2 text-[13px] ${confidence === c ? 'bg-ink-950 text-paper' : 'border border-paper-200 text-stone-700 bg-white'}`}>
                      {c}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Margen de error</label>
                <div className="flex gap-2">
                  {[3, 5, 7, 10].map(m => (
                    <button key={m} onClick={() => setMargin(m)} className={`px-4 py-2 text-[13px] ${margin === m ? 'bg-ink-950 text-paper' : 'border border-paper-200 text-stone-700 bg-white'}`}>
                      {m}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="input-label mb-2">Proporción esperada (p)</label>
                <input type="number" className="input-line" value={p} onChange={(e) => setP(+e.target.value)} step="0.1" min="0" max="1" />
                <p className="text-[12px] text-stone-500 mt-1">Valor por defecto 0.5 (máxima variabilidad)</p>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="bg-ink-950 text-paper p-8 relative overflow-hidden">
              <div className="absolute inset-0 grain-bg opacity-20" />
              <div className="relative z-10">
                <div className="overline mb-4 text-paper/70">Resultado</div>
                <div className="font-display text-7xl mb-2">{n}</div>
                <div className="text-[13px] opacity-80">elementos a muestrear</div>
                <div className="mt-8 pt-6 border-t border-white/20 space-y-3 text-[13px]">
                  <div className="flex justify-between"><span className="opacity-60">Población</span><span>{N.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Confianza</span><span>{confidence}%</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Margen error</span><span>{margin}%</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Proporción</span><span>{p}</span></div>
                  <div className="flex justify-between"><span className="opacity-60">Z-score</span><span>{Z}</span></div>
                </div>
                <Button variant="secondary" full className="mt-6" icon="ti-link">Vincular a pauta</Button>
              </div>
            </div>

            <div className="mt-6 bg-paper-50 border border-paper-200 p-6">
              <div className="overline mb-2">Fórmula aplicada</div>
              <div className="font-mono text-[12px] text-ink-950 leading-relaxed">
                n = (Z² · p · (1-p) · N) / (e² · (N-1) + Z² · p · (1-p))
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculoMuestral;
