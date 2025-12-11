<script setup>
import { nextTick, onMounted } from 'vue'

const characters = [
  {
    name: '主人公 アキラ',
    role: '次元超越者',
    age: '17歳',
    description: '異世界からやってきた謎の力を持つ少年。正義感が強く、仲間思い。',
  },
  {
    name: 'ヒロイン サクラ',
    role: '時空管理者',
    age: '16歳',
    description: '時間を操る能力を持つ少女。クールだが内面は優しい。',
  },
  {
    name: 'サブキャラ レン',
    role: 'サポーター',
    age: '18歳',
    description: '主人公の親友。明るく場を盛り上げるムードメーカー。',
  },
  {
    name: 'ライバル カイト',
    role: '対立者',
    age: '19歳',
    description: '主人公と対立する強敵。複雑な過去を持つ。',
  },
]

const loreTweets = [
  { date: '2025.07.26', label: '強化人間', url: 'https://x.com/MGUJapan/status/1949062140326748334?s=20' },
  { date: '2025.08.02', label: 'サイボーグ', url: 'https://x.com/MGUJapan/status/1951598861404741686?s=20' },
  { date: '2025.08.09', label: 'バルナディア合星連邦', url: 'https://x.com/MGUJapan/status/1954135576560455835?s=20' },
  { date: '2025.08.16', label: 'ギャラクシースピリッツ初代総長', url: 'https://x.com/MGUJapan/status/1956672289417605516?s=20' },
  { date: '2025.08.23', label: 'ギャル軍団', url: 'https://x.com/MGUJapan/status/1959209011120935232?s=20' },
  { date: '2025.09.03', label: 'ドーズ&スミス防衛サービス', url: 'https://x.com/MGUJapan/status/1963195266707714550?s=20' },
  { date: '2025.09.07', label: '千賀浜愚連隊', url: 'https://x.com/MGUJapan/status/1964644819025715711?s=20' },
  { date: '2025.09.09', label: 'アサミ巡査', url: 'https://x.com/MGUJapan/status/1965369601941807462?s=20' },
  { date: '2025.09.13', label: 'マキナの両親（来栖俊一郎 / 真里亜）', url: 'https://x.com/MGUJapan/status/1966819146307694764?s=20' },
  { date: '2025.10.04', label: '水無瀬ミナミ', url: 'https://x.com/MGUJapan/status/1974429290038014132?s=20' },
  { date: '2025.11.01', label: 'エリカ・ブレイズと大道寺朱音', url: 'https://x.com/MGUJapan/status/1984576161330954367?s=20' },
]

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
      <h3 class="mb-4 pb-2 border-b-2 border-secondary">👥 主要キャラクター</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="(char, index) in characters"
          :key="index"
          class="border-2 border-foreground bg-card p-4 hover:border-secondary transition-colors"
        >
          <div class="flex items-start justify-between mb-2">
            <h4>{{ char.name }}</h4>
            <span class="px-2 py-1 border-2 border-secondary text-xs">
              {{ char.age }}
            </span>
          </div>
          <div class="text-sm text-accent mb-2">▶ {{ char.role }}</div>
          <p class="text-sm text-muted-foreground">{{ char.description }}</p>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="mb-4 pb-2 border-b-2 border-secondary">🌍 世界観設定紹介ツイート</h3>
      <div class="space-y-6">
        <div
          v-for="tweet in loreTweets"
          :key="tweet.url"
          class="border-2 border-secondary bg-card p-4 space-y-3"
        >
          <div class="text-xs text-muted-foreground">
            {{ tweet.date }} / {{ tweet.label }}
          </div>
          <blockquote class="twitter-tweet" data-theme="dark">
            <a :href="tweet.url">{{ tweet.url }}</a>
          </blockquote>
        </div>
      </div>
    </div>

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
  </div>
</template>
