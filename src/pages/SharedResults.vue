<template>
  <ResultsTable
    v-if="userAnswers"
    :schemas="schemas"
    :userAnswers="userAnswers.answers"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ResultsTable from '../components/test/ResultsTable.vue'
import LocalStorageService from '../store/LocalStorageService'
import Base64Converter from '../utils/Base64Converter'
import AnswerCompressor from '../utils/AnswerCompressor'

const converter = new Base64Converter()
const userAnswers = ref(null)

const props = defineProps({
  result: {
    type: String,
    required: true,
  },
  schemas: {
    type: Array,
    required: true,
  },
})

onMounted(() => {
  if (!props.result) return
  // Decode and decompress the result parameter
  const decodedAnswers = converter.decode(props.result)
  userAnswers.value = AnswerCompressor.decompress(decodedAnswers)
})
</script>
