<script setup>
import { computed, ref } from 'vue'

import magazines from '../data/magazines.json'

const filterTitle = ref('all')
const sortOrder = ref('desc')

const magazineOptions = computed(() => ['all', ...new Set(magazines.map((magazine) => magazine.magazine))])

const parseDate = (raw) => {
  const match = raw.match(/(\d{4})[./-](\d{2})[./-](\d{2})/)
  if (match) {
    const [, year, month, day] = match
    return new Date(`${year}-${month}-${day}`)
  }
  return new Date(raw)
}

const displayedMagazines = computed(() => {
  let list = [...magazines]

  if (filterTitle.value !== 'all') {
    list = list.filter((magazine) => magazine.magazine === filterTitle.value)
  }

  list.sort((a, b) => {
    const timeA = parseDate(a.date).getTime()
    const timeB = parseDate(b.date).getTime()
    return sortOrder.value === 'asc' ? timeA - timeB : timeB - timeA
  })

  return list
})
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-secondary border-2 border-foreground flex items-center justify-center">📚</div>
      <h2>掲載誌一覧</h2>
    </div>

    <div class="flex flex-wrap gap-4 mb-4 text-sm">
      <label class="flex items-center gap-2">
        <span class="text-muted-foreground">誌名フィルター:</span>
        <select v-model="filterTitle" class="border border-muted bg-card px-3 py-1">
          <option v-for="option in magazineOptions" :key="option" :value="option">
            {{ option === 'all' ? 'すべて' : option }}
          </option>
        </select>
      </label>

      <label class="flex items-center gap-2">
        <span class="text-muted-foreground">発売日順:</span>
        <select v-model="sortOrder" class="border border-muted bg-card px-3 py-1">
          <option value="desc">新しい順</option>
          <option value="asc">古い順</option>
        </select>
      </label>
    </div>

    <div class="overflow-x-auto mb-6">
      <table class="magazine-table w-full text-sm border-2 border-foreground bg-card">
        <thead class="bg-muted text-sm">
          <tr class="text-left">
            <th class="border-b border-muted px-4 py-4 w-1/4">書名</th>
            <th class="border-b border-muted px-4 py-4 w-1/6">発売日</th>
            <th class="border-b border-muted px-4 py-4">内容／概要</th>
            <th class="border-b border-muted px-4 py-4 w-32">付録・特典</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="magazine in displayedMagazines"
            :key="magazine.id"
            class="border-t border-muted hover:bg-muted/30 transition-colors"
          >
            <td class="px-4 py-3 font-semibold">{{ magazine.title }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ magazine.date }}</td>
            <td class="px-4 py-3 text-muted-foreground">{{ magazine.description }}</td>
            <td class="px-4 py-3 text-muted-foreground">
              <span v-if="magazine.appendix">{{ magazine.appendix }}</span>
              <span v-else class="text-xs text-muted-foreground/70">情報なし</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.magazine-table tr + tr td {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 2;
}

.magazine-table thead th {
  border-bottom: 3px double rgba(255, 255, 255, 0.6) !important;
}
.magazine-table td {
  line-height: 1.6;
}
</style>
