import { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function Modal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel  = 'Confirm',
  confirmVariant = 'danger',
  loading       = false,
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl p-6 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 p-2.5 bg-rose-500/10 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-slate-100 mb-1">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
