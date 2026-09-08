import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'cart' | 'fav' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#151515] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-between gap-3 animate-slideInRight"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D95F25] text-white flex items-center justify-center flex-shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-4 h-4" />
              ) : toast.type === 'fav' ? (
                <Heart className="w-4 h-4 fill-white" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-white">{toast.title}</h5>
              {toast.description && (
                <p className="text-[11px] text-white/70">{toast.description}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-white/60 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
