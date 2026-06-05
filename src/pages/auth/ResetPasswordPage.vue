<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Loader2, CheckCircle, Eye, EyeOff } from 'lucide-vue-next';
  import AuthService from '@/services/auth.service';

  const route = useRoute();
  const token = (route.query['token'] as string) ?? '';
  const emailFromQuery = (route.query['email'] as string) ?? '';

  const success = ref(false);
  const serverError = ref<string | null>(null);
  const showPassword = ref(false);
  const showConfirm = ref(false);

  const schema = z
    .object({
      password: z.string().min(8, 'Heslo musí mať aspoň 8 znakov'),
      passwordConfirmation: z.string().min(1, 'Potvrďte heslo'),
    })
    .refine((d) => d.password === d.passwordConfirmation, {
      message: 'Heslá sa nezhodujú',
      path: ['passwordConfirmation'],
    });

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const [password, passwordAttrs] = defineField('password');
  const [passwordConfirmation, passwordConfirmationAttrs] = defineField('passwordConfirmation');

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = null;
    try {
      await AuthService.resetPassword(token, values.password, values.passwordConfirmation);
      success.value = true;
    } catch (err: unknown) {
      serverError.value =
        err instanceof Error ? err.message : 'Platnosť odkazu vypršala. Požiadajte o nový.';
    }
  });
</script>

<template>
  <div class="card-nti p-8">
    <div v-if="success" class="text-center py-4">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-xl font-bold text-nti-white mb-2">Heslo zmenené!</h2>
      <p class="text-sm text-nti-gray mb-6">Môžete sa prihlásiť s novým heslom.</p>
      <RouterLink :to="{ name: 'login' }" class="btn-primary">Prihlásiť sa</RouterLink>
    </div>

    <template v-else>
      <div class="mb-7">
        <p class="font-mono text-xs text-nti-green mb-1">// Obnovenie hesla</p>
        <h1 class="font-display text-2xl font-bold text-nti-white mb-2">Nové heslo</h1>
        <p v-if="emailFromQuery" class="text-sm text-nti-gray">
          Nastavujete heslo pre <span class="text-nti-white">{{ emailFromQuery }}</span>
        </p>
      </div>

      <div
        v-if="!token"
        class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 mb-5"
      >
        Neplatný alebo chýbajúci token. Požiadajte o nový odkaz na obnovenie hesla.
      </div>

      <div
        v-if="serverError"
        class="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 mb-5"
        role="alert"
      >
        {{ serverError }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div>
          <label for="password" class="label-nti">Nové heslo</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              v-bind="passwordAttrs"
              :type="showPassword ? 'text' : 'password'"
              class="input-nti pr-10"
              :class="{ error: errors.password }"
              placeholder="Min. 8 znakov"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray transition-colors"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
          <p v-if="errors.password" class="mt-1 text-xs text-red-400">{{ errors.password }}</p>
        </div>

        <div>
          <label for="passwordConfirmation" class="label-nti">Potvrdiť heslo</label>
          <div class="relative">
            <input
              id="passwordConfirmation"
              v-model="passwordConfirmation"
              v-bind="passwordConfirmationAttrs"
              :type="showConfirm ? 'text' : 'password'"
              class="input-nti pr-10"
              :class="{ error: errors.passwordConfirmation }"
              placeholder="Zadajte heslo znova"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray transition-colors"
              @click="showConfirm = !showConfirm"
            >
              <EyeOff v-if="showConfirm" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
          <p v-if="errors.passwordConfirmation" class="mt-1 text-xs text-red-400">
            {{ errors.passwordConfirmation }}
          </p>
        </div>

        <button
          type="submit"
          class="btn-primary w-full justify-center py-2.5"
          :disabled="isSubmitting || !token"
        >
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>Nastaviť nové heslo</template>
        </button>
      </form>
    </template>
  </div>
</template>
