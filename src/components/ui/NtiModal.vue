<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { X } from 'lucide-vue-next';

  interface Props {
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closable?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    title: undefined,
    size: 'md',
    closable: true,
  });

  const emit = defineEmits<{ close: [] }>();

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && props.closable) emit('close');
  }

  onMounted(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
  });

  onUnmounted(() => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="true"
        class="fixed inset-0 z-[9000] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-sm"
          @click="closable && emit('close')"
        />

        <!-- Panel -->
        <div class="relative card-nti w-full shadow-2xl" :class="sizes[size]">
          <!-- Header -->
          <div
            v-if="title || closable"
            class="flex items-center justify-between px-6 py-4 border-b border-nti-border"
          >
            <h2 v-if="title" class="font-display font-semibold text-nti-white">{{ title }}</h2>
            <div v-else />
            <button
              v-if="closable"
              class="btn-ghost p-1.5 ml-auto"
              aria-label="Zavrieť"
              @click="emit('close')"
            >
              <X class="size-4" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="px-6 py-4 border-t border-nti-border flex justify-end gap-3"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s ease;
  }
  .modal-enter-active .relative,
  .modal-leave-active .relative {
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-from .relative,
  .modal-leave-to .relative {
    transform: translateY(-12px);
    opacity: 0;
  }
</style>
