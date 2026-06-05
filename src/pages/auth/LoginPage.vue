<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter, useRoute, RouterLink } from 'vue-router';
  import { useForm } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';
  import { useAuthStore } from '@/stores/auth';
  import { Eye, EyeOff, Loader2 } from 'lucide-vue-next';

  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();
  const showPassword = ref(false);

  const schema = z.object({
    email: z.string().min(1, 'E-mail je povinný').email('Zadajte platný e-mail'),
    password: z.string().min(1, 'Heslo je povinné'),
  });

  const { handleSubmit, errors, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const [email, emailAttrs] = defineField('email');
  const [password, passwordAttrs] = defineField('password');

  const onSubmit = handleSubmit(async (values) => {
    await authStore.login(values);
    const redirect = route.query.redirect as string | undefined;
    await router.push(redirect ?? { name: 'dashboard' });
  });
</script>

<template>
  <div class="card-nti p-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="font-display text-2xl font-bold text-nti-white mb-2">Prihlásenie</h1>
      <p class="text-sm text-nti-gray">
        Nemáte účet?
        <RouterLink
          :to="{ name: 'register' }"
          class="text-nti-green hover:text-nti-green-light transition-colors"
        >
          Zaregistrujte sa
        </RouterLink>
      </p>
    </div>

    <!-- Error banner -->
    <div
      v-if="authStore.error"
      class="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
      role="alert"
    >
      {{ authStore.error }}
    </div>

    <!-- Form -->
    <form class="space-y-5" novalidate @submit.prevent="onSubmit">
      <!-- Email -->
      <div>
        <label for="email" class="label-nti">E-mail</label>
        <input
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          class="input-nti"
          :class="{ error: errors.email }"
          placeholder="vas@email.sk"
          autocomplete="email"
        />
        <p v-if="errors.email" class="mt-1.5 text-xs text-red-400">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="label-nti">Heslo</label>
        <div class="relative">
          <input
            id="password"
            v-model="password"
            v-bind="passwordAttrs"
            :type="showPassword ? 'text' : 'password'"
            class="input-nti pr-10"
            :class="{ error: errors.password }"
            placeholder="••••••••"
            autocomplete="current-password"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-nti-muted hover:text-nti-gray transition-colors"
            :aria-label="showPassword ? 'Skryť heslo' : 'Zobraziť heslo'"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="size-4" />
            <Eye v-else class="size-4" />
          </button>
        </div>
        <p v-if="errors.password" class="mt-1.5 text-xs text-red-400">
          {{ errors.password }}
        </p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="btn-primary w-full justify-center py-2.5"
        :disabled="isSubmitting"
      >
        <Loader2 v-if="isSubmitting" class="size-4 animate-spin" />
        <template v-else>Prihlásiť sa</template>
      </button>
      <div class="flex justify-end mt-1">
        <RouterLink
          :to="{ name: 'forgot-password' }"
          class="text-xs text-nti-muted hover:text-nti-gray transition-colors"
        >
          Zabudli ste heslo?
        </RouterLink>
      </div>
    </form>
  </div>
</template>
