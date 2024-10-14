<template>
  <a v-if="result?.answers" :href="generateLink" target="_blank"
    >Поделиться результатом</a
  >
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const generatedLink = ref('')
import Base64Converter from '../utils/Base64Converter'
import AnswerCompressor from '../utils/AnswerCompressor'

const converter = new Base64Converter()

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})

// Function to generate the results link
const generateLink = computed(() => {
  if (!props.result?.answers) return null

  const compressedAnswers = AnswerCompressor.compress(props.result)
  const encodedAnswers = converter.encode(compressedAnswers)
  const { host, pathname, protocol } = window.location
  return `${protocol}//${host}${pathname}?result=${encodedAnswers}`
})
</script>
