<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { Loader2, CheckCircle, ArrowLeft, Mail } from 'lucide-vue-next';
  import AuthService from '@/services/auth.service';

  const success = ref(false);
  const serverError = ref<string | null>(null);

  const schema = z.object({
    email: z.string().email('Zadajte platný e-mail'),
  });

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const [email, emailAttrs] = defineField('email');

  const onSubmit = handleSubmit(async (values) => {
    serverError.value = null;
    try {
      await AuthService.requestPasswordReset(values.email);
      success.value = true;
    } catch (err: unknown) {
      serverError.value = err instanceof Error ? err.message : 'Nastala chyba. Skúste to znova.';
    }
  });
</script>

<template>
  <div class="card-nti p-8">
    <!-- Success -->
    <div v-if="success" class="text-center py-4">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h2 class="font-display text-xl font-bold text-nti-white mb-2">Skontrolujte e-mail</h2>
      <p class="text-sm text-nti-gray mb-6 leading-relaxed">
        Ak zadaná adresa existuje v systéme, odoslali sme vám odkaz na obnovenie hesla. Platí 60
        minút.
      </p>
      <RouterLink :to="{ name: 'login' }" class="btn-primary"> Späť na prihlásenie </RouterLink>
    </div>

    <template v-else>
      <div class="mb-7">
        <p class="font-mono text-xs text-nti-green mb-1">// Obnovenie hesla</p>
        <h1 class="font-display text-2xl font-bold text-nti-white mb-2">Zabudnuté heslo</h1>
        <p class="text-sm text-nti-gray leading-relaxed">
          Zadajte svoju e-mailovú adresu a pošleme vám odkaz na nastavenie nového hesla.
        </p>
      </div>

      <!-- Error -->
      <div
        v-if="serverError"
        class="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
        role="alert"
      >
        {{ serverError }}
      </div>

      <form class="space-y-5" novalidate @submit.prevent="onSubmit">
        <div>
          <label for="email" class="label-nti">E-mail</label>
          <div class="relative">
            <Mail
              class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-nti-muted pointer-events-none"
            />
            <input
              id="email"
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              class="input-nti pl-10"
              :class="{ error: errors.email }"
              placeholder="vas@email.sk"
              autocomplete="email"
            />
          </div>
          <p v-if="errors.email" class="mt-1.5 text-xs text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <button
          type="submit"
          class="btn-primary w-full justify-center py-2.5"
          :disabled="isSubmitting"
        >
          <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
          <template v-else>Odoslať odkaz na obnovenie</template>
        </button>
      </form>

      <div class="mt-6 pt-5 border-t border-nti-border">
        <RouterLink :to="{ name: 'login' }" class="btn-ghost text-sm w-full justify-center">
          <ArrowLeft class="size-4" />
          Späť na prihlásenie
        </RouterLink>
      </div>
    </template>
  </div>
</template>
