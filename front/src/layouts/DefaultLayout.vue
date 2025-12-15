<script setup>
import SiteHeader from '../components/SiteHeader.vue'

const props = defineProps({
  activeSection: {
    type: String,
    default: 'home',
  },
})

const emit = defineEmits(['select'])

const handleSelect = (section) => {
  emit('select', section)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <SiteHeader :active-section="activeSection" @select="handleSelect" />

    <main class="container mx-auto px-4 py-2">
      <slot />
    </main>

    <footer class="border-t-2 border-foreground bg-card mt-12 py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 class="mb-3 text-font-title font-bold">ミルキーシリーズ非公式ファンサイト</h3>
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
                <a
                  class="hover:text-primary cursor-pointer"
                  href="https://x.com/MGUJapan"
                  target="_blank"
                  rel="noreferrer noopener"
                >
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
              <div class="hover:text-primary cursor-pointer" @click="handleSelect('goods')">▶ グッズ</div>
              <div class="hover:text-primary cursor-pointer" @click="handleSelect('events')">▶ イベント</div>
              <div class="hover:text-primary cursor-pointer" @click="handleSelect('interviews')">▶ インタビュー</div>
            </div>
          </div>
          -->
        </div>

        <div class="pt-6 border-t-2 border-muted text-center text-sm text-muted-foreground">
          <p>このサイトは非公式ファンサイトです。</p>
          <p class="mt-2">
            ご要望やフィードバックは
            <a
              class="text-primary hover:underline"
              href="https://docs.google.com/forms/d/e/1FAIpQLSddI-DB7iL-ostGaoboKXB7H4mwA4Lx0RpAHXSb-O4NNattOA/viewform?usp=dialog"
              target="_blank"
              rel="noreferrer noopener"
            >
              こちらのフォーム
            </a>
            からお寄せください。
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
