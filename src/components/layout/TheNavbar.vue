<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { Menu, X, ChevronDown, LogIn } from 'lucide-vue-next';
import type { NavItem } from '@/types';

const authStore = useAuthStore();
const mobileOpen = ref(false);
const scrolled = ref(false);
const activeDropdown = ref<string | null>(null);

// Per-item hover timers — prevents flicker when moving mouse between trigger and panel
const closeTimers = new Map<string, ReturnType<typeof setTimeout>>();

const navItems: NavItem[] = [
  {
    label: 'Programy',
    children: [
      { label: 'Prehľad programov',       to: '/programy' },
      { label: 'Program A — Inkubácia',   to: '/programy/program-a' },
      { label: 'Program B — Živá prax',   to: '/programy/program-b' },
      { label: 'Výzvy',                   to: '/programy/vyzvy' },
      { label: 'Podmienky',               to: '/programy/podmienky' },
    ],
  },
  {
    label: 'Pre firmy',
    children: [
      { label: 'Prehľad',               to: '/pre-firmy' },
      { label: 'Ako fungujú projekty',  to: '/pre-firmy/ako-funguju-projekty' },
      { label: 'Partneri',              to: '/pre-firmy/partneri' },
      { label: 'Mentori',              to: '/pre-firmy/mentori' },
    ],
  },
  {
    label: 'O NTI',
    children: [
      { label: 'O nás',      to: '/o-nti' },
      { label: 'Naša misia', to: '/o-nti/nasa-misia' },
      { label: 'FAQ',        to: '/o-nti/faq' },
      { label: 'Novinky',    to: '/o-nti/novinky' },
      { label: 'Kontakt',    to: '/o-nti/kontakt' },
    ],
  },
];

const navbarClass = computed(() =>
  scrolled.value
    ? 'bg-nti-black/95 backdrop-blur-sm border-b border-nti-border shadow-lg'
    : 'bg-transparent',
);

// ── Hover open / close with delay ──────────────────────────────────────────
function openDropdown(label: string): void {
  // Cancel any pending close for this item
  const t = closeTimers.get(label);
  if (t) clearTimeout(t);
  activeDropdown.value = label;
}

function scheduleClose(label: string): void {
  const t = setTimeout(() => {
    if (activeDropdown.value === label) activeDropdown.value = null;
    closeTimers.delete(label);
  }, 120); // 120ms grace period — enough to move mouse to the panel
  closeTimers.set(label, t);
}

// ── Click toggle (also works for keyboard nav) ─────────────────────────────
function toggleDropdown(label: string): void {
  activeDropdown.value = activeDropdown.value === label ? null : label;
}

// Close immediately when a link is clicked
function closeNow(): void {
  activeDropdown.value = null;
}

// Close on click outside
function handleOutsideClick(e: MouseEvent): void {
  const nav = document.getElementById('nti-nav');
  if (nav && !nav.contains(e.target as Node)) {
    activeDropdown.value = null;
  }
}

// Close on Escape
function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    activeDropdown.value = null;
    mobileOpen.value = false;
  }
}

