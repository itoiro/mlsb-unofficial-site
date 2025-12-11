
<script setup>
import { ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import GoodsSection from './components/GoodsSection.vue'
import MoviesSection from './components/MoviesSection.vue'
import ComicsSection from './components/ComicsSection.vue'
import EventsSection from './components/EventsSection.vue'
import LoreSection from './components/LoreSection.vue'
import DirectorPostsSection from './components/DirectorPostsSection.vue'
import InterviewsSection from './components/InterviewsSection.vue'

const activeSection = ref('home')
const changeSection = (section) => {
  activeSection.value = section
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <SiteHeader :active-section="activeSection" @select="changeSection" />

    <main class="container mx-auto px-4 py-8">
      <section v-if="activeSection === 'home'" class="space-y-8">
        <HeroSection />

        <!--<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="border-2 border-primary bg-card p-6 cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform"
            @click="changeSection('goods')"
          >
            <div class="text-3xl mb-3">🛍️</div>
            <h3 class="mb-2">最新グッズ</h3>
            <p class="text-sm text-muted-foreground">
              フィギュア、Tシャツ、アクリルスタンドなど、公式グッズ情報をチェック
            </p>
          </div>

          <div
            class="border-2 border-secondary bg-card p-6 cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform"
            @click="changeSection('movies')"
          >
            <div class="text-3xl mb-3">🎬</div>
            <h3 class="mb-2">劇場版情報</h3>
            <p class="text-sm text-muted-foreground">
              最新作から過去作まで、劇場版の情報と上映館をご案内
            </p>
          </div>

          <div
            class="border-2 border-accent bg-card p-6 cursor-pointer hover:translate-x-1 hover:translate-y-1 transition-transform"
            @click="changeSection('events')"
          >
            <div class="text-3xl mb-3">🎪</div>
            <h3 class="mb-2">イベント</h3>
            <p class="text-sm text-muted-foreground">
              トークショー、コンサート、コラボカフェなど最新イベント情報
            </p>
          </div>
        </div>-->

        <div class="border-2 border-foreground bg-card p-6">
          <h2 class="mb-4">📚 設定資料集</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div
              class="border-2 border-secondary p-4 cursor-pointer hover:bg-secondary hover:text-secondary-foreground transition-colors"
              @click="changeSection('lore')"
            >
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">📋</span>
                <h3>設定資料集</h3>
              </div>
              <p class="text-sm">未登場キャラクター、世界観に関する資料</p>
            </div>

            <div
              class="border-2 border-accent p-4 cursor-pointer custom-hover-accent"
              @click="changeSection('directorPosts')"
            >
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">📋</span>
                <h3>監督ポスト集</h3>
              </div>
              <p class="text-sm">監督による解説や、関連しそうな作品のポストまとめ</p>
            </div>
                    
            <div
              class="border-2 border-primary p-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              @click="changeSection('comics')"
            >
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl">📚</span>
                <h3>キャラクター情報</h3>
              </div>
              <p class="text-sm">Comming soon...</p>
            </div>

          </div>
        </div>

        <div class="border-2 border-accent bg-card p-6">
          <h2 class="mb-4">📺 メディア情報</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="border-2 border-foreground p-4 cursor-pointer hover:border-accent transition-colors"
              @click="changeSection('interviews')"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-1 bg-accent text-accent-foreground text-xs">INTERVIEW</span>
                <h3>監督インタビュー</h3>
              </div>
              <p class="text-sm text-muted-foreground">
                Web掲載のインタビュー記事をチェックできます。
              </p>
              <div class="mt-3 text-sm text-accent">インタビュー一覧 ▶</div>
            </div>

            <a
              class="border-2 border-foreground p-4 hover:border-accent transition-colors block"
              href="https://ananweb.jp/categories/entertainment/70151"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-1 bg-secondary text-secondary-foreground text-xs">MAGAZINE</span>
                <h3>雑誌掲載情報</h3>
              </div>
              <p class="text-sm text-muted-foreground">
                Comming soon ...
              </p>
                <!-- <div class="mt-3 text-sm text-secondary">anan掲載記事へ ▶</div> -->
              </a>
            </div>
          </div>

        <!--<div class="border-4 border-primary bg-gradient-to-r from-primary/10 to-secondary/10 p-6 text-center">
          <h2 class="mb-3">📢 重要なお知らせ</h2>
          <p class="mb-4">第2期制作決定！2025年秋放送予定</p>
          <div class="inline-block border-2 border-primary bg-primary text-primary-foreground px-6 py-2">
            詳細はこちら ▶
          </div>
        </div>-->
      </section>

      <GoodsSection v-else-if="activeSection === 'goods'" />
      <MoviesSection v-else-if="activeSection === 'movies'" />
      <ComicsSection v-else-if="activeSection === 'comics'" />
      <EventsSection v-else-if="activeSection === 'events'" />
      <LoreSection v-else-if="activeSection === 'lore'" />
      <InterviewsSection v-else-if="activeSection === 'interviews'" />
      <DirectorPostsSection v-else-if="activeSection === 'directorPosts'" />
    </main>

    <footer class="border-t-2 border-foreground bg-card mt-12 py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 class="mb-3">ミルキーシリーズ非公式ファンサイト</h3>
            <!--<p class="text-sm text-muted-foreground">ファンによる、ファンのための情報サイト</p>-->
          </div>

          <div>
            <h4 class="mb-3">リンク</h4>
            <div class="space-y-2 text-sm">
              <div>
                <a
                  class="hover:text-primary cursor-pointer"
                  href="https://milkygalacticuniverse.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ▶ 公式サイト
                </a>
              </div>
              <div>
                <a class="hover:text-primary cursor-pointer" href="https://x.com/MGUJapan" target="_blank" rel="noreferrer noopener">
                  ▶ 公式X
                </a>
              </div>
              <div>
                <a
                  class="hover:text-primary cursor-pointer"
                  href="https://www.youtube.com/channel/UCC-14oOlJqtME7UywftsSpQ"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  ▶ 公式YouTube
                </a>
              </div>
            </div>
          </div>

          <!--
          <div>
            <h4 class="mb-3">カテゴリ</h4>
            <div class="space-y-2 text-sm">
              <div class="hover:text-primary cursor-pointer" @click="changeSection('goods')">▶ グッズ</div>
              <div class="hover:text-primary cursor-pointer" @click="changeSection('events')">▶ イベント</div>
              <div class="hover:text-primary cursor-pointer" @click="changeSection('interviews')">▶ インタビュー</div>
            </div>
          </div>
          -->
        </div>

        <div class="pt-6 border-t-2 border-muted text-center text-sm text-muted-foreground">
          <p>このサイトは非公式ファンサイトです。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.custom-hover-accent {
  transition: background-color 0.3s, color 0.3s;
}
.custom-hover-accent:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}
.custom-hover-accent:hover h3,
.custom-hover-accent:hover p,
.custom-hover-accent:hover span {
  color: var(--accent-foreground);
}
</style>
