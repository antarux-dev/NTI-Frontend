<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';
  import { Loader2, CheckCircle, XCircle } from 'lucide-vue-next';
  import AuthService from '@/services/auth.service';

  const route = useRoute();
  const status = ref<'loading' | 'success' | 'error'>('loading');

  onMounted(async () => {
    const id = route.params['id'] as string;
    const hash = route.params['hash'] as string;
    try {
      await AuthService.verifyEmail(id, hash);
      status.value = 'success';
    } catch {
      status.value = 'error';
    }
  });
</script>

<template>
  <div class="card-nti p-10 text-center">
    <!-- Loading -->
    <div v-if="status === 'loading'">
      <Loader2 class="size-10 text-nti-green animate-spin mx-auto mb-4" />
      <p class="text-nti-gray text-sm">Overujeme váš e-mail...</p>
    </div>

    <!-- Success -->
    <div v-else-if="status === 'success'">
      <CheckCircle class="size-12 text-nti-green mx-auto mb-4" />
      <h1 class="font-display text-2xl font-bold text-nti-white mb-2">E-mail overený!</h1>
      <p class="text-nti-gray text-sm mb-6">Váš účet je aktívny. Môžete sa prihlásiť.</p>
      <RouterLink :to="{ name: 'login' }" class="btn-primary">Prihlásiť sa</RouterLink>
    </div>

    <!-- Error -->
    <div v-else>
      <XCircle class="size-12 text-red-400 mx-auto mb-4" />
      <h1 class="font-display text-2xl font-bold text-nti-white mb-2">Overenie zlyhalo</h1>
      <p class="text-nti-gray text-sm mb-6">
        Odkaz je neplatný alebo vypršal. Skúste sa prihlásiť — systém vám pošle nový overovací
        e-mail.
      </p>
      <RouterLink :to="{ name: 'login' }" class="btn-outline">Späť na prihlásenie</RouterLink>
    </div>
  </div>
</template>
