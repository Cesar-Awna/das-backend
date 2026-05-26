import { useEffect, useState, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

let nextId = 1;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((variant, message) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, variant, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const toast = {
    success: (msg) => push('ok', msg),
    error: (msg) => push('danger', msg),
    warn: (msg) => push('warn', msg),
    info: (msg) => push('info', msg),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ variant, message }) => {
  const icons = {
    ok: 'ti-check',
    danger: 'ti-x',
    warn: 'ti-alert-triangle',
    info: 'ti-info-circle',
  };
  const colors = {
    ok: 'border-l-status-ok bg-status-ok/5',
    danger: 'border-l-status-danger bg-status-danger/5',
    warn: 'border-l-status-warn bg-status-warn/5',
    info: 'border-l-ink-700 bg-ink-700/5',
  };
  const iconColors = {
    ok: 'text-status-ok',
    danger: 'text-status-danger',
    warn: 'text-status-warn',
    info: 'text-ink-700',
  };
  return (
    <div
      className={`pointer-events-auto bg-white border border-paper-100 border-l-4 ${colors[variant]} px-5 py-4 min-w-[280px] max-w-md shadow-sm fade-in flex items-start gap-3`}
    >
      <i className={`ti ${icons[variant]} ${iconColors[variant]} mt-0.5`} />
      <div className="text-sm text-ink-950 flex-1">{message}</div>
    </div>
  );
};
