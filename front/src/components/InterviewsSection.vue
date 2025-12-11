<script setup>
const interviews = [
  {
    id: 1,
    title: '「銀河特急 ミルキー☆サブウェイ」展覧会レポ＆亀山陽平監督インタビュー',
    interviewer: '亀山陽平（監督）',
    date: '2025.08.07',
    category: 'アニメ！アニメ！',
    preview:
      '池袋PARCOでの体験型展覧会レポートとあわせて、レトロフューチャーな世界観づくりやTVシリーズ化の経緯を監督自身が解説した公式インタビュー。',
    link: 'https://animeanime.jp/article/2025/08/07/92148.html',
  },
  {
    id: 2,
    title: '『銀河特急 ミルキー☆サブウェイ』生みの親・亀山陽平が明かす制作裏',
    interviewer: '亀山陽平（監督）',
    date: '2025.09.26',
    category: '転職type',
    preview:
      '監督・脚本・モデリングまで一人で担うワークフローや「限られたリソースをどう最適化するか」を語り、個人制作からTVシリーズへ飛躍した理由に迫る。',
    link: 'https://type.jp/et/feature/29301/',
  },
  {
    id: 3,
    title: '【スペシャルエディション版発売記念！】亀山陽平監督インタビュー',
    interviewer: '亀山陽平（監督）',
    date: '2025.11.26',
    category: 'anan web',
    preview:
      'anan2473号スペシャルエディションの表紙企画に合わせ、キャラクター描写やサウンドと映像のこだわり、ファンに届けたいメッセージを振り返る。',
    link: 'https://ananweb.jp/categories/entertainment/70151',
  },
  {
    id: 4,
    title: '『ミルキー☆サブウェイ』完結。実制作のほとんどを担当した亀山陽平監督に制作秘話を聞く',
    interviewer: '亀山陽平（監督）',
    date: '2025.09.22',
    category: 'CINRA',
    preview:
      'シリーズ完結記念として、個人制作時代からのCG手法やストーリーテリングを掘り下げ、今後挑戦したい表現まで幅広く語ったロングインタビュー。',
    link: 'https://www.cinra.net/article/202509-kameyama-yohei_imgwyk',
  },
]

const categoryColors = {
  'アニメ！アニメ！': 'border-primary',
  転職type: 'border-secondary',
  'anan web': 'border-accent',
  CINRA: 'border-primary',
  note: 'border-secondary',
}
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-accent border-2 border-foreground flex items-center justify-center">
        🎤
      </div>
      <h2>インタビュー記事</h2>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-6">
      <div
        v-for="interview in interviews"
        :key="interview.id"
        :class="['border-2 bg-card p-6 hover:translate-x-1 transition-transform', categoryColors[interview.category]]"
      >
        <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div class="flex-1">
            <h3 class="mb-2">{{ interview.title }}</h3>
            <div class="flex flex-wrap gap-3 text-sm">
              <span class="text-muted-foreground">🎯 {{ interview.interviewer }}</span>
              <span class="text-muted-foreground">📅 {{ interview.date }}</span>
            </div>
          </div>
          <span class="px-3 py-1 border-2 text-sm whitespace-nowrap" :class="categoryColors[interview.category]">
            {{ interview.category }}
          </span>
        </div>

        <div class="border-l-4 border-accent pl-4 py-2">
          <p class="text-sm italic">{{ interview.preview }}</p>
        </div>

        <a
          class="inline-block mt-4 px-4 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
          :href="interview.link"
          target="_blank"
          rel="noreferrer noopener"
        >
          続きを読む ▶
        </a>
      </div>
    </div>

    <!--
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="border-2 border-accent bg-card p-4">
        <h3 class="mb-3">📰 最新ニュース</h3>
        <div class="space-y-2 text-sm">
          <div class="pb-2 border-b border-muted">
            <div class="text-xs text-muted-foreground mb-1">2024.12.15</div>
            <div>第2期制作決定！2025年秋放送予定</div>
          </div>
          <div class="pb-2 border-b border-muted">
            <div class="text-xs text-muted-foreground mb-1">2024.12.10</div>
            <div>Blu-ray BOX 予約開始のお知らせ</div>
          </div>
          <div class="pb-2">
            <div class="text-xs text-muted-foreground mb-1">2024.12.01</div>
            <div>公式ファンクラブ会員募集中</div>
          </div>
        </div>
      </div>

      <div class="border-2 border-accent bg-card p-4">
        <h3 class="mb-3">🔗 関連リンク</h3>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 pb-2 border-b border-muted hover:text-accent cursor-pointer">
            <span>▶</span>
            <span>公式Twitterアカウント</span>
          </div>
          <div class="flex items-center gap-2 pb-2 border-b border-muted hover:text-accent cursor-pointer">
            <span>▶</span>
            <span>公式YouTubeチャンネル</span>
          </div>
          <div class="flex items-center gap-2 pb-2 hover:text-accent cursor-pointer">
            <span>▶</span>
            <span>公式オンラインストア</span>
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>
