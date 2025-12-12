<script setup>
import { ref } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HeroSection from '../components/HeroSection.vue'
import GoodsSection from '../components/GoodsSection.vue'
import MoviesSection from '../components/MoviesSection.vue'
import ComicsSection from '../components/ComicsSection.vue'
import EventsSection from '../components/EventsSection.vue'
import LoreSection from '../components/LoreSection.vue'
import DirectorPostsSection from '../components/DirectorPostsSection.vue'
import CategoryGroupSection from '../components/CategoryGroupSection.vue'
import InterviewsSection from '../components/InterviewsSection.vue'
import CalendarEmbedSection from '../components/CalendarEmbedSection.vue'

const activeSection = ref('home')
const changeSection = (section) => {
  activeSection.value = section
}

const collectionItems = [
  {
    icon: '📋',
    title: '設定資料集',
    description: '未登場キャラクター、世界観に関する資料',
    target: 'lore',
    variant: 'secondary',
  },
  {
    icon: '📋',
    title: '監督ポスト集',
    description: '監督による解説や、関連しそうな作品のポストまとめ',
    target: 'directorPosts',
    variant: 'accent',
  },
  {
    icon: '📚',
    title: 'キャラクター情報',
    description: 'Coming soon...',
    target: '',
    variant: 'primary',
    disabled: true,
  },
]

const mediaItems = [
  {
    icon: '📰',
    title: '監督インタビュー',
    description: 'Web掲載のインタビュー記事をチェックできます。',
    target: 'interviews',
    variant: 'accent',
  },
  {
    icon: '📖',
    title: '雑誌掲載情報',
    description: 'Coming soon ...',
    target: '',
    variant: 'secondary',
    disabled: true,
  },
]
</script>

<template>
  <DefaultLayout :active-section="activeSection" @select="changeSection">
    <section v-if="activeSection === 'home'" class="space-y-8">
      <HeroSection />

      <CategoryGroupSection
        :items="collectionItems"
        :change-section="changeSection"
        title="📚 設定資料集"
        wrapper-variant="foreground"
      />

      <CategoryGroupSection
        :items="mediaItems"
        :change-section="changeSection"
        title="📺 メディア情報"
        wrapper-variant="accent"
      />

      <CategoryGroupSection
        :items="[]"
        :change-section="changeSection"
        title="📅 カレンダー"
        wrapper-variant="foreground"
      >
        <CalendarEmbedSection />
      </CategoryGroupSection>
    </section>

    <GoodsSection v-else-if="activeSection === 'goods'" />
    <MoviesSection v-else-if="activeSection === 'movies'" />
    <ComicsSection v-else-if="activeSection === 'comics'" />
    <EventsSection v-else-if="activeSection === 'events'" />
    <LoreSection v-else-if="activeSection === 'lore'" />
    <InterviewsSection v-else-if="activeSection === 'interviews'" />
    <DirectorPostsSection v-else-if="activeSection === 'directorPosts'" />
  </DefaultLayout>
</template>
