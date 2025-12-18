<script setup>
import goodsReservationGoods from '../data/goodsReservationGoods.json'
import goodsReservationMedia from '../data/goodsReservationMedia.json'

const parseDateMs = (value) => {
  const t = new Date(value || '').getTime()
  return Number.isFinite(t) && t > 0 ? t : Number.POSITIVE_INFINITY
}

const buildGrouped = (source) =>
  source
    .flatMap((group) => {
      const variants = (group.variants || [])
        .map((variant) => ({
          ...variant,
          productTitle: group.title,
          url: variant.url || variant.link || '',
          expiresMs: parseDateMs(variant.expiresAt),
        }))
        .filter((variant) => variant.expiresMs === Number.POSITIVE_INFINITY || variant.expiresMs >= Date.now())

      return {
        title: group.title,
        brand: group.brand,
        variants,
      }
    })
    .filter((group) => group.variants.length > 0)

const sections = [
  { key: 'goods', title: 'グッズ予約情報', groups: buildGrouped(goodsReservationGoods) },  
  { key: 'media', title: '映像/書籍予約情報', groups: buildGrouped(goodsReservationMedia) }
]
</script>

<template>
  <div class="reservation-section">

    <div class="space-y-6">
      <div class="mt-6" v-for="section in sections" :key="section.key">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">
            ⏱
          </div>
          <h3 class="text-lg md:text-xl font-semibold">{{ section.title }}</h3>
          <span v-if="!section.groups.length" class="text-xs text-muted-foreground">現在ありません</span>
        </div>

        <div v-if="section.groups.length" class="overflow-x-auto rounded-lg p-3 bg-card/60">
          <table class="w-full text-base md:text-lg border-collapse">
            <thead class="bg-card">
              <tr class="text-left border-b border-foreground/50">
                <th class="py-2 px-3 whitespace-nowrap">商品概要</th>
                <!-- <th class="py-2 px-3 whitespace-nowrap">予約開始</th> -->
                <th class="py-2 px-3 whitespace-nowrap">予約締切</th>
                <th class="py-2 px-3 whitespace-nowrap">発売日</th>
                <th class="py-2 px-3">概要/備考</th>
                <th class="py-2 px-3 whitespace-nowrap">リンク</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="group in section.groups" :key="group.title">
                <template v-if="group.variants.length === 1">
                  <tr class="border-b border-muted/40 last:border-b-0 row-equal-height">
                    <td class="py-2 px-3 whitespace-nowrap">
                      <div class="font-semibold">{{ group.title }}</div>
                      <div v-if="group.brand" class="text-xs text-muted-foreground mt-1">{{ group.brand }}</div>
                    </td>
                    <!-- <td class="py-2 px-3 whitespace-nowrap">{{ group.variants[0].reserveFrom || '—' }}</td> -->
                    <td class="py-2 px-3 whitespace-nowrap">{{ group.variants[0].reserveTo || '—' }}</td>
                    <td class="py-2 px-3 whitespace-nowrap">{{ group.variants[0].releaseDate || '—' }}</td>
                    <td class="py-2 px-3">
                      <div>{{ group.variants[0].summary || '—' }}</div>
                      <div v-if="group.variants[0].note" class="text-xs text-muted-foreground mt-1">
                        {{ group.variants[0].note }}
                      </div>
                    </td>
                    <td class="py-2 px-3 whitespace-nowrap">
                      <a
                        v-if="group.variants[0].url"
                        class="reservation-link"
                        :href="group.variants[0].url"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span>詳細リンク</span>
                      </a>
                      <span v-else class="reservation-placeholder">—</span>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr class="group-row">
                    <td class="py-2 px-3 font-semibold" colspan="5">
                      <div class="font-semibold">{{ group.title }}</div>
                      <div v-if="group.brand" class="text-xs text-muted-foreground mt-1">{{ group.brand }}</div>
                    </td>
                  </tr>
                  <tr
                    v-for="variant in group.variants"
                    :key="`${group.title}-${variant.label || variant.url || variant.summary}`"
                    class="child-row row-equal-height"
                  >
                    <td class="py-2 px-3 whitespace-nowrap">
                      <span class="text-muted-foreground mr-2">└ </span>
                      <span>{{ variant.variation || variant.label || '通常' }}</span>
                      <span v-if="group.brand" class="text-xs text-muted-foreground ml-1">/ {{ group.brand }}</span>
                    </td>
                    <!-- <td class="py-2 px-3 whitespace-nowrap">{{ variant.reserveFrom || '—' }}</td> -->
                    <td class="py-2 px-3 whitespace-nowrap">{{ variant.reserveTo || '—' }}</td>
                    <td class="py-2 px-3 whitespace-nowrap">{{ variant.releaseDate || '—' }}</td>
                    <td class="py-2 px-3">
                      <div>{{ variant.summary || '—' }}</div>
                      <div v-if="variant.note" class="text-xs text-muted-foreground mt-1">
                        {{ variant.note }}
                      </div>
                    </td>
                    <td class="py-2 px-3 whitespace-nowrap">
                      <a
                        v-if="variant.url"
                        class="reservation-link"
                        :href="variant.url"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span>詳細リンク</span>
                      </a>
                      <span v-else class="reservation-placeholder">—</span>
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservation-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(15, 255, 136, 0.45);
  background: rgba(26, 26, 46, 0.9);
  color: inherit;
  font-size: 0.8rem;
  transition: color 120ms ease, border-color 120ms ease, background-color 120ms ease;
  white-space: nowrap;
}

.reservation-link:hover {
  color: var(--primary);
  border-color: var(--primary);
  background: rgba(255, 0, 110, 0.12);
}

.reservation-link span:first-of-type {
  font-size: 0.9rem;
}

.reservation-link {
  border-radius: 9999px;
}

.group-row {
  background: rgba(15, 255, 136, 0.06);
}

.child-row {
  border-bottom: 1px solid rgba(15, 255, 136, 0.65);
  border-top: 1px solid rgba(15, 255, 136, 0.65);
}

.child-row:last-of-type {
  border-bottom: 1px solid rgba(15, 255, 136, 0.9);
}

.row-equal-height td {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.reservation-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  font-size: 0.8rem;
  color: var(--muted-foreground);
}
</style>
