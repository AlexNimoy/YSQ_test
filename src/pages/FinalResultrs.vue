<template>
  <div>
    <Chart v-if="resultsData.length" :result="resultsData" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Chart from '../components/test/Chart.vue'
import Score from '../components/test/Score'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
  schemas: {
    type: Array,
    required: true,
  },
})

const resultsData = computed(() => {
  if (!props.result?.answers) return []

  const score = new Score(props.schemas, props.result.answers)
  const calculatedResults = score.calculate()

  return calculatedResults
})
</script>
