<script setup lang="ts">
  import { useToast } from '@/composables/useToast';
  import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next';

  const { toasts, remove } = useToast();

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  } as const;

  const styles = {
    success: 'border-nti-green/20 bg-nti-green-dim text-nti-green-light',
    error: 'border-red-500/20 bg-red-500/10 text-red-300',
    info: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
    warning: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-300',
  } as const;
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
    >
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg min-w-[280px] max-w-sm"
          :class="styles[toast.variant]"
          role="alert"
        >
          <component :is="icons[toast.variant]" class="size-4 shrink-0 mt-0.5" />
          <p class="text-sm flex-1">{{ toast.message }}</p>
          <button
            class="opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Zavrieť"
            @click="remove(toast.id)"
          >
            <X class="size-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
  .toast-enter-active {
    transition: all 0.25s ease;
  }
  .toast-leave-active {
    transition: all 0.2s ease;
  }
  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
</style>
