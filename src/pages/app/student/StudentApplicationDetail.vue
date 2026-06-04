<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import {
  ArrowLeft,
  FileText,
  Clock,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-vue-next';
import { useApplicationStore } from '@/stores/applications';
import NtiStatusBadge from '@/components/ui/NtiStatusBadge.vue';
import NtiAlert from '@/components/ui/NtiAlert.vue';

const route = useRoute();
const appStore = useApplicationStore();

const id = Number(route.params['id']);

onMounted(() => {
  void appStore.fetchApplication(id);
});

onBeforeUnmount(() => {
  appStore.clearCurrent();
});

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('sk-SK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

const eventIcons: Record<string, typeof CheckCircle> = {
  approved: CheckCircle,
  rejected: XCircle,
  revision_requested: AlertCircle,
};
</script>

<template>
  <div>
    <!-- Back link -->
    <RouterLink
      :to="{ name: 'student-applications' }"
      class="btn-ghost text-sm mb-6 inline-flex"
    >
      <ArrowLeft class="size-4" />
      Späť na zoznam
    </RouterLink>

    <!-- Loading -->
    <div v-if="appStore.loading && !appStore.current" class="flex justify-center py-16">
      <Loader2 class="size-7 text-nti-green animate-spin" />
    </div>

    <template v-else-if="appStore.current">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <p class="font-mono text-xs text-nti-muted mb-1">
            Program {{ appStore.current.programType }}
          </p>
          <h1 class="font-display text-2xl font-bold text-nti-white mb-2">
            {{ appStore.current.callTitle }}
          </h1>
          <NtiStatusBadge :status="appStore.current.status" />
        </div>
        <div class="text-xs text-nti-muted font-mono shrink-0">
          ID: #{{ appStore.current.id }}
        </div>
      </div>

      <!-- Revision alert -->
      <NtiAlert
        v-if="appStore.current.status === 'revision_requested'"
        variant="warning"
        title="Vyžaduje sa doplnenie"
        class="mb-6"
        :dismissible="false"
      >
        {{ appStore.current.feedback ?? 'Komisia žiada o doplnenie prihlášky.' }}
      </NtiAlert>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-5">
          <!-- Motivation letter -->
          <div class="card-nti p-6" v-if="appStore.current.motivationLetter">
            <h2 class="font-display font-semibold text-nti-white mb-3 flex items-center gap-2">
              <FileText class="size-4 text-nti-green" />
              Motivačný list
            </h2>
            <p class="text-sm text-nti-gray leading-relaxed whitespace-pre-line">
              {{ appStore.current.motivationLetter }}
            </p>
          </div>

          <!-- Documents -->
          <div class="card-nti p-6">
            <h2 class="font-display font-semibold text-nti-white mb-4 flex items-center gap-2">
              <FileText class="size-4 text-nti-green" />
              Prílohy ({{ appStore.current.documents.length }})
            </h2>
            <div v-if="appStore.current.documents.length === 0" class="text-sm text-nti-muted">
              Žiadne prílohy
            </div>
            <div v-else class="space-y-2">
              <a
                v-for="doc in appStore.current.documents"
                :key="doc.id"
                :href="doc.url"
                target="_blank"
                class="flex items-center gap-3 p-3 rounded-lg bg-nti-surface border border-nti-border hover:border-nti-green/30 transition-colors"
              >
                <FileText class="size-4 text-nti-green shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-nti-white truncate">{{ doc.name }}</p>
                  <p class="text-xs text-nti-muted">{{ doc.type }} · {{ formatDate(doc.uploadedAt) }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Timeline sidebar -->
        <div>
          <div class="card-nti p-6">
            <h2 class="font-display font-semibold text-nti-white mb-5 flex items-center gap-2">
              <Clock class="size-4 text-nti-green" />
              História
            </h2>
            <div class="relative">
              <div class="absolute left-3.5 top-0 bottom-0 w-px bg-nti-border" />
              <div class="space-y-5">
                <div
                  v-for="event in appStore.current.timeline"
                  :key="event.id"
                  class="flex gap-4 relative"
                >
                  <div class="size-7 rounded-full bg-nti-surface border border-nti-border flex items-center justify-center shrink-0 z-10">
                    <component
                      :is="eventIcons[event.status] ?? Clock"
                      class="size-3.5"
                      :class="
                        event.status === 'approved'
                          ? 'text-nti-green'
                          : event.status === 'rejected'
                          ? 'text-red-400'
                          : 'text-nti-gray'
                      "
                    />
                  </div>
                  <div class="flex-1 pb-1">
                    <NtiStatusBadge :status="event.status" />
                    <p v-if="event.note" class="text-xs text-nti-gray mt-1">{{ event.note }}</p>
                    <p class="text-xs text-nti-muted mt-1">{{ formatDate(event.createdAt) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Error -->
    <div v-else-if="appStore.error">
      <NtiAlert variant="error" title="Chyba" :dismissible="false">
        {{ appStore.error }}
      </NtiAlert>
    </div>
  </div>
</template>