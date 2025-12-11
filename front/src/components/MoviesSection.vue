<script setup>
import ContentCard from './ContentCard.vue'

const movies = [
  {
    id: 1,
    title: '劇場版 超次元アニメ -完結編-',
    image:
      'https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzY1NDYyNzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2025.03.15',
    status: '公開予定',
    description: '待望の劇場版第3弾！物語の完結を描く感動の最終章。上映時間：120分',
  },
  {
    id: 2,
    title: '劇場版 超次元アニメ -覚醒-',
    date: '2024.07.20',
    status: 'BD発売中',
    description: '劇場版第2弾。新キャラクター登場で物語が加速する！興行収入25億円突破。',
  },
  {
    id: 3,
    title: '劇場版 超次元アニメ -序章-',
    date: '2023.12.10',
    status: 'BD発売中',
    description: 'シリーズ初の劇場版。TVシリーズの総集編+新規カット30分追加。',
  },
]

const theaters = [
  { name: '新宿ピカデリー', location: '東京' },
  { name: '梅田ブルク7', location: '大阪' },
  { name: 'T・ジョイ博多', location: '福岡' },
  { name: 'MOVIX仙台', location: '宮城' },
  { name: 'イオンシネマ札幌', location: '北海道' },
]
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-secondary border-2 border-foreground flex items-center justify-center">
        🎬
      </div>
      <h2>映画情報</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <ContentCard
        v-for="item in movies"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :date="item.date"
        :status="item.status"
        accent="secondary"
      >
        <p class="text-sm">
          {{ item.description }}
        </p>
      </ContentCard>
    </div>

    <div class="border-2 border-secondary bg-card p-6">
      <h3 class="mb-4">🎟️ 主要上映館（最新作）</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <div
          v-for="(theater, index) in theaters"
          :key="index"
          class="border-2 border-foreground p-3 hover:bg-secondary hover:text-secondary-foreground transition-colors"
        >
          <div class="text-sm">{{ theater.name }}</div>
          <div class="text-xs text-muted-foreground mt-1">📍 {{ theater.location }}</div>
        </div>
      </div>
      <p class="mt-4 text-sm text-muted-foreground">
        ※ その他全国200館以上で上映予定。詳しくは公式サイトをご確認ください。
      </p>
    </div>
  </div>
</template>
