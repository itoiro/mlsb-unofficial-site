<script setup>
import ContentCard from './ContentCard.vue'

const goods = [
  {
    id: 1,
    title: '限定フィギュア - 主人公Ver.',
    image:
      'https://images.unsplash.com/photo-1761129386720-82a53e04d9b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMG1lcmNoYW5kaXNlJTIwZmlndXJlfGVufDF8fHx8MTc2NTQ3MTIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    price: '¥12,800',
    date: '2025.01.15',
    status: '予約受付中',
    description: '1/8スケール 完全彩色済み可動フィギュア。細部までこだわった造形が魅力。',
  },
  {
    id: 2,
    title: 'オリジナルサウンドトラック Vol.2',
    price: '¥3,300',
    date: '2025.02.01',
    status: '発売予定',
    description: '劇中BGM全30曲収録。特典CD付き限定盤も同時発売。',
  },
  {
    id: 3,
    title: 'アクリルスタンド 6種セット',
    price: '¥4,500',
    date: '2024.12.20',
    status: '在庫あり',
    description: 'メインキャラクター6人のアクリルスタンド。台座付き。',
  },
  {
    id: 4,
    title: 'Tシャツ - ロゴデザイン',
    price: '¥3,800',
    date: '2024.11.30',
    status: '在庫わずか',
    description: 'S/M/L/XLサイズ展開。100%コットン素材。',
  },
  {
    id: 5,
    title: 'タペストリー - キービジュアル',
    price: '¥5,800',
    date: '2025.01.25',
    status: '予約受付中',
    description: 'B2サイズ（51.5×72.8cm）。アニメ1期キービジュアル使用。',
  },
  {
    id: 6,
    title: 'ラバーストラップ 全8種',
    price: '¥800',
    date: '2024.12.01',
    status: '在庫あり',
    description: 'ランダム販売。1BOX購入で全種コンプリート可能。',
  },
]
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-primary border-2 border-foreground flex items-center justify-center">
        🛍️
      </div>
      <h2>グッズ情報</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ContentCard
        v-for="item in goods"
        :key="item.id"
        :title="item.title"
        :image="item.image"
        :price="item.price"
        :date="item.date"
        :status="item.status"
        accent="primary"
      >
        <p class="text-sm">
          {{ item.description }}
        </p>
      </ContentCard>
    </div>

    <div class="mt-8 overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="text-left border-b border-foreground/50">
            <th class="py-2 pr-4">商品名</th>
            <th class="py-2 pr-4">価格</th>
            <th class="py-2 pr-4">発売日</th>
            <th class="py-2 pr-4">ステータス</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in goods" :key="`table-${item.id}`" class="border-b border-muted/40 last:border-b-0">
            <td class="py-2 pr-4">{{ item.title }}</td>
            <td class="py-2 pr-4">{{ item.price }}</td>
            <td class="py-2 pr-4">{{ item.date }}</td>
            <td class="py-2 pr-4">
              <span class="inline-block px-2 py-1 rounded border border-foreground/40 text-xs">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6 p-4 border-2 border-accent bg-card">
      <p class="text-sm text-muted-foreground">
        ⚠️ 価格は全て税込表示です。商品の詳細は公式オンラインストアでご確認ください。
      </p>
    </div>
  </div>
</template>
