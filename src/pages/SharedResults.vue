<template>
  <ResultsTable
    v-if="viewType == 'table' && userAnswers"
    :schemas="schemas"
    :userAnswers="userAnswers.answers"
  />
  <Chart
    v-if="viewType == 'chart' && resultsData.length"
    :result="resultsData"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ResultsTable from '../components/test/ResultsTable.vue'
import Chart from '../components/test/Chart.vue'

import Score from '../components/test/Score'
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
  viewType: {
    type: String,
    required: true,
    validator: (value) => {
      return ['table', 'chart'].includes(value)
    },
  },
})

const resultsData = computed(() => {
  if (!userAnswers.value) return []

  const score = new Score(props.schemas, userAnswers.value.answers)
  const calculatedResults = score.calculate()

  return calculatedResults
})

onMounted(() => {
  if (!props.result) return
  // Decode and decompress the result parameter
  const decodedAnswers = converter.decode(props.result)
  userAnswers.value = AnswerCompressor.decompress(decodedAnswers)
})
</script>
