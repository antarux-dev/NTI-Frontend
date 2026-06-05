<script setup lang="ts">
  import { useConfirm } from '@/composables/useConfirm';
  import { AlertTriangle, Info, AlertCircle } from 'lucide-vue-next';
  import NtiModal from '@/components/ui/NtiModal.vue';

  const { state, accept, cancel } = useConfirm();

  const icons = {
    danger: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const iconColors = {
    danger: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  };

  const confirmBtnClass = {
    danger: 'bg-red-500 hover:bg-red-400 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-400 text-nti-black',
    info: 'btn-primary',
  };
</script>

<template>
  <NtiModal
    v-if="state.open"
    :title="state.options.title"
    size="sm"
    :closable="true"
    @close="cancel"
  >
    <div class="flex gap-4 items-start">
      <div
        class="size-10 rounded-xl flex items-center justify-center shrink-0 bg-nti-surface border border-nti-border"
      >
        <component
          :is="icons[state.options.variant ?? 'info']"
          class="size-5"
          :class="iconColors[state.options.variant ?? 'info']"
        />
      </div>
      <p class="text-sm text-nti-gray leading-relaxed pt-1.5">
        {{ state.options.message ?? 'Naozaj chcete pokračovať?' }}
      </p>
    </div>

    <template #footer>
      <button class="btn-outline text-sm" @click="cancel">
        {{ state.options.cancelLabel }}
      </button>
      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        :class="confirmBtnClass[state.options.variant ?? 'info']"
        @click="accept"
      >
        {{ state.options.confirmLabel }}
      </button>
    </template>
  </NtiModal>
</template>
