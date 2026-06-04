<script setup lang="ts">
import type { ApplicationStatus, CallStatus } from '../../types';

interface Props {
  status: ApplicationStatus | CallStatus | string;
}

defineProps<Props>();

type StatusConfig = { label: string; variant: string };

const config: Record<string, StatusConfig> = {
  // ApplicationStatus
  draft: { label: 'Rozpracovaná', variant: 'badge-gray' },
  submitted: { label: 'Odoslaná', variant: 'badge-green' },
  formal_check: { label: 'Formálna kontrola', variant: 'badge-gray' },
  under_review: {
    label: 'V hodnotení',
    variant:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20',
  },
  revision_requested: {
    label: 'Doplnenie',
    variant:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  },
  approved: { label: 'Schválená', variant: 'badge-green' },
  rejected: {
    label: 'Zamietnutá',
    variant:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-red-500/10 text-red-400 border border-red-500/20',
  },
  onboarding: { label: 'Onboarding', variant: 'badge-green' },
  active: { label: 'Aktívna', variant: 'badge-green' },
  completed: { label: 'Ukončená', variant: 'badge-gray' },
  archived: { label: 'Archivovaná', variant: 'badge-gray' },
  // CallStatus
  open: { label: 'Otvorená', variant: 'badge-green' },
  closed: { label: 'Uzavretá', variant: 'badge-gray' },
  evaluating: {
    label: 'Hodnotenie',
    variant:
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20',
  },
  finished: { label: 'Ukončená', variant: 'badge-gray' },
};

function getConfig(status: string): StatusConfig {
  return config[status] ?? { label: status, variant: 'badge-gray' };
}
</script>

<template>
  <span :class="getConfig(status).variant">
    {{ getConfig(status).label }}
  </span>
</template>