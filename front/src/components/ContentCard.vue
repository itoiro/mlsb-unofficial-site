<script setup>
const props = defineProps({
  title: { type: String, required: true },
  image: { type: String, default: '' },
  date: { type: String, default: '' },
  price: { type: String, default: '' },
  status: { type: String, default: '' },
  accent: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'accent'].includes(value),
  },
})

const accentClass = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'border-accent',
}
</script>

<template>
  <div
    :class="[
      'border-2 bg-card p-4 hover:translate-x-1 hover:translate-y-1 transition-transform',
      accentClass[props.accent],
    ]"
  >
    <div v-if="props.image" class="mb-3 border-2 border-foreground overflow-hidden aspect-video">
      <img :src="props.image" :alt="props.title" class="w-full h-full object-cover" />
    </div>

    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="flex-1">{{ props.title }}</h3>
      <span
        v-if="props.status"
        :class="[
          'px-2 py-1 border-2 text-xs whitespace-nowrap',
          accentClass[props.accent],
        ]"
      >
        {{ props.status }}
      </span>
    </div>

    <div class="space-y-2">
      <div>
        <slot />
      </div>
      <div class="flex gap-4 pt-2 border-t-2 border-muted text-sm text-muted-foreground">
        <span v-if="props.date">📅 {{ props.date }}</span>
        <span v-if="props.price" class="text-accent">💰 {{ props.price }}</span>
      </div>
    </div>
  </div>
</template>
