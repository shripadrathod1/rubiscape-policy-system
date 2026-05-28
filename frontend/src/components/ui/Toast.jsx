import { useContext } from 'react';
import { X, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { ToastContext } from '../../context/ToastContext';

const CONFIG = {
  success: { Icon: CheckCircle2, container: 'bg-emerald-950/95 border-emerald-600/40', icon: 'text-emerald-400', text: 'text-emerald-100' },
  error:   { Icon: XCircle,      container: 'bg-rose-950/95 border-rose-600/40',       icon: 'text-rose-400',    text: 'text-rose-100'    },
  warning: { Icon: AlertTriangle, container: 'bg-amber-950/95 border-amber-600/40',    icon: 'text-amber-400',   text: 'text-amber-100'   },
  info:    { Icon: Info,          container: 'bg-indigo-950/95 border-indigo-600/40',  icon: 'text-indigo-400',  text: 'text-indigo-100'  },
};

export default function Toast() {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const { Icon, container, icon, text } = CONFIG[toast.type] ?? CONFIG.info;
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-2xl
              backdrop-blur-md pointer-events-auto animate-fade-in
              ${container}
            `}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${icon}`} />
            <p className={`flex-1 text-sm font-medium leading-snug ${text}`}>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className={`opacity-60 hover:opacity-100 transition-opacity flex-shrink-0 ${text}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
