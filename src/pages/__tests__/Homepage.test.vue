<script setup lang="ts">
  import { describe, it, expect } from 'vitest';
  import { mount } from '@vue/test-utils';
  import Homepage from '../Homepage.vue';
  import { nextTick } from 'vue';
</script>

<template>
  <div data-testid="test-wrapper">
    <Homepage />
  </div>
</template>

<script lang="ts">
  describe('Homepage.vue', () => {
    it('button returns correct value when clicked', async () => {
      const wrapper = mount(Homepage);

      const button = wrapper.find('[data-testid="test-button"]');
      expect(button.exists()).toBe(true);

      await button.trigger('click');
      await nextTick();

      const result = wrapper.vm.handleTestClick();
      expect(result).toBe('sabrina is cool');
    });
  });
</script>
