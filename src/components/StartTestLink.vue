<template>
  <router-link to="/test" class="button">
    {{ isTestEmpty ? '🚀 Начать тест' : '📖 Продолжить тест' }}
  </router-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LocalStorageService from '../store/LocalStorageService'

const isTestEmpty = ref(true)
const storageService = new LocalStorageService('testAnswers', { answers: [] })

onMounted(() => {
  isTestEmpty.value = storageService.is_empty()
})
</script>
