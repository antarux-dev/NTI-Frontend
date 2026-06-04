<script setup lang="ts">
import { ref } from 'vue';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-vue-next';

interface Props {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'info',
  title: undefined,
  dismissible: false,
});

const visible = ref(true);

const styles = {
  info: {
    wrapper: 'border-blue-500/20 bg-blue-500/8',
    icon: Info,
    iconColor: 'text-blue-400',
    textColor: 'text-blue-300',
  },
  success: {
    wrapper: 'border-nti-green/20 bg-nti-green-dim',
    icon: CheckCircle,
    iconColor: 'text-nti-green',
    textColor: 'text-nti-green-light',
  },
  warning: {
    wrapper: 'border-yellow-500/20 bg-yellow-500/8',
    icon: AlertTriangle,
    iconColor: 'text-yellow-400',
    textColor: 'text-yellow-300',
  },
  error: {
    wrapper: 'border-red-500/20 bg-red-500/8',
    icon: AlertCircle,
    iconColor: 'text-red-400',
    textColor: 'text-red-300',
  },
} as const;

const s = styles[props.variant];
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="flex gap-3 rounded-lg border p-4"
      :class="s.wrapper"
      role="alert"
    >
      <component :is="s.icon" class="size-4 shrink-0 mt-0.5" :class="s.iconColor" />
      <div class="flex-1 min-w-0">
        <p v-if="title" class="font-medium text-sm mb-0.5" :class="s.textColor">{{ title }}</p>
        <div class="text-sm text-nti-gray">
          <slot />
        </div>
      </div>
      <button
        v-if="dismissible"
        class="text-nti-muted hover:text-nti-gray transition-colors shrink-0"
        aria-label="Zavrieť"
        @click="visible = false"
      >
        <X class="size-4" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>