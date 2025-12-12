<script setup>
import ContentCard from './ContentCard.vue'
import CalendarEmbedSection from './CalendarEmbedSection.vue'

const events = [
  {
    id: 1,
    title: 'スペシャルトークイベント',
    image:
      'https://images.unsplash.com/photo-1706419202046-e4982f00b082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwZXZlbnQlMjBjcm93ZHxlbnwxfHx8fDE3NjU0NzEyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    date: '2025.02.15',
    location: '東京ビッグサイト',
    status: 'チケット販売中',
    description: '声優陣によるトークショー。限定グッズ販売あり。定員：500名',
  },
  {
    id: 2,
    title: 'オーケストラコンサート',
    date: '2025.03.20',
    location: 'サントリーホール',
    status: 'チケット販売中',
    description: '劇中音楽をフルオーケストラで再現。指揮：著名指揮者、演奏：東京フィル',
  },
  {
    id: 3,
    title: 'コラボカフェ期間限定オープン',
    date: '2025.01.10-02.28',
    location: '原宿・渋谷・池袋',
    status: '開催中',
    description: 'キャラクターをイメージしたメニューとオリジナルグッズ。予約優先制',
  },
  {
    id: 4,
    title: 'ファンミーティング 2025',
    date: '2025.04.05',
    location: '幕張メッセ',
    status: '近日発売',
    description: '声優・スタッフ総出演の大型イベント。ライブパフォーマンスも予定',
  },
  {
    id: 5,
    title: '原画展 -軌跡-',
    date: '2025.02.01-03.31',
    location: '六本木ヒルズ',
    status: '開催予定',
    description: 'アニメ制作に使用された原画・設定資料を展示。入場無料',
  },
  {
    id: 6,
    title: 'ポップアップストア',
    date: '2025.01.20-02.10',
    location: '全国主要都市',
    status: '開催予定',
    description: '限定グッズ販売。先着特典あり。整理券配布の場合あり',
  },
]
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary border-2 border-foreground flex items-center justify-center">
        🎪
      </div>
      <h2>イベント情報</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <ContentCard
        v-for="item in events"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :date="item.date"
        :status="item.status"
        accent="primary"
      >
        <div class="space-y-1 text-sm">
          <p>{{ item.description }}</p>
          <div class="flex items-center gap-2 text-muted-foreground">
            <span>📍</span>
            <span>{{ item.location }}</span>
          </div>
        </div>
      </ContentCard>
    </div>

    <div class="border-2 border-primary bg-card p-6">
      <h3 class="mb-4 flex items-center gap-2">
        <span>📅</span>
        今月の注目イベント
      </h3>

      <div class="space-y-3">
        <div class="flex gap-4 p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors">
          <div
            class="w-16 h-16 border-2 border-primary bg-primary text-primary-foreground flex flex-col items-center justify-center flex-shrink-0"
          >
            <div class="text-xs">JAN</div>
            <div>20</div>
          </div>
          <div class="flex-1">
            <div>🎯 ポップアップストア 開始</div>
            <div class="text-sm text-muted-foreground">全国主要都市で同時開催</div>
          </div>
        </div>

        <div class="flex gap-4 p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors">
          <div
            class="w-16 h-16 border-2 border-secondary bg-secondary text-secondary-foreground flex flex-col items-center justify-center flex-shrink-0"
          >
            <div class="text-xs">FEB</div>
            <div>01</div>
          </div>
          <div class="flex-1">
            <div>🎨 原画展 スタート</div>
            <div class="text-sm text-muted-foreground">六本木ヒルズにて2ヶ月間開催</div>
          </div>
        </div>

        <div class="flex gap-4 p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors">
          <div
            class="w-16 h-16 border-2 border-accent bg-accent text-accent-foreground flex flex-col items-center justify-center flex-shrink-0"
          >
            <div class="text-xs">FEB</div>
            <div>15</div>
          </div>
          <div class="flex-1">
            <div>🎤 スペシャルトークイベント</div>
            <div class="text-sm text-muted-foreground">声優陣登壇 - 東京ビッグサイト</div>
          </div>
        </div>
      </div>
    </div>

    <CalendarEmbedSection class="mt-8" />
  </div>
</template>
