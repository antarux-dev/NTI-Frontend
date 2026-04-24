<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Program } from '@/stores/nti'

const props = defineProps<{
  program: Program
}>()

const isA = props.program.id === 'A'
</script>

<template>
  <div :class="['prog-card', isA ? 'prog-card--a' : 'prog-card--b']">
    <div class="prog-card__ghost">{{ program.id }}</div>

    <span :class="['prog-card__badge', isA ? 'prog-card__badge--a' : 'prog-card__badge--b']">
      {{ program.badge }}
    </span>

    <h3 class="prog-card__title">{{ program.title }}</h3>
    <p class="prog-card__desc">{{ program.desc }}</p>

    <ul class="prog-card__checks">
      <li v-for="check in program.checks" :key="check" class="prog-card__check-item">
        <svg class="prog-card__check-icon" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l3.5 3.5L12 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {{ check }}
      </li>
    </ul>

    <div class="prog-card__tags">
      <span v-for="tag in program.tags" :key="tag" class="prog-card__tag">{{ tag }}</span>
    </div>

    <RouterLink
      :to="program.route"
      :class="['prog-card__btn', isA ? 'prog-card__btn--a' : 'prog-card__btn--b']"
    >
      {{ program.btnLabel }}
    </RouterLink>
  </div>
</template>

<style scoped>
.prog-card {
  background: #fff;
  padding: 44px 40px;
  position: relative;
}

.prog-card--b {
  border-left: 1px solid var(--gray-20);
}

.prog-card__ghost {
  position: absolute;
  top: 20px;
  right: 30px;
  font-family: 'Fraunces', serif;
  font-size: 88px;
  font-weight: 300;
  color: var(--gray-10);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.prog-card__badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 18px;
}

.prog-card__badge--a {
  background: var(--green-l);
  border: 1px solid var(--green-m);
  color: var(--green-d);
}

.prog-card__badge--b {
  background: var(--blue-l);
  border: 1px solid var(--blue-m);
  color: var(--blue);
}

.prog-card__title {
  font-size: 24px;
  line-height: 1.2;
  color: var(--blue);
  margin-bottom: 12px;
}

.prog-card__desc {
  font-size: 14px;
  color: var(--gray-70);
  line-height: 1.72;
  margin-bottom: 24px;
}

.prog-card__checks {
  list-style: none;
  margin-bottom: 24px;
}

.prog-card__check-item {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  font-size: 13px;
  color: var(--gray-70);
  margin-bottom: 9px;
  line-height: 1.5;
}

.prog-card__check-icon {
  width: 14px;
  height: 14px;
  color: var(--green);
  flex-shrink: 0;
  margin-top: 1px;
}

.prog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 28px;
}

.prog-card__tag {
  font-size: 11px;
  color: var(--gray-50);
  border: 1px solid var(--gray-20);
  border-radius: 4px;
  padding: 3px 9px;
}

.prog-card__btn {
  display: inline-block;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 11px 22px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.18s;
}

.prog-card__btn--a {
  background: var(--green);
  color: #fff;
}

.prog-card__btn--a:hover {
  background: var(--green-d);
}

.prog-card__btn--b {
  background: var(--blue);
  color: #fff;
}

.prog-card__btn--b:hover {
  background: var(--blue-d);
}

@media (max-width: 768px) {
  .prog-card {
    padding: 32px 24px;
  }

  .prog-card--b {
    border-left: none;
    border-top: 1px solid var(--gray-20);
  }
}
</style>
