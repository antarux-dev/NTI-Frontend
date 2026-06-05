<script setup lang="ts">
  import { ref, onErrorCaptured } from 'vue';
  import { RouterView } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import ToastContainer from '@/components/ui/ToastContainer.vue';
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
  import { AlertCircle } from 'lucide-vue-next';

  const authStore = useAuthStore();
  const globalError = ref<string | null>(null);

  onErrorCaptured((err: Error) => {
    console.error('[NTI] Uncaught error:', err);
    globalError.value = err.message ?? 'Nastala neočakávaná chyba.';
    return false;
  });
</script>

<template>
  <!-- Global error boundary -->
  <div
    v-if="globalError"
    class="fixed inset-0 z-[9999] bg-nti-black flex items-center justify-center p-6"
  >
    <div class="card-nti p-10 max-w-md text-center">
      <AlertCircle class="size-12 text-red-400 mx-auto mb-4" />
      <h1 class="font-display text-xl font-bold text-nti-white mb-2">Niečo sa pokazilo</h1>
      <p class="text-sm text-nti-gray mb-6">{{ globalError }}</p>
      <button
        class="btn-primary"
        @click="
          globalError = null;
          window.location.reload();
        "
      >
        Obnoviť stránku
      </button>
    </div>
  </div>

  <!-- App init loading -->
  <div
    v-else-if="authStore.token && !authStore.user && authStore.loading"
    class="fixed inset-0 z-50 bg-nti-black flex items-center justify-center"
  >
    <div class="flex flex-col items-center gap-4">
      <span class="font-display text-2xl font-bold text-nti-white">
        NTI<span class="text-nti-green">.</span>
      </span>
      <div
        class="size-6 rounded-full border-2 border-nti-green border-t-transparent animate-spin"
      />
    </div>
  </div>

  <!-- Main app -->
  <template v-else>
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </template>

  <ToastContainer />
  <ConfirmDialog />
</template>
