<script setup>
const patternStyle = {
  backgroundImage: `
    linear-gradient(0deg, transparent 24%, rgba(0, 255, 136, .05) 25%, rgba(0, 255, 136, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, .05) 75%, rgba(0, 255, 136, .05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(0, 255, 136, .05) 25%, rgba(0, 255, 136, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, .05) 75%, rgba(0, 255, 136, .05) 76%, transparent 77%, transparent)
  `,
  backgroundSize: '50px 50px',
}
</script>

<template>

  <div class="px-3 py-1 mb-1" style="display: flex; justify-content: flex-end;">
    <!-- <span class="font-bold" style="color: #ff0000">● REC</span> -->
  </div>

  <div class="relative border-4 border-secondary bg-gradient-to-br from-card to-background p-8 md:p-12 overflow-hidden">


    <div class="absolute inset-0 opacity-10" :style="patternStyle" />

    
    <div class="relative z-10">
      
      <h1 class="mb-4 text-3xl md:text-5xl">
        <span class="text-font-title">ミルキーシリーズ</span>
        <span class="text-primary">☆</span>
        <span class="text-font-title">非公式</span>
        <span class="text-font-title">ファンサイト</span>
      </h1>

      <p class="max-w-3xl mb-8 text-muted-foreground">
        銀河特急ミルキー☆サブウェイを中心としたミルキーシリーズ世界観設定など、各種情報をひとまとめ！
      </p>

      <!-- <div class="flex flex-wrap gap-3">
        <div class="border-2 border-primary bg-primary text-primary-foreground px-4 py-2">
          ⚡ 新着情報をチェック
        </div>
        <div class="border-2 border-secondary px-4 py-2">
          🎯 最新グッズ
        </div>
        <div class="border-2 border-accent px-4 py-2">
          🎬 劇場版情報
        </div>
      </div> -->
    </div>

    <div class="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-primary" />
    <div class="absolute bottom-0 left-0 w-16 h-16 border-r-4 border-t-4 border-secondary" />
  </div>
</template>
