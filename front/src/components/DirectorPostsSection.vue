<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import posts from '../data/directorPosts.json'
import { ensureTwitterWidgets } from '../lib/useTwitterWidgets.js'

const sectionRef = ref(null)
const embedsActive = ref(false)
let intersectionObserver
const loadBatchSize = 4
const visibleCount = ref(loadBatchSize)
const visiblePosts = ref(posts.slice(0, visibleCount.value))

const updateVisiblePosts = () => {
  visiblePosts.value = posts.slice(0, visibleCount.value)
}

const activateEmbeds = async () => {
  await ensureTwitterWidgets()
  window.twttr?.widgets?.load(sectionRef.value || undefined)
}

const loadMorePosts = async () => {
  if (visibleCount.value >= posts.length) {
    return
  }
  visibleCount.value = Math.min(visibleCount.value + loadBatchSize, posts.length)
  updateVisiblePosts()
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
      <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">🗒️</div>
      <h2>監督ポスト集</h2>
    </div>

    <p class="text-sm text-muted-foreground mb-6">
      亀山陽平監督（@maru_turu）の設定関連ポストや、関連しそうな作品のポスト。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="item in visiblePosts"
        :key="item.url"
        class="border-2 border-accent bg-card p-4 space-y-2"
      >
        <div class="text-sm font-semibold">{{ item.title }}</div>
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>{{ item.date }}</span>
        </div>
        <div class="tweet-embed">
          <blockquote class="twitter-tweet" data-theme="dark">
            <a :href="item.url">ポストを見る</a>
          </blockquote>
        </div>
      </div>
    </div>

    <div v-if="visibleCount < posts.length" class="text-center mt-6">
      <button class="load-more-button" @click="loadMorePosts">
        さらに読み込む ▶
      </button>
    </div>
  </div>
</template>

<style scoped>
.tweet-embed {
  display: block;
  width: 100%;
  overflow: visible;
}

.tweet-embed .twitter-tweet {
  width: 100% !important;
  margin: 0 auto !important;
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
