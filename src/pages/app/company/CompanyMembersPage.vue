<script setup lang="ts">
  import { ref } from 'vue';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Plus, Copy, RefreshCw, Loader2, Trash2, Mail } from 'lucide-vue-next';
  import NtiAlert from '@/components/ui/NtiAlert.vue';
  import NtiModal from '@/components/ui/NtiModal.vue';

  // Placeholder token generation until backend is ready
  const generatedToken = ref<string | null>(null);
  const copied = ref(false);
  const showModal = ref(false);

  function generateToken(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const rand = (n: number) =>
      Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    generatedToken.value = `NTI-${rand(4)}-${rand(4)}-${rand(4)}`;
  }

  async function copyToken(): Promise<void> {
    if (!generatedToken.value) return;
    await navigator.clipboard.writeText(generatedToken.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }

  // Invite by email
  const inviteSchema = z.object({ email: z.string().email('Zadajte platný e-mail') });
  const inviteForm = useForm({ validationSchema: toTypedSchema(inviteSchema) });
  const [inviteEmail, inviteEmailAttrs] = inviteForm.defineField('email');
  const inviteSent = ref(false);

  const onInviteByEmail = inviteForm.handleSubmit(async (_values) => {
    // TODO: API call
    await new Promise((r) => setTimeout(r, 600));
    inviteSent.value = true;
    showModal.value = false;
    inviteForm.resetForm();
    setTimeout(() => {
      inviteSent.value = false;
    }, 4000);
  });

  // Mock members — replace with API
  const members = ref([
    {
      id: 1,
      firstName: 'Admin',
      lastName: 'Firma',
      email: 'admin@firma.sk',
      role: 'admin',
      joinedAt: '2025-01-15',
    },
  ]);

  function formatDate(d: string): string {
    return new Intl.DateTimeFormat('sk-SK').format(new Date(d));
  }
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center justify-between mb-6">
      <div>
        <p class="font-mono text-xs text-nti-green mb-1">// Členovia</p>
        <h1 class="font-display text-xl font-bold text-nti-white">Firemní používatelia</h1>
      </div>
      <button class="btn-primary text-sm" @click="showModal = true">
        <Plus class="size-4" /> Pridať člena
      </button>
    </div>

    <NtiAlert v-if="inviteSent" variant="success" :dismissible="true" class="mb-5">
      Pozvánka bola odoslaná.
    </NtiAlert>

    <!-- Invite token card -->
    <div class="card-nti p-6 mb-5">
      <h2 class="font-display font-semibold text-nti-white mb-2 text-base">
        Vygenerovať invite token
      </h2>
      <p class="text-sm text-nti-gray mb-4 leading-relaxed">
        Token umožňuje novému členovi sa zaregistrovať ako firemný používateľ bez potreby zadávať
        e-mail manuálne. Platnosť tokenu je 7 dní.
      </p>

      <div class="flex items-center gap-3">
        <button class="btn-outline text-sm" @click="generateToken">
          <RefreshCw class="size-3.5" /> Generovať token
        </button>

        <template v-if="generatedToken">
          <code
            class="flex-1 bg-nti-surface border border-nti-border rounded-lg px-3 py-2 font-mono text-sm text-nti-green"
          >
            {{ generatedToken }}
          </code>
          <button
            class="btn-ghost text-sm"
            :class="{ 'text-nti-green': copied }"
            @click="copyToken"
          >
            <Copy class="size-4" />
            {{ copied ? 'Skopírované!' : 'Kopírovať' }}
          </button>
        </template>
      </div>

      <p v-if="generatedToken" class="mt-3 text-xs text-nti-muted">
        Odkaz pre registráciu:
        <span class="text-nti-gray font-mono">
          /auth/registracia/clen?token={{ generatedToken }}
        </span>
      </p>
    </div>

    <!-- Members list -->
    <div class="card-nti overflow-hidden">
      <div class="px-5 py-3 border-b border-nti-border">
        <p class="font-mono text-xs text-nti-muted">{{ members.length }} používateľov</p>
      </div>
      <div class="divide-y divide-nti-border">
        <div v-for="m in members" :key="m.id" class="flex items-center gap-4 p-4">
          <div
            class="size-9 rounded-full bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
          >
            <span class="text-sm font-bold text-nti-green">
              {{ m.firstName[0] }}{{ m.lastName[0] }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-nti-white">{{ m.firstName }} {{ m.lastName }}</p>
            <p class="text-xs text-nti-muted">{{ m.email }} · od {{ formatDate(m.joinedAt) }}</p>
          </div>
          <span class="badge-gray text-xs">{{ m.role === 'admin' ? 'Admin' : 'Člen' }}</span>
          <button v-if="members.length > 1" class="btn-ghost p-1.5 text-red-400 hover:text-red-300">
            <Trash2 class="size-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Invite modal -->
    <NtiModal v-if="showModal" title="Pozvať člena e-mailom" size="sm" @close="showModal = false">
      <form class="space-y-4" novalidate @submit.prevent="onInviteByEmail">
        <div>
          <label for="inviteEmail" class="label-nti">E-mail nového člena</label>
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
              placeholder="kolega@firma.sk"
            />
          </div>
          <p v-if="inviteForm.errors.value.email" class="mt-1 text-xs text-red-400">
            {{ inviteForm.errors.value.email }}
          </p>
        </div>
        <div class="flex justify-end gap-3">
          <button type="button" class="btn-outline text-sm" @click="showModal = false">
            Zrušiť
          </button>
          <button
            type="submit"
            class="btn-primary text-sm"
            :disabled="inviteForm.isSubmitting.value"
          >
            <Loader2 v-if="inviteForm.isSubmitting.value" class="size-3.5 animate-spin" />
            <template v-else><Mail class="size-3.5" /> Odoslať pozvánku</template>
          </button>
        </div>
      </form>
    </NtiModal>
  </div>
</template>
