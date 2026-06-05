<script setup lang="ts">
  interface Props {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    modelValue?: string | number;
  }

  withDefaults(defineProps<Props>(), {
    id: undefined,
    label: undefined,
    type: 'text',
    placeholder: '',
    error: undefined,
    hint: undefined,
    required: false,
    disabled: false,
    modelValue: '',
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string];
  }>();
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="label-nti">
      {{ label }}
      <span v-if="required" class="text-nti-green ml-0.5">*</span>
    </label>

    <div class="relative">
      <div
        v-if="$slots['icon-left']"
        class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-nti-muted"
      >
        <slot name="icon-left" />
      </div>

      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :value="modelValue"
        class="input-nti"
        :class="{
          error: !!error,
          'pl-10': !!$slots['icon-left'],
          'pr-10': !!$slots['icon-right'],
        }"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <div
        v-if="$slots['icon-right']"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted"
      >
        <slot name="icon-right" />
      </div>
    </div>

    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-nti-muted">{{ hint }}</p>
  </div>
</template>
