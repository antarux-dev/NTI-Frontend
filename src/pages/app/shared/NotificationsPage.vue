<script setup lang="ts">
  import { ref } from 'vue';
  import { Bell, CheckCheck, Rocket, FileText, Users, AlertCircle } from 'lucide-vue-next';
  import NtiEmptyState from '@/components/ui/NtiEmptyState.vue';

  interface Notification {
    id: number;
    type: 'application' | 'team' | 'system' | 'program';
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
  }

  const notifications = ref<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'Prihláška odoslaná',
      message: 'Vaša prihláška do výzvy 2025/I bola úspešne odoslaná a čaká na formálnu kontrolu.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 2,
      type: 'program',
      title: 'Nová výzva otvorená',
      message: 'Výzva 2025/B pre Program B je otvorená. Deadline prihlášok je 15. september 2025.',
      read: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    {
      id: 3,
      type: 'system',
      title: 'Vitajte v NTI portáli',
      message: 'Váš účet bol úspešne overený. Môžete podávať prihlášky do programov.',
      read: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ]);

  const unreadCount = ref(notifications.value.filter((n) => !n.read).length);

  function markAllRead(): void {
    notifications.value = notifications.value.map((n) => ({ ...n, read: true }));
    unreadCount.value = 0;
  }

  function markRead(id: number): void {
    const n = notifications.value.find((n) => n.id === id);
    if (n && !n.read) {
      n.read = true;
      unreadCount.value = Math.max(0, unreadCount.value - 1);
    }
  }

  const typeIcons = { application: FileText, team: Users, program: Rocket, system: AlertCircle };

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'práve teraz';
    if (m < 60) return `pred ${m} min`;
    const h = Math.floor(m / 60);
    if (h < 24) return `pred ${h} h`;
    return new Intl.DateTimeFormat('sk-SK').format(new Date(dateStr));
  }
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="font-mono text-xs text-nti-green mb-1">// Notifikácie</p>
        <h1 class="font-display text-xl font-bold text-nti-white flex items-center gap-3">
          Notifikácie
          <span v-if="unreadCount > 0" class="badge-green text-xs">{{ unreadCount }} nových</span>
        </h1>
      </div>
      <button v-if="unreadCount > 0" class="btn-ghost text-sm" @click="markAllRead">
        <CheckCheck class="size-4" /> Označiť všetky
      </button>
    </div>

    <NtiEmptyState
      v-if="notifications.length === 0"
      :icon="Bell"
      title="Žiadne notifikácie"
      description="Nové notifikácie sa zobrazia tu — stav prihlášok, výzvy, zmeny v tíme."
    />

    <div v-else class="space-y-2">
      <div
        v-for="n in notifications"
        :key="n.id"
        class="card-nti flex items-start gap-4 p-4 cursor-pointer"
        :class="{ 'border-nti-green/20': !n.read }"
        @click="markRead(n.id)"
      >
        <div
          class="size-9 rounded-xl flex items-center justify-center shrink-0"
          :class="
            n.read
              ? 'bg-nti-surface border border-nti-border'
              : 'bg-nti-green-dim border border-nti-green/20'
          "
        >
          <component
            :is="typeIcons[n.type]"
            class="size-4"
            :class="n.read ? 'text-nti-muted' : 'text-nti-green'"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-3">
            <p class="text-sm font-semibold" :class="n.read ? 'text-nti-gray' : 'text-nti-white'">
              {{ n.title }}
            </p>
            <span class="text-xs text-nti-muted font-mono shrink-0">{{
              timeAgo(n.createdAt)
            }}</span>
          </div>
          <p class="text-xs text-nti-gray mt-1 leading-relaxed">{{ n.message }}</p>
        </div>
        <div v-if="!n.read" class="size-2 rounded-full bg-nti-green shrink-0 mt-2" />
      </div>
    </div>
  </div>
</template>
