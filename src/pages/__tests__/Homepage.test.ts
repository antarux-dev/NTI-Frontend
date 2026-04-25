import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Homepage from '../Homepage.vue';

vi.mock('@/stores/nti', () => ({
  useNtiStore: vi.fn(() => ({
    stats: [
      { label: 'Projekty', val: '42' },
      { label: 'Študenti', val: '128' },
      { label: 'Firmy', val: '19' },
      { label: 'Mentori', val: '8' },
    ],
    programs: [],
    pillars: [],
    steps: [],
    partners: [],
  })),
}));

describe('Homepage.vue', () => {
  it('renders the hero title correctly', () => {
    const wrapper = shallowMount(Homepage);

    const title = wrapper.find('.hero__title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain('Miesto, kde nápady');
    expect(title.text()).toContain('dostávajú tvar');
  });

  it('renders the NTI v číslach stats card', () => {
    const wrapper = shallowMount(Homepage);

    const stats = wrapper.find('.hero__stats');
    expect(stats.exists()).toBe(true);
    expect(wrapper.findAll('.stat-box').length).toBeGreaterThan(0);
  });

  it('renders the programs grid section', () => {
    const wrapper = shallowMount(Homepage);
    expect(wrapper.find('.programs-grid').exists()).toBe(true);
  });
});
