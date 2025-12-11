<script setup>
import ContentCard from './ContentCard.vue'

const comics = [
  {
    id: 1,
    title: 'コミック版 第12巻',
    image:
      'https://images.unsplash.com/photo-1588497859490-85d1c17db96d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwYm9va3N8ZW58MXx8fHwxNzY1NDcxMjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '¥720',
    date: '2025.01.20',
    status: '予約受付中',
    description: 'アニメ2期に対応したコミック最新刊！限定版には特製イラストカード付き。',
  },
  {
    id: 2,
    title: 'スピンオフ -サイドストーリー- 第3巻',
    price: '¥680',
    date: '2024.12.25',
    status: '発売中',
    description: 'サブキャラクターの視点で描かれる外伝シリーズ。本編では語られなかった秘話を収録。',
  },
  {
    id: 3,
    title: 'アンソロジーコミック Vol.5',
    price: '¥1,200',
    date: '2025.02.10',
    status: '予約受付中',
    description: '人気作家陣によるトリビュート作品集。全15作品収録。',
  },
  {
    id: 4,
    title: '公式ファンブック 完全版',
    price: '¥2,500',
    date: '2024.11.15',
    status: '発売中',
    description: 'キャラクター設定、世界観解説、制作秘話など200ページ超のボリューム。',
  },
  {
    id: 5,
    title: 'イラストレーションズ Art Book',
    price: '¥3,800',
    date: '2024.10.30',
    status: '発売中',
    description: 'キャラクターデザイナー描き下ろしイラスト満載。A4サイズ豪華装丁。',
  },
  {
    id: 6,
    title: '4コマアンソロジー 第2弾',
    price: '¥880',
    date: '2025.01.05',
    status: '発売中',
    description: 'キャラクターたちのコミカルな日常を描いた4コマ漫画集。',
  },
]
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">
        📚
      </div>
      <h2>コミック・書籍</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ContentCard
        v-for="item in comics"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :price="item.price"
        :date="item.date"
        :status="item.status"
        accent="accent"
      >
        <p class="text-sm">
          {{ item.description }}
        </p>
      </ContentCard>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="border-2 border-accent bg-card p-4">
        <h3 class="mb-3">📖 連載情報</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>本編コミック</span>
            <span class="text-accent">月刊少年マガジン 連載中</span>
          </div>
          <div class="flex justify-between">
            <span>スピンオフ</span>
            <span class="text-accent">Webコミック 隔週更新</span>
          </div>
        </div>
      </div>

      <div class="border-2 border-accent bg-card p-4">
        <h3 class="mb-3">🏆 受賞歴</h3>
        <div class="space-y-2 text-sm">
          <div>📌 このマンガがすごい！2024 - 第3位</div>
          <div>📌 マンガ大賞2023 - ノミネート</div>
        </div>
      </div>
    </div>
  </div>
</template>
