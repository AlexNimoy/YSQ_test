<template>
  <div>
    <div v-if="copied" class="copy-notification">
      Ссылка скопирована в буфер обмена!
    </div>

    <button v-if="props.result?.answers" @click="share" class="button">
      🔗 Поделиться результатом
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Base64Converter from '../utils/Base64Converter'
import AnswerCompressor from '../utils/AnswerCompressor'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})

const copied = ref(false)
const converter = new Base64Converter()
const generateLink = computed(() => {
  if (!props.result?.answers) return null

  const compressedAnswers = AnswerCompressor.compress(props.result)
  const encodedAnswers = converter.encode(compressedAnswers)
  const { host, pathname, protocol } = window.location
  return `${protocol}//${host}${pathname}?result=${encodedAnswers}`
})

const showCopiedNotification = () => {
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      showCopiedNotification()
    } catch (err) {
      console.error('Не удалось скопировать текст:', err)
    }
  } else {
    // Используем временный элемент для устаревших браузеров
    const textArea = document.createElement('textarea')
    textArea.value = text
    // Размещаем textarea вне видимой области
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      showCopiedNotification()
    } catch (err) {
      console.error('Не удалось скопировать текст', err)
    }
    document.body.removeChild(textArea)
  }
}

const share = async () => {
  const shareData = {
    text: `Результат YSQ теста: ${generateLink.value}`,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
      console.log('Содержимое успешно поделено')
    } catch (err) {
      console.error('Ошибка при попытке поделиться:', err)
    }
  } else {
    // Альтернативный метод: копирование ссылки в буфер обмена
    if (generateLink.value) {
      copyToClipboard(generateLink.value)
    }
  }
}
</script>

<style scoped>
.copy-notification {
  margin-top: 10px;
  color: green;
}
</style>
