<script setup>
import interviews from '../data/interviews.json'

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
              <span class="text-muted-foreground">🎤 {{ interview.interviewer }}</span>
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
          続きを読む(外部リンク) ▶
        </a>
      </div>
    </div>
  </div>
</template>
