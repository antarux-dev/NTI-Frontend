<script setup lang="ts">
  import { ref } from 'vue';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Loader2, Save, Eye, EyeOff, Shield, Trash2, Download } from 'lucide-vue-next';
  import { useAuthStore } from '@/stores/auth';
  import { useConfirm } from '@/composables/useConfirm';
  import NtiAlert from '@/components/ui/NtiAlert.vue';
  import apiClient from '@/utils/http';

  const authStore = useAuthStore();
  const { confirm } = useConfirm();

  const showCurrent = ref(false);
  const showNew = ref(false);
  const showConfirm = ref(false);
  const pwSuccess = ref(false);
  const pwError = ref<string | null>(null);

  const pwSchema = z
    .object({
      currentPassword: z.string().min(1, 'Zadajte aktuálne heslo'),
      newPassword: z.string().min(8, 'Nové heslo musí mať aspoň 8 znakov'),
      newPasswordConfirm: z.string().min(1, 'Potvrďte nové heslo'),
    })
    .refine((d) => d.newPassword === d.newPasswordConfirm, {
      message: 'Heslá sa nezhodujú',
      path: ['newPasswordConfirm'],
    });

  const { handleSubmit, errors, defineField, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(pwSchema),
  });
  const [currentPassword, currentPasswordAttrs] = defineField('currentPassword');
  const [newPassword, newPasswordAttrs] = defineField('newPassword');
  const [newPasswordConfirm, newPasswordConfirmAttrs] = defineField('newPasswordConfirm');

  const onChangePassword = handleSubmit(async (values) => {
    pwError.value = null;
    try {
      await apiClient.post('/auth/password/change', {
        current_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.newPasswordConfirm,
      });
      pwSuccess.value = true;
      resetForm();
      setTimeout(() => {
        pwSuccess.value = false;
      }, 4000);
    } catch (err: unknown) {
      pwError.value = err instanceof Error ? err.message : 'Zmena hesla zlyhala.';
    }
  });

  async function handleDeleteAccount(): Promise<void> {
    const ok = await confirm({
      title: 'Zmazať účet',
      message:
        'Táto akcia je nevratná. Všetky vaše dáta budú natrvalo vymazané. Naozaj chcete pokračovať?',
      confirmLabel: 'Zmazať účet',
      cancelLabel: 'Zrušiť',
      variant: 'danger',
    });
    if (ok) {
      try {
        await apiClient.delete('/auth/account');
        await authStore.logout();
      } catch {
        /* handled */
      }
    }
  }

  async function handleDataExport(): Promise<void> {
    try {
      const response = await apiClient.get('/auth/data-export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data as BlobPart]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nti-moje-data.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      /* handled */
    }
  }
</script>

<template>
  <div class="max-w-2xl space-y-5">
    <div class="mb-2">
      <p class="font-mono text-xs text-nti-green mb-1">// Nastavenia</p>
      <h1 class="font-display text-xl font-bold text-nti-white">Nastavenia účtu</h1>
    </div>

    <!-- Account info -->
    <div class="card-nti p-6">
      <h2 class="font-display font-semibold text-nti-white mb-4">Informácie o účte</h2>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between py-2 border-b border-nti-border">
          <span class="text-nti-muted">E-mail</span>
          <span class="text-nti-white">{{ authStore.user?.email }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-nti-border">
          <span class="text-nti-muted">Typ účtu</span>
          <span class="text-nti-white capitalize">{{ authStore.user?.accountType }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="text-nti-muted">Stav</span>
          <span class="badge-green text-xs">{{ authStore.user?.status }}</span>
        </div>
      </div>
    </div>

    <!-- Change password -->
    <div class="card-nti p-6">
      <h2 class="font-display font-semibold text-nti-white mb-1 flex items-center gap-2">
        <Shield class="size-4 text-nti-green" /> Zmena hesla
      </h2>
      <p class="text-xs text-nti-gray mb-5">Pre zmenu hesla zadajte aktuálne a nové heslo.</p>

      <NtiAlert v-if="pwSuccess" variant="success" :dismissible="true" class="mb-4"
        >Heslo bolo úspešne zmenené.</NtiAlert
      >
      <NtiAlert v-if="pwError" variant="error" :dismissible="true" class="mb-4">{{
        pwError
      }}</NtiAlert>

      <form class="space-y-4" novalidate @submit.prevent="onChangePassword">
        <div>
          <label for="currentPassword" class="label-nti">Aktuálne heslo</label>
          <div class="relative">
            <input
              id="currentPassword"
              v-model="currentPassword"
              v-bind="currentPasswordAttrs"
              :type="showCurrent ? 'text' : 'password'"
              class="input-nti pr-10"
              :class="{ error: errors.currentPassword }"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray"
              @click="showCurrent = !showCurrent"
            >
              <EyeOff v-if="showCurrent" class="size-4" /><Eye v-else class="size-4" />
            </button>
          </div>
          <p v-if="errors.currentPassword" class="mt-1 text-xs text-red-400">
            {{ errors.currentPassword }}
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="newPassword" class="label-nti">Nové heslo</label>
            <div class="relative">
              <input
                id="newPassword"
                v-model="newPassword"
                v-bind="newPasswordAttrs"
                :type="showNew ? 'text' : 'password'"
                class="input-nti pr-10"
                :class="{ error: errors.newPassword }"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray"
                @click="showNew = !showNew"
              >
                <EyeOff v-if="showNew" class="size-4" /><Eye v-else class="size-4" />
              </button>
            </div>
            <p v-if="errors.newPassword" class="mt-1 text-xs text-red-400">
              {{ errors.newPassword }}
            </p>
          </div>
          <div>
            <label for="newPasswordConfirm" class="label-nti">Potvrdiť heslo</label>
            <div class="relative">
              <input
                id="newPasswordConfirm"
                v-model="newPasswordConfirm"
                v-bind="newPasswordConfirmAttrs"
                :type="showConfirm ? 'text' : 'password'"
                class="input-nti pr-10"
                :class="{ error: errors.newPasswordConfirm }"
                autocomplete="new-password"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray"
                @click="showConfirm = !showConfirm"
              >
                <EyeOff v-if="showConfirm" class="size-4" /><Eye v-else class="size-4" />
              </button>
            </div>
            <p v-if="errors.newPasswordConfirm" class="mt-1 text-xs text-red-400">
              {{ errors.newPasswordConfirm }}
            </p>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" class="btn-primary text-sm" :disabled="isSubmitting">
            <Loader2 v-if="isSubmitting" class="size-3.5 animate-spin" />
            <Save v-else class="size-3.5" />
            Zmeniť heslo
          </button>
        </div>
      </form>
    </div>

    <!-- GDPR -->
    <div class="card-nti p-6">
      <h2 class="font-display font-semibold text-nti-white mb-1">Ochrana osobných údajov (GDPR)</h2>
      <p class="text-xs text-nti-gray mb-5">Máte právo na export alebo vymazanie svojich dát.</p>
      <div class="flex flex-wrap gap-3">
        <button class="btn-outline text-sm" @click="handleDataExport">
          <Download class="size-4" /> Exportovať moje dáta
        </button>
      </div>
    </div>

    <!-- Danger zone -->
    <div class="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
      <h2 class="font-display font-semibold text-red-400 mb-1 flex items-center gap-2">
        <Trash2 class="size-4" /> Nebezpečná zóna
      </h2>
      <p class="text-xs text-nti-gray mb-4">
        Zmazanie účtu je nevratné. Všetky vaše dáta budú trvalo odstránené.
      </p>
      <button
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
        @click="handleDeleteAccount"
      >
        <Trash2 class="size-4" /> Zmazať účet
      </button>
    </div>
  </div>
</template>
