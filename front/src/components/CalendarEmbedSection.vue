<script setup>
import { computed, ref } from 'vue'

const calendars = [
  {
    id: 'release',
    title: '発売・情報公開',
    cid: 'ZGIwNDYzYzgzZWQ2OGNiMjEwMjY5NDNlMmFiMTM0ZDUxNDhiNzIyMzZlZmNlMjRkNmJkNjc3ODJkYTNhNWQ5NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
  },
  {
    id: 'popup',
    title: 'イベント・ポップアップ情報',
    cid: 'MTQwYjZmOWI0Mjk1MzlmMGVmYjcwNmE0MTQ1NjFlOTM4MjQxMjZmMTg2NzRlMDM5ZmVjNmEyZWFhMmZlZmI0N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
  },
  {
    id: 'goods',
    title: 'グッズ予約',
    cid: 'OGExMGIyM2MzNWZkZDQ5YzkyZDgyZDRkNGM4YTJiZDA0MjA0OTY5NTAzMjU0NjE0MGNiNDkzNTg1YmMyOTExMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t',
  },
]

const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

const decodeBase64 = (input) => {
  let str = ''
  let i = 0
  let enc1
  let enc2
  let enc3
  let enc4
  let chr1
  let chr2
  let chr3
  const sanitized = input.replace(/[^A-Za-z0-9+/=]/g, '')

  while (i < sanitized.length) {
    enc1 = base64Chars.indexOf(sanitized.charAt(i++))
    enc2 = base64Chars.indexOf(sanitized.charAt(i++))
    enc3 = base64Chars.indexOf(sanitized.charAt(i++))
    enc4 = base64Chars.indexOf(sanitized.charAt(i++))

    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4

    str += String.fromCharCode(chr1)

    if (enc3 !== 64) {
      str += String.fromCharCode(chr2)
    }
    if (enc4 !== 64) {
      str += String.fromCharCode(chr3)
    }
  }

  return str
}

const decodedCalendars = calendars.map((item) => ({
  ...item,
  decodedCid: decodeBase64(item.cid),
}))

const selectedCalendars = ref([decodedCalendars[0]?.id].filter(Boolean))

const embedSrc = computed(() => {
  const activeCalendars = decodedCalendars.filter((item) => selectedCalendars.value.includes(item.id))
  if (!activeCalendars.length) {
    return ''
  }
  const calendarParams = activeCalendars.map((item) => `src=${encodeURIComponent(item.decodedCid)}`).join('&')
  const displayParams =
    '&ctz=Asia%2FTokyo&mode=MONTH&showTitle=0&showPrint=0&showTabs=1&showCalendars=0&showDate=1&height=900'
  return `https://calendar.google.com/calendar/embed?${calendarParams}${displayParams}`
})
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
      <label
        v-for="item in decodedCalendars"
        :key="item.id"
        class="flex items-center gap-2 cursor-pointer"
      >
        <input type="checkbox" v-model="selectedCalendars" :value="item.id" style="accent-color: var(--primary)" />
        <span class="text-sm font-medium">{{ item.title }}</span>
      </label>
    </div>
    <div class="h-2"></div>

    <div v-if="embedSrc">
      <iframe
        class="w-full border-2 border-muted rounded"
        style="border: 0"
        height="900"
        :src="embedSrc"
        frameborder="0"
        scrolling="no"
        loading="lazy"
      ></iframe>
    </div>
    <p v-else class="text-sm text-muted-foreground">表示するカレンダーを選択してください。</p>
  </div>
</template>
