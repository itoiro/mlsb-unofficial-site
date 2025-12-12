<script setup>
import { nextTick, onMounted } from 'vue'

import posts from '../data/directorPosts.json'

const loadTwitterWidgets = () => {
  if (typeof window === 'undefined') return

  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load()
    return
  }

  const existingScript = document.querySelector('script[data-twitter-widgets]')
  if (!existingScript) {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    script.setAttribute('data-twitter-widgets', 'true')
    script.onload = () => window.twttr && window.twttr.widgets && window.twttr.widgets.load()
    document.body.appendChild(script)
  }
}

onMounted(() => {
  nextTick(() => loadTwitterWidgets())
})
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">🗒️</div>
      <h2>監督ポスト集</h2>
    </div>

    <p class="text-sm text-muted-foreground mb-6">
      亀山陽平監督（@maru_turu）の設定関連ポストや、関連しそうな作品のポスト。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="post in posts" :key="post.url" class="border-2 border-accent bg-card p-4 space-y-2">
        <div class="text-sm font-semibold">{{ post.title }}</div>
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <span>{{ post.date }}</span>
        </div>
        <div class="tweet-embed">
          <blockquote class="twitter-tweet" data-theme="dark">
            <a :href="post.url">{{ post.url }}</a>
          </blockquote>
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
</style>
