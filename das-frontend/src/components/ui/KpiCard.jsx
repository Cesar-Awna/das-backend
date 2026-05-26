/**
 * KpiCard - tarjeta para mostrar un KPI numérico con icono y footer opcional.
 */
const KpiCard = ({ label, value, suffix, icon, footer, footerVariant = 'default', onClick }) => {
  const footerColors = {
    default: 'text-stone-600',
    ok: 'text-status-ok',
    warn: 'text-status-warn',
    danger: 'text-status-danger',
  };

  return (
    <div
      className={`bg-white p-6 transition-colors ${onClick ? 'cursor-pointer hover:bg-paper-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="badge">{label}</span>
        {icon && <i className={`ti ${icon} text-stone-500`} />}
      </div>
      <div className="font-display text-4xl text-ink-950 mb-1">
        {value}
        {suffix && <span className="text-stone-500 text-2xl">{suffix}</span>}
      </div>
      {footer && (
        <div
          className={`mt-3 pt-3 border-t border-paper-100 text-xs flex items-center gap-1 ${footerColors[footerVariant]}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default KpiCard;
