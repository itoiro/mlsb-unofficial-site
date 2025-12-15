<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import worldviewPosts from '../data/worldviewPosts.json'
import { ensureTwitterWidgets } from '../lib/useTwitterWidgets.js'

const sectionRef = ref(null)
const embedsActive = ref(false)
let intersectionObserver
const tweetContainers = ref([])
const tweetLoaded = ref(worldviewPosts.map(() => false))

const registerTweetContainer = (index, el) => {
  if (el) {
    tweetContainers.value[index] = el
  }
}

const getTweetId = (url) => {
  const match = url.match(/status\/(\d+)/)
  return match ? match[1] : null
}

const activateEmbeds = async () => {
  if (embedsActive.value) {
    await renderTweets()
    return
  }

  embedsActive.value = true
  await nextTick()
  await ensureTwitterWidgets()
  await renderTweets()
}

const renderTweets = async () => {
  await nextTick()
  await ensureTwitterWidgets()

  tweetContainers.value.forEach((container, index) => {
    if (!container || tweetLoaded.value[index]) {
      return
    }

    const tweetId = getTweetId(worldviewPosts[index].url)
    if (!tweetId) {
      return
    }

    container.innerHTML = ''
    window.twttr?.widgets
      ?.createTweet(tweetId, container, { theme: 'dark' })
      .then(() => {
        tweetLoaded.value[index] = true
      })
  })
}

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
        <div v-for="(tweet, index) in worldviewPosts" :key="tweet.url" class="border-2 border-secondary bg-card p-4 space-y-3 ">
          <div class="flex flex-col gap-1 text-muted-foreground px-1">
            <span class="text-lg font-semibold worldview-title">{{ tweet.label }}</span>
            <span class="text-xs opacity-70">{{ tweet.date }}</span>
          </div>
          <div
            class="tweet-embed"
            :ref="(el) => registerTweetContainer(index, el)"
          >
            <div v-if="!tweetLoaded[index]" class="tweet-placeholder text-xs text-muted-foreground">読み込み中...</div>
          </div>
        </div>
      </div>
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

.tweet-placeholder {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  text-align: center;
}
</style>
