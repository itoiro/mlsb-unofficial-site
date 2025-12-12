<script setup>
import CategoryGroupCard from './CategoryGroupCard.vue'

const props = defineProps({
  title: {
    type: String,
    default: '📚 設定資料集',
  },
  items: {
    type: Array,
    required: true,
  },
  changeSection: {
    type: Function,
    required: true,
  },
  wrapperVariant: {
    type: String,
    default: 'foreground',
    validator: (value) => ['foreground', 'primary', 'secondary', 'accent'].includes(value),
  },
})

const wrapperVariantClasses = {
  foreground: 'border-foreground',
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'border-accent',
}

const handleCardSelect = (item) => {
  if (item.disabled) {
    return
  }
  props.changeSection && props.changeSection(item.target)
}
</script>

<template>
  <div class="border-2 bg-card p-6" :class="wrapperVariantClasses[wrapperVariant]">
    <h2 class="mb-4">{{ title }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CategoryGroupCard
        v-for="item in items"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
        :variant="item.variant"
        :disabled="item.disabled"
        @select="handleCardSelect(item)"
      />
    </div>
  </div>
</template>
