<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const mobileOpen = ref(false);

const navLinks = [
  { label: "O nás", to: "/o-nti" },
  { label: "Programy", to: "/#programy" },
  { label: "Firmy", to: "/#firmy" },
  { label: "Partneri", to: "/#partneri" },
  { label: "Kontakt", to: "/kontakt" },
];
</script>

<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <!-- Logo -->
      <RouterLink to="/" class="navbar__logo">
        <div class="navbar__logo-mark">
          <span class="navbar__logo-sq navbar__logo-sq--white"></span>
          <span class="navbar__logo-sq navbar__logo-sq--green"></span>
          <span class="navbar__logo-sq navbar__logo-sq--green"></span>
          <span class="navbar__logo-sq navbar__logo-sq--white"></span>
        </div>
        <div>
          <div class="navbar__logo-name">NTI</div>
          <div class="navbar__logo-sub">Inkubátor</div>
        </div>
      </RouterLink>

      <!-- Desktop links -->
      <div class="navbar__links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="navbar__link"
          active-class="navbar__link--active"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/kontakt" class="navbar__btn">Prihlásiť sa</RouterLink>
      </div>

      <!-- Mobile toggle -->
      <button class="navbar__toggle" aria-label="Menu" @click="mobileOpen = !mobileOpen">
        <span :class="['navbar__toggle-bar', { 'navbar__toggle-bar--open': mobileOpen }]"></span>
        <span
          :class="['navbar__toggle-bar', { 'navbar__toggle-bar--open-mid': mobileOpen }]"
        ></span>
        <span :class="['navbar__toggle-bar', { 'navbar__toggle-bar--open': mobileOpen }]"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="navbar__mobile">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="navbar__mobile-link"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
      <RouterLink to="/kontakt" class="navbar__mobile-btn" @click="mobileOpen = false">
        Prihlásiť sa
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: var(--blue);
}

.navbar__inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 28px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 11px;
  text-decoration: none;
}

.navbar__logo-mark {
  width: 34px;
  height: 34px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 4px;
  padding: 6px;
}

.navbar__logo-sq {
  border-radius: 2px;
  display: block;
}

.navbar__logo-sq--white {
  background: #fff;
}

.navbar__logo-sq--green {
  background: var(--green);
}

.navbar__logo-name {
  font-family: "DM Sans", sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #fff;
}

.navbar__logo-sub {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.04em;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar__link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  transition: color 0.18s;
}

.navbar__link:hover,
.navbar__link--active {
  color: #fff;
}

.navbar__btn {
  background: var(--green);
  color: #fff;
  font-family: "DM Sans", sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.18s;
}

.navbar__btn:hover {
  background: var(--green-d);
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__toggle-bar {
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition:
    transform 0.2s,
    opacity 0.2s;
  display: block;
}

.navbar__toggle-bar--open-mid {
  opacity: 0;
}

.navbar__mobile {
  background: var(--blue-d);
  padding: 16px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.navbar__mobile-link {
  display: block;
  padding: 10px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.18s;
}

.navbar__mobile-link:hover {
  color: #fff;
}

.navbar__mobile-btn {
  display: inline-block;
  margin-top: 16px;
  background: var(--green);
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  padding: 11px 24px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
}

@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }

  .navbar__toggle {
    display: flex;
  }
}
</style>
