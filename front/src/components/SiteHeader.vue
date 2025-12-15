<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeSection: { type: String, required: true },
})

const emit = defineEmits(['select'])
const mobileMenuOpen = ref(false)


const navItems = [
  { id: 'home', label: 'ホーム' },
  { id: 'worldview', label: '設定資料' },
  { id: 'interviews', label: 'インタビュー' },
  { id: 'magazines', label: '掲載誌' },
/**{ id: 'goods', label: 'グッズ' },
  { id: 'movies', label: '映画' },
  { id: 'comics', label: 'コミック' },
  { id: 'events', label: 'イベント' },
  { id: 'lore', label: '設定資料' },
  { id: 'interviews', label: 'インタビュー' },**/
]


const handleSelect = (id) => {
  emit('select', id)
}

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleMobileSelect = (id) => {
  handleSelect(id)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="border-b-2 border-foreground bg-card sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <h1 class="cursor-pointer hover:text-primary transition-colors" @click="handleSelect('home')">
          ▶ MILKY SERIES UNOFFICIAL FAN SITE
        </h1>

        <nav class="hidden md:flex gap-6">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="handleSelect(item.id)"
            :class="[
              'px-3 py-1 border-2 transition-all',
              props.activeSection === item.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-foreground hover:bg-foreground hover:text-background',
            ]"
          >
            {{ item.label }}
          </button>
        </nav>

        <button
          class="md:hidden p-2 border-2 border-foreground hover:bg-foreground hover:text-background"
          @click="toggleMenu"
        >
          <span v-if="mobileMenuOpen">×</span>
          <span v-else>☰</span>
        </button>
      </div>

      <nav v-if="mobileMenuOpen" class="md:hidden pb-4 flex flex-col gap-2">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="handleMobileSelect(item.id)"
          :class="[
            'px-3 py-2 border-2 transition-all text-left',
            props.activeSection === item.id
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-foreground hover:bg-foreground hover:text-background',
          ]"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </header>
</template>
