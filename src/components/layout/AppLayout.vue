<script setup lang="ts">
  import { computed } from 'vue';
  import { RouterView, RouterLink, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import {
    LayoutDashboard,
    FileText,
    Users,
    User,
    Briefcase,
    LogOut,
    Rocket,
    Bell,
  } from 'lucide-vue-next';

  const authStore = useAuthStore();
  const router = useRouter();

  interface NavItem {
    label: string;
    to: string;
    name: string;
    icon: typeof LayoutDashboard;
  }

  const studentNav: NavItem[] = [
    { label: 'Dashboard', to: '/app', name: 'dashboard', icon: LayoutDashboard },
    { label: 'Prihlášky', to: '/app/prihlasenia', name: 'student-applications', icon: FileText },
    { label: 'Môj tím', to: '/app/tim', name: 'student-team', icon: Users },
    { label: 'Výzvy', to: '/programy/vyzvy', name: 'challenges', icon: Rocket },
    { label: 'Profil', to: '/app/profil', name: 'student-profile', icon: User },
  ];

  const companyNav: NavItem[] = [
    { label: 'Dashboard', to: '/app', name: 'dashboard', icon: LayoutDashboard },
    { label: 'Projekty', to: '/app/projekty', name: 'company-projects', icon: Briefcase },
    { label: 'Členovia', to: '/app/clenovia', name: 'company-members', icon: Users },
    { label: 'Profil firmy', to: '/app/profil-firmy', name: 'company-profile', icon: Briefcase },
  ];

  const navItems = computed(() => (authStore.isCompany ? companyNav : studentNav));

  async function handleLogout(): Promise<void> {
    await authStore.logout();
    await router.push({ name: 'home' });
  }
</script>

<template>
  <div class="flex min-h-screen bg-nti-black">
    <!-- Sidebar -->
    <aside class="w-60 bg-nti-dark border-r border-nti-border flex flex-col shrink-0">
      <!-- Logo -->
      <div class="h-16 flex items-center px-5 border-b border-nti-border shrink-0">
        <RouterLink to="/" class="font-display text-lg font-bold text-nti-white tracking-tight">
          NTI<span class="text-nti-green">.</span>
        </RouterLink>
        <span class="ml-auto font-mono text-xs text-nti-muted">
          {{ authStore.isCompany ? 'firma' : 'student' }}
        </span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-nti-gray hover:text-nti-white hover:bg-white/5 transition-colors"
          active-class="!text-nti-green !bg-nti-green-dim"
        >
          <component :is="item.icon" class="size-4 shrink-0" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Bottom -->
      <div class="border-t border-nti-border p-3 space-y-1">
        <button class="btn-ghost w-full justify-start text-sm gap-3 px-3">
          <Bell class="size-4" />
          Notifikácie
        </button>
        <div class="flex items-center gap-3 px-3 py-2">
          <div
            class="size-7 rounded-full bg-nti-surface border border-nti-border flex items-center justify-center shrink-0"
          >
            <User class="size-3.5 text-nti-gray" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-nti-white truncate">
              {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </p>
            <p class="text-xs text-nti-muted truncate">{{ authStore.user?.email }}</p>
          </div>
        </div>
        <button
          class="btn-ghost w-full justify-start text-sm gap-3 px-3 text-red-400 hover:text-red-300"
          @click="handleLogout"
        >
          <LogOut class="size-4" />
          Odhlásiť sa
        </button>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <header
        class="h-16 border-b border-nti-border flex items-center px-6 shrink-0 bg-nti-dark/60"
      >
        <p class="font-mono text-xs text-nti-muted">NTI Portál</p>
      </header>
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