function handleScroll(): void {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('click', handleOutsideClick);
  window.addEventListener('keydown', handleKeydown);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('click', handleOutsideClick);
  window.removeEventListener('keydown', handleKeydown);
  closeTimers.forEach((t) => clearTimeout(t));
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="navbarClass"
  >
    <div class="container-nti">
      <nav
        id="nti-nav"
        class="flex h-16 items-center justify-between"
        aria-label="Hlavná navigácia"
      >
        <!-- ── Logo ──────────────────────────────────────────────────── -->
        <RouterLink
          to="/"
          class="flex items-center gap-2 shrink-0"
          aria-label="NTI — Domov"
          @click="closeNow"
        >
          <span class="font-display text-xl font-bold tracking-tight text-nti-white">
            NTI<span class="text-nti-green">.</span>
          </span>
        </RouterLink>

        <!-- ── Desktop nav ───────────────────────────────────────────── -->
        <div class="hidden md:flex items-center gap-0.5">
          <div
            v-for="item in navItems"
            :key="item.label"
            class="relative"
            @mouseenter="openDropdown(item.label)"
            @mouseleave="scheduleClose(item.label)"
          >
            <!-- Trigger button -->
            <button
              class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="
                activeDropdown === item.label
                  ? 'text-nti-white bg-white/6'
                  : 'text-nti-gray hover:text-nti-white hover:bg-white/5'
              "
              :aria-expanded="activeDropdown === item.label"
              :aria-haspopup="true"
              @click="toggleDropdown(item.label)"
            >
              {{ item.label }}
              <ChevronDown
                class="size-3.5 transition-transform duration-200 shrink-0"
                :class="{ 'rotate-180': activeDropdown === item.label }"
              />
            </button>

            <!-- ── Dropdown panel ──────────────────────────────────── -->
            <Transition name="dropdown">
              <div
                v-if="activeDropdown === item.label && item.children"
                class="absolute top-full left-0 mt-0 pt-2 z-50"
                style="min-width: 220px"
                @mouseenter="openDropdown(item.label)"
                @mouseleave="scheduleClose(item.label)"
              >
                <!-- Invisible bridge between button and panel (prevents gap-triggered close) -->
                <div class="absolute -top-2 left-0 right-0 h-2" />

                <div class="card-nti py-1.5 shadow-xl">
                  <RouterLink
                    v-for="child in item.children"
                    :key="child.label"
                    :to="child.to ?? '#'"
                    class="flex items-center gap-2 px-4 py-2.5 text-sm text-nti-gray hover:text-nti-white hover:bg-white/5 transition-colors"
                    active-class="!text-nti-green !bg-nti-green-dim"
                    @click="closeNow"
                  >
                    <span class="size-1 rounded-full bg-nti-border shrink-0" />
                    {{ child.label }}
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ── Auth CTA ──────────────────────────────────────────────── -->
        <div class="hidden md:flex items-center gap-3">
          <template v-if="authStore.isAuthenticated">
            <RouterLink :to="{ name: 'dashboard' }" class="btn-outline text-sm" @click="closeNow">
              Portál
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink :to="{ name: 'login' }" class="btn-ghost text-sm" @click="closeNow">
              <LogIn class="size-4" />
              Prihlásenie
            </RouterLink>
            <RouterLink :to="{ name: 'register' }" class="btn-primary text-sm" @click="closeNow">
              Registrovať sa
            </RouterLink>
          </template>
        </div>

        <!-- ── Mobile toggle ─────────────────────────────────────────── -->
        <button
          class="md:hidden btn-ghost"
          :aria-label="mobileOpen ? 'Zavrieť menu' : 'Otvoriť menu'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="size-5" />
          <Menu v-else class="size-5" />
        </button>
      </nav>
    </div>

    <!-- ── Mobile menu ───────────────────────────────────────────────── -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-nti-dark border-t border-nti-border max-h-[80vh] overflow-y-auto"
      >
        <div class="container-nti py-4">
          <template v-for="item in navItems" :key="item.label">
            <div class="mb-4">
              <!-- Section label -->
              <p class="px-3 pt-1 pb-2 text-xs font-semibold uppercase tracking-widest text-nti-muted font-mono">
                {{ item.label }}
              </p>
              <!-- Links -->
              <RouterLink
                v-for="child in item.children"
                :key="child.label"
                :to="child.to ?? '#'"
                class="flex items-center gap-3 px-3 py-2.5 text-sm text-nti-gray hover:text-nti-white rounded-lg hover:bg-white/5 transition-colors"
                active-class="!text-nti-green !bg-nti-green-dim"
                @click="mobileOpen = false"
              >
                <span class="size-1 rounded-full bg-nti-border shrink-0" />
                {{ child.label }}
              </RouterLink>
            </div>
          </template>

          <!-- Mobile auth -->
          <div class="pt-3 mt-2 border-t border-nti-border flex flex-col gap-2.5">
            <template v-if="authStore.isAuthenticated">
              <RouterLink
                :to="{ name: 'dashboard' }"
                class="btn-primary w-full justify-center"
                @click="mobileOpen = false"
              >
                Portál
              </RouterLink>
            </template>
            <template v-else>
              <RouterLink
                :to="{ name: 'login' }"
                class="btn-outline w-full justify-center"
                @click="mobileOpen = false"
              >
                <LogIn class="size-4" />
                Prihlásenie
              </RouterLink>
              <RouterLink
                :to="{ name: 'register' }"
                class="btn-primary w-full justify-center"
                @click="mobileOpen = false"
              >
                Registrovať sa
              </RouterLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* ── Dropdown animation ──────────────────────────────────────────────── */
.dropdown-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Mobile menu animation ───────────────────────────────────────────── */
.mobile-menu-enter-active {
  transition: opacity 0.2s ease, max-height 0.28s ease;
  overflow: hidden;
  max-height: 80vh;
}
.mobile-menu-leave-active {
  transition: opacity 0.15s ease, max-height 0.2s ease;
  overflow: hidden;
  max-height: 80vh;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0 !important;
}
</style>