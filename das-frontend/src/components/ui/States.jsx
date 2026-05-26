/**
 * Loader - estado de carga centrado.
 */
export const Loader = ({ message = 'Cargando…' }) => (
  <div className="flex flex-col items-center justify-center py-20 text-stone-500">
    <div className="w-8 h-8 border-2 border-paper-200 border-t-ink-900 rounded-full animate-spin mb-4" />
    <div className="overline">{message}</div>
  </div>
);

/**
 * EmptyState - cuando no hay datos.
 */
export const EmptyState = ({ icon = 'ti-inbox', title, description }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <i className={`ti ${icon} text-4xl text-stone-500 mb-4`} />
    <div className="font-display text-xl text-ink-950 mb-2">{title}</div>
    {description && <div className="text-sm text-stone-600 max-w-md">{description}</div>}
  </div>
);

/**
 * ErrorState - cuando una request falla.
 */
export const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <i className="ti ti-alert-circle text-4xl text-status-danger mb-4" />
    <div className="font-display text-xl text-ink-950 mb-2">No se pudo cargar la información</div>
    <div className="text-sm text-stone-600 mb-4 max-w-md">
      {error?.response?.data?.message || error?.message || 'Error de conexión con el servidor.'}
    </div>
    {onRetry && (
      <button className="btn-link" onClick={onRetry}>
        Reintentar →
      </button>
    )}
  </div>
);
