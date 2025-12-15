<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import posts from '../data/directorPosts.json'
import { ensureTwitterWidgets } from '../lib/useTwitterWidgets.js'

const sectionRef = ref(null)
const embedsActive = ref(false)
let intersectionObserver
const tweetContainers = ref([])
const tweetLoaded = ref(posts.map(() => false))

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

    const tweetId = getTweetId(posts[index].url)
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
      <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">🗒️</div>
      <h2>監督ポスト集</h2>
    </div>

    <p class="text-sm text-muted-foreground mb-6">
      亀山陽平監督（@maru_turu）の設定関連ポストや、関連しそうな作品のポスト。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="(post, index) in posts" :key="post.url" class="border-2 border-accent bg-card p-4 space-y-2">
        <div class="text-sm font-semibold">{{ post.title }}</div>
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>{{ post.date }}</span>
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

.tweet-placeholder {
  border: 1px dashed rgba(255, 255, 255, 0.2);
  padding: 0.75rem;
  text-align: center;
}
</style>
