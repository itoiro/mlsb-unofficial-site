<script setup>
import { ref } from 'vue'

const command = ref('')
const logs = ref([])

const submitCommand = () => {
  const value = command.value.trim()
  if (!value) {
    return
  }
  command.value = ''
  logs.value.push(`> ${value}`)

  if (value.toLowerCase() === 'clear') {
    logs.value.push('ログをクリアしました。')
    logs.value = []
    return
  }

  logs.value.push(`command not found: ${value}`)

  if (logs.value.length > 20) {
    logs.value.splice(0, logs.value.length - 20)
  }
}
</script>

<template>
  <div class="terminal-wrapper">
    <div class="terminal-logs">
      <p v-for="(log, index) in logs" :key="index">{{ log }}</p>
    </div>
    <form class="terminal-form" @submit.prevent="submitCommand">
      <span class="prompt">&gt;</span>
      <input v-model="command" type="text" />
    </form>
  </div>
</template>

<style scoped>
.terminal-wrapper {
  color: #ffd95c;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.terminal-logs {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.8rem;
  opacity: 0.8;
  min-height: 30px;
}

.terminal-form {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 0.9rem;
  color: #ffd95c;
}

.prompt {
  opacity: 0.6;
}

.terminal-form input {
  flex: 1;
  background: transparent;
  border: none;
  color: inherit;
  outline: none;
  font-family: inherit;
}

</style>
