import { ref, readonly } from 'vue';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
  duration: number;
}

let _nextId = 0;
const toasts = ref<Toast[]>([]);

export function useToast() {
  function add(message: string, variant: ToastVariant = 'info', duration = 4000): void {
    const id = ++_nextId;
    toasts.value.push({ id, message, variant, duration });
    if (duration > 0) {
      setTimeout(() => remove(id), duration);
    }
  }

  function remove(id: number): void {
    const idx = toasts.value.findIndex((t) => t.id === id);
    if (idx !== -1) toasts.value.splice(idx, 1);
  }

  return {
    toasts: readonly(toasts),
    success: (msg: string) => add(msg, 'success'),
    error: (msg: string) => add(msg, 'error'),
    info: (msg: string) => add(msg, 'info'),
    warning: (msg: string) => add(msg, 'warning'),
    remove,
  };
}