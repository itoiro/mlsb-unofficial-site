<script setup>
import { nextTick, onMounted } from 'vue'

import loreTweets from '../data/loreTweets.json'

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
    script.onload = () => {
      window.twttr && window.twttr.widgets && window.twttr.widgets.load()
    }
    document.body.appendChild(script)
  }
}

onMounted(() => {
  nextTick(() => {
    loadTwitterWidgets()
  })
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      loadTwitterWidgets()
    }
  })

  if (typeof window !== 'undefined') {
    window.addEventListener('load', loadTwitterWidgets)
  }
})
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-secondary border-2 border-foreground flex items-center justify-center">
        📋
      </div>
      <h2>設定資料</h2>
    </div>

    <div class="mb-8">
      <h3 class="mb-4 pb-2 border-b-2 border-secondary">🌍 世界観設定紹介ツイート</h3>
      <div class="space-y-8">
        <div v-for="tweet in loreTweets" :key="tweet.url" class="border-2 border-secondary bg-card p-4 space-y-3">
          <div class="flex items-center justify-between text-xs text-muted-foreground">
            <span>{{ tweet.date }}</span>
            <span>{{ tweet.label }}</span>
          </div>
            <div class="tweet-embed">
                <blockquote class="twitter-tweet" data-theme="dark">
                    <a :href="tweet.url">{{ tweet.url }}</a>
                </blockquote>
            </div>
        </div>
      </div>
    </div>

    <!--
    <div class="border-2 border-secondary bg-card p-6">
      <h3 class="mb-4">📅 ストーリータイムライン</h3>
      <div class="space-y-4">
        <div class="flex gap-4">
          <div
            class="w-24 flex-shrink-0 border-2 border-primary bg-primary text-primary-foreground px-2 py-1 text-center"
          >
            第1章
          </div>
          <div class="flex-1">
            <div>出会い</div>
            <div class="text-sm text-muted-foreground">主人公が異世界に転移。運命の出会い。</div>
          </div>
        </div>

        <div class="flex gap-4">
          <div
            class="w-24 flex-shrink-0 border-2 border-secondary bg-secondary text-secondary-foreground px-2 py-1 text-center"
          >
            第2章
          </div>
          <div class="flex-1">
            <div>覚醒</div>
            <div class="text-sm text-muted-foreground">能力に目覚め、仲間と出会う。</div>
          </div>
        </div>

        <div class="flex gap-4">
          <div
            class="w-24 flex-shrink-0 border-2 border-accent bg-accent text-accent-foreground px-2 py-1 text-center"
          >
            第3章
          </div>
          <div class="flex-1">
            <div>試練</div>
            <div class="text-sm text-muted-foreground">強敵との戦い。仲間との絆が深まる。</div>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-24 flex-shrink-0 border-2 border-foreground px-2 py-1 text-center">第4章</div>
          <div class="flex-1">
            <div>真実</div>
            <div class="text-sm text-muted-foreground">世界の真実が明らかに。運命の選択。</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 border-2 border-accent bg-card">
      <p class="text-sm text-muted-foreground">
        💡 この設定資料はアニメ公式設定に基づいています。ネタバレを含む場合がありますのでご注意ください。
      </p>
    </div>
    -->
  </div>
</template>

<style scoped>
.tweet-embed {
  display: flex;
  justify-content: center;
}

.tweet-embed .twitter-tweet,
.tweet-embed iframe {
  width: 100% !important;
  max-width: 600px !important;
}
</style>
