<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Users, Plus, Mail, Trash2, LogOut, Loader2, Crown, UserPlus } from 'lucide-vue-next';
  import { useTeamStore } from '@/stores/teams';
  import { useAuthStore } from '@/stores/auth';
  import { useConfirm } from '@/composables/useConfirm';
  import NtiEmptyState from '@/components/ui/NtiEmptyState.vue';
  import NtiAlert from '@/components/ui/NtiAlert.vue';
  import NtiModal from '@/components/ui/NtiModal.vue';

  const teamStore = useTeamStore();
  const authStore = useAuthStore();
  const { confirm } = useConfirm();

  const showCreateModal = ref(false);
  const showInviteModal = ref(false);

  onMounted(() => {
    void teamStore.fetchMyTeam();
  });

  // ── Create team form ───────────────────────────────────────────────────────
  const createSchema = z.object({
    name: z.string().min(3, 'Názov tímu musí mať aspoň 3 znaky').max(60),
  });
  const createForm = useForm({ validationSchema: toTypedSchema(createSchema) });
  const [teamName, teamNameAttrs] = createForm.defineField('name');

  const onCreateTeam = createForm.handleSubmit(async (values) => {
    await teamStore.createTeam({ name: values.name });
    showCreateModal.value = false;
  });

  // ── Invite member form ─────────────────────────────────────────────────────
  const inviteSchema = z.object({
    email: z.string().email('Zadajte platný e-mail'),
  });
  const inviteForm = useForm({ validationSchema: toTypedSchema(inviteSchema) });
  const [inviteEmail, inviteEmailAttrs] = inviteForm.defineField('email');

  const onInvite = inviteForm.handleSubmit(async (values) => {
    await teamStore.inviteMember(values.email);
    showInviteModal.value = false;
    inviteForm.resetForm();
  });

  // ── Actions ────────────────────────────────────────────────────────────────
  async function handleRemove(userId: number, name: string): Promise<void> {
    const ok = await confirm({
      title: 'Odstrániť člena',
      message: `Naozaj chcete odstrániť ${name} z tímu?`,
      confirmLabel: 'Odstrániť',
      cancelLabel: 'Zrušiť',
      variant: 'danger',
    });
    if (ok) await teamStore.removeMember(userId);
  }

  async function handleLeave(): Promise<void> {
    const ok = await confirm({
      title: 'Opustiť tím',
      message: 'Naozaj chcete opustiť tento tím? Táto akcia je nevratná.',
      confirmLabel: 'Opustiť',
      cancelLabel: 'Zrušiť',
      variant: 'danger',
    });
    if (ok) await teamStore.leaveTeam();
  }

  const isLeader = (userId: number) => teamStore.team?.leaderId === userId;

  const isMe = (userId: number) => authStore.user?.id === userId;
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="font-mono text-xs text-nti-green mb-1">// Tím</p>
        <h1 class="font-display text-xl font-bold text-nti-white">Môj tím</h1>
      </div>
      <div v-if="!teamStore.team" class="flex gap-3">
        <button class="btn-primary text-sm" @click="showCreateModal = true">
          <Plus class="size-4" /> Vytvoriť tím
        </button>
      </div>
      <div v-else class="flex gap-3">
        <button class="btn-outline text-sm" @click="showInviteModal = true">
          <UserPlus class="size-4" /> Pozvať člena
        </button>
      </div>
    </div>

    <NtiAlert v-if="teamStore.successMessage" variant="success" :dismissible="true" class="mb-5">
      {{ teamStore.successMessage }}
    </NtiAlert>
    <NtiAlert v-if="teamStore.error" variant="error" :dismissible="true" class="mb-5">
      {{ teamStore.error }}
    </NtiAlert>

    <!-- Loading -->
    <div v-if="teamStore.loading" class="flex justify-center py-16">
      <Loader2 class="size-7 text-nti-green animate-spin" />
    </div>

    <!-- No team -->
    <div v-else-if="!teamStore.team">
      <NtiEmptyState
        :icon="Users"
        title="Nemáte tím"
        description="Vytvorte nový tím alebo počkajte na pozvánku od vedúceho tímu."
      >
        <template #actions>
          <button class="btn-primary text-sm" @click="showCreateModal = true">
            <Plus class="size-4" /> Vytvoriť tím
          </button>
        </template>
      </NtiEmptyState>
    </div>

    <!-- Team card -->
    <div v-else>
      <div class="card-nti p-7 mb-5">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h2 class="font-display text-2xl font-bold text-nti-white mb-1">
              {{ teamStore.team.name }}
            </h2>
            <p class="text-xs text-nti-muted font-mono">
              {{ teamStore.team.members.length }} členov · vytvorený
              {{ new Intl.DateTimeFormat('sk-SK').format(new Date(teamStore.team.createdAt)) }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in teamStore.team.skills" :key="skill" class="badge-gray">
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Members -->
        <div class="space-y-2">
          <div
            v-for="member in teamStore.team.members"
            :key="member.userId"
            class="flex items-center gap-4 p-3 rounded-lg bg-nti-surface border border-nti-border"
          >
            <div
              class="size-9 rounded-full bg-nti-dark border border-nti-border flex items-center justify-center shrink-0"
            >
              <span class="text-sm font-bold text-nti-green">
                {{ member.firstName[0] }}{{ member.lastName[0] }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium text-nti-white">
                  {{ member.firstName }} {{ member.lastName }}
                  <span v-if="isMe(member.userId)" class="text-nti-muted font-normal">(vy)</span>
                </p>
                <Crown
                  v-if="isLeader(member.userId)"
                  class="size-3.5 text-yellow-400"
                  title="Vedúci tímu"
                />
              </div>
              <p class="text-xs text-nti-muted">{{ member.email }}</p>
            </div>
            <span class="badge-gray text-xs">{{
              member.role === 'leader' ? 'Vedúci' : 'Člen'
            }}</span>
            <div
              v-if="isLeader(authStore.user?.id ?? -1) && !isLeader(member.userId)"
              class="flex gap-1"
            >
              <button
                class="btn-ghost p-1.5 text-red-400 hover:text-red-300"
                title="Odstrániť"
                @click="handleRemove(member.userId, `${member.firstName} ${member.lastName}`)"
              >
                <Trash2 class="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Leave team -->
      <div v-if="!isLeader(authStore.user?.id ?? -1)">
        <button class="btn-ghost text-sm text-red-400 hover:text-red-300" @click="handleLeave">
          <LogOut class="size-4" /> Opustiť tím
        </button>
      </div>
    </div>

    <!-- ── Create team modal ─────────────────────────────────────────── -->
    <NtiModal
      v-if="showCreateModal"
      title="Vytvoriť nový tím"
      size="sm"
      @close="showCreateModal = false"
    >
      <form class="space-y-4" novalidate @submit.prevent="onCreateTeam">
        <div>
          <label for="teamName" class="label-nti">Názov tímu</label>
          <input
            id="teamName"
            v-model="teamName"
            v-bind="teamNameAttrs"
            type="text"
            class="input-nti"
            :class="{ error: createForm.errors.value.name }"
            placeholder="napr. ByteForge Team"
          />
          <p v-if="createForm.errors.value.name" class="mt-1 text-xs text-red-400">
            {{ createForm.errors.value.name }}
          </p>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" class="btn-outline text-sm" @click="showCreateModal = false">
            Zrušiť
          </button>
          <button
            type="submit"
            class="btn-primary text-sm"
            :disabled="createForm.isSubmitting.value"
          >
            <Loader2 v-if="createForm.isSubmitting.value" class="size-3.5 animate-spin" />
            <template v-else>Vytvoriť tím</template>
          </button>
        </div>
      </form>
    </NtiModal>

    <!-- ── Invite modal ──────────────────────────────────────────────── -->
    <NtiModal
      v-if="showInviteModal"
      title="Pozvať člena"
      size="sm"
      @close="showInviteModal = false"
    >
      <form class="space-y-4" novalidate @submit.prevent="onInvite">
        <div>
          <label for="inviteEmail" class="label-nti">E-mail člena</label>
          <div class="relative">
            <Mail
              class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-nti-muted pointer-events-none"
            />
            <input
              id="inviteEmail"
              v-model="inviteEmail"
              v-bind="inviteEmailAttrs"
              type="email"
              class="input-nti pl-10"
              :class="{ error: inviteForm.errors.value.email }"
              placeholder="clen@email.sk"
            />
          </div>
          <p v-if="inviteForm.errors.value.email" class="mt-1 text-xs text-red-400">
            {{ inviteForm.errors.value.email }}
          </p>
          <p class="mt-1.5 text-xs text-nti-muted">
            Pozvaná osoba musí mať registrovaný účet v NTI portáli.
          </p>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button type="button" class="btn-outline text-sm" @click="showInviteModal = false">
            Zrušiť
          </button>
          <button
            type="submit"
            class="btn-primary text-sm"
            :disabled="inviteForm.isSubmitting.value"
          >
            <Loader2 v-if="inviteForm.isSubmitting.value" class="size-3.5 animate-spin" />
            <template v-else> <Mail class="size-3.5" /> Odoslať pozvánku </template>
          </button>
        </div>
      </form>
    </NtiModal>
  </div>
</template>
