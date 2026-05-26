/**
 * ProgressBar - barra de progreso con color semántico automático según meta.
 */
const ProgressBar = ({ value, max = 100, variant, thin = false }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  // Auto-color si no se especifica
  const autoVariant =
    variant ??
    (pct >= 85 ? 'ok' : pct >= 65 ? 'warn' : 'danger');
  const colors = {
    ok: 'bg-status-ok',
    warn: 'bg-status-warn',
    danger: 'bg-status-danger',
    accent: 'bg-accent',
    ink: 'bg-ink-900',
  };
  return (
    <div className={`${thin ? 'h-1' : 'h-1.5'} bg-paper-100`}>
      <div className={`h-full ${colors[autoVariant]}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

export default ProgressBar;
