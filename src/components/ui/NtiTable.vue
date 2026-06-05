<script setup lang="ts" generic="T extends Record<string, unknown>">
  import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-vue-next';

  export interface Column<TRow> {
    key: keyof TRow | string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
  }

  interface Props {
    columns: Column<T>[];
    rows: T[];
    sortKey?: string;
    sortDir?: 'asc' | 'desc';
    loading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    rowKey?: keyof T;
  }

  withDefaults(defineProps<Props>(), {
    sortKey: undefined,
    sortDir: 'asc',
    loading: false,
    emptyTitle: 'Žiadne záznamy',
    emptyDescription: undefined,
    rowKey: undefined,
  });

  const emit = defineEmits<{
    sort: [key: string];
    rowClick: [row: T];
  }>();

  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };
</script>

<template>
  <div class="card-nti overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-nti-border bg-nti-surface/60">
            <th
              v-for="col in columns"
              :key="String(col.key)"
              class="px-4 py-3 font-mono text-xs text-nti-gray font-normal"
              :class="[
                alignClass[col.align ?? 'left'],
                col.sortable && 'cursor-pointer select-none hover:text-nti-white',
              ]"
              :style="col.width ? `width: ${col.width}` : undefined"
              @click="col.sortable && emit('sort', String(col.key))"
            >
              <span
                class="flex items-center gap-1.5"
                :class="{
                  'justify-center': col.align === 'center',
                  'justify-end': col.align === 'right',
                }"
              >
                {{ col.label }}
                <template v-if="col.sortable">
                  <ArrowUp
                    v-if="sortKey === String(col.key) && sortDir === 'asc'"
                    class="size-3 text-nti-green"
                  />
                  <ArrowDown
                    v-else-if="sortKey === String(col.key) && sortDir === 'desc'"
                    class="size-3 text-nti-green"
                  />
                  <ArrowUpDown v-else class="size-3 opacity-30" />
                </template>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loading skeleton -->
          <template v-if="loading">
            <tr
              v-for="i in 5"
              :key="i"
              class="border-b border-nti-border last:border-0 animate-pulse"
            >
              <td v-for="col in columns" :key="String(col.key)" class="px-4 py-3">
                <div class="h-4 bg-nti-surface rounded w-3/4" />
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <tr v-else-if="rows.length === 0">
            <td :colspan="columns.length" class="px-4 py-12 text-center">
              <p class="font-display font-semibold text-nti-white mb-1">{{ emptyTitle }}</p>
              <p v-if="emptyDescription" class="text-xs text-nti-gray">{{ emptyDescription }}</p>
            </td>
          </tr>

          <!-- Data rows -->
          <tr
            v-for="(row, i) in rows"
            v-else
            :key="rowKey ? String(row[rowKey]) : i"
            class="border-b border-nti-border last:border-0 hover:bg-white/2 transition-colors"
            :class="{ 'cursor-pointer': $attrs.onRowClick }"
            @click="emit('rowClick', row)"
          >
            <td
              v-for="col in columns"
              :key="String(col.key)"
              class="px-4 py-3 text-nti-gray"
              :class="alignClass[col.align ?? 'left']"
            >
              <slot :name="`cell-${String(col.key)}`" :row="row" :value="row[col.key as keyof T]">
                {{ row[col.key as keyof T] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
