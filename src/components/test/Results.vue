<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Scores</th>
        <th>Σ</th>
        <th>Σ1</th>
        <th>Σ2</th>
        <th>Σ3</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="data in resultsData" :key="data.id">
        <td>{{ data.id }}</td>
        <td>{{ data.name }}</td>
        <td>{{ data.scores.join(', ') }}</td>
        <td>{{ data.sumOfScores }}</td>
        <td>{{ data.percentageExpression }}%</td>
        <td>{{ data.sumOfSpecificScores }}</td>
        <td>{{ data.percentageSpecificScores }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import Score from './Score.js'

const props = defineProps({
  schemas: {
    type: Array,
    required: true,
  },
  userAnswers: {
    type: Array,
    default: () => [],
  },
})

const resultsData = ref([])

watchEffect(() => {
  const score = new Score(props.schemas, props.userAnswers)
  resultsData.value = score.calculate()
})
</script>
