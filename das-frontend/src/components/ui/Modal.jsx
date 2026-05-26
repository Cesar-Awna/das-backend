import { useEffect } from 'react';

/**
 * Modal - diálogo modal reutilizable.
 */
const Modal = ({ open, onClose, title, children, maxWidth = '600px' }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const onEsc = (e) => e.key === 'Escape' && onClose?.();
      window.addEventListener('keydown', onEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onEsc);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-paper-100 max-h-[90vh] overflow-auto"
        style={{ width: '90vw', maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-6 py-4 border-b border-paper-100 flex items-center justify-between">
            <h3 className="font-display text-xl text-ink-950">{title}</h3>
            <button onClick={onClose} className="text-stone-500 hover:text-ink-950">
              <i className="ti ti-x text-lg" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
