<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'foreground',
    validator: (value) => ['foreground', 'primary', 'secondary', 'accent'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

const variantClasses = {
  foreground: 'border-foreground',
  primary: 'border-primary hover:bg-primary hover:text-primary-foreground',
  secondary: 'border-secondary hover:bg-secondary hover:text-secondary-foreground',
  accent: 'border-accent custom-hover-accent',
}

const handleClick = () => {
  if (props.disabled) {
    return
  }
  emit('select')
}
</script>

<template>
  <div
    class="border-2 p-4 transition-colors"
    :class="[
      disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer',
      variantClasses[variant] || variantClasses.foreground,
    ]"
    @click="handleClick"
  >
    <div class="flex items-center gap-3 mb-2">
      <span class="text-2xl">{{ icon }}</span>
      <h3>{{ title }}</h3>
    </div>
    <p class="text-sm">{{ description }}</p>
  </div>
</template>
