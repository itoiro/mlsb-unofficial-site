<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import worldviewPosts from '../data/worldviewPosts.json'
import { ensureTwitterWidgets } from '../lib/useTwitterWidgets.js'

const sectionRef = ref(null)
const embedsActive = ref(false)
let intersectionObserver
const loadBatchSize = 3
const visibleCount = ref(loadBatchSize)
const visibleWorldview = ref(worldviewPosts.slice(0, visibleCount.value))

const updateVisibleWorldview = () => {
  visibleWorldview.value = worldviewPosts.slice(0, visibleCount.value)
}

const activateEmbeds = async () => {
  await ensureTwitterWidgets()
  window.twttr?.widgets?.load(sectionRef.value || undefined)
}

const loadMoreWorldview = async () => {
  if (visibleCount.value >= worldviewPosts.length) {
    return
  }
  visibleCount.value = Math.min(visibleCount.value + loadBatchSize, worldviewPosts.length)
  updateVisibleWorldview()
  await nextTick()
  await activateEmbeds()
}

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !embedsActive.value) {
          embedsActive.value = true
          activateEmbeds()
          intersectionObserver?.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )

  if (sectionRef.value) {
    intersectionObserver.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  intersectionObserver?.disconnect()
})
</script>

<template>
  <div ref="sectionRef">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-secondary border-2 border-foreground flex items-center justify-center">
        📋
      </div>
      <h2>設定資料</h2>
    </div>

    <div class="mb-8">
      <h3 class="mb-4 pb-2 border-b-2 border-secondary">🌍 世界観設定紹介ポスト</h3>
      <div class="space-y-8 px-4">
        <div
          v-for="item in visibleWorldview"
          :key="item.url"
          class="border-2 border-secondary bg-card p-4 space-y-3 "
        >
          <div class="flex flex-col gap-1 text-muted-foreground px-1">
            <span class="text-lg font-semibold worldview-title">{{ item.label }}</span>
            <span class="text-xs opacity-70">{{ item.date }}</span>
          </div>
          <div class="tweet-embed">
            <blockquote class="twitter-tweet" data-theme="dark">
              <a :href="item.url">ポストを見る</a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>

    <div v-if="visibleCount < worldviewPosts.length" class="text-center mt-6">
      <button class="load-more-button" @click="loadMoreWorldview">
        さらに読み込む ▶
      </button>
    </div>

  </div>
</template>

<style scoped>
.worldview-title {
  color: #00ff88;
}
</style>

<style scoped>
.tweet-embed {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: visible;
}

.tweet-embed .twitter-tweet {
  width: 100% !important;
  max-width: 600px !important;
  margin: 0 auto !important;
}

.tweet-embed iframe {
  width: 100% !important;
  max-width: 600px !important;
}

.load-more-button {
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  border-radius: 999px;
  transition: background-color 0.2s;
}

.load-more-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
