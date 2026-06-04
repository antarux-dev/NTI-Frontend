import { ref } from 'vue';

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const state = ref<{
  open: boolean;
  options: ConfirmOptions;
  resolve: ((val: boolean) => void) | null;
}>({
  open: false,
  options: { title: '' },
  resolve: null,
});

export function useConfirm() {
  function confirm(options: ConfirmOptions): Promise<boolean> {
    state.value = {
      open: true,
      options: {
        confirmLabel: 'Potvrdiť',
        cancelLabel: 'Zrušiť',
        variant: 'info',
        ...options,
      },
      resolve: null,
    };
    return new Promise((resolve) => {
      state.value.resolve = resolve;
    });
  }

  function accept(): void {
    state.value.resolve?.(true);
    state.value.open = false;
  }

  function cancel(): void {
    state.value.resolve?.(false);
    state.value.open = false;
  }

  return { state, confirm, accept, cancel };
}