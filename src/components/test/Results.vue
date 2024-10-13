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

<script setup lang="ts">
import { computed } from 'vue'
import Score from './Score'
import { UserAnswer, Schema } from './types'

const props = defineProps<{
  schemas: Schema[]
  userAnswers: UserAnswer[]
}>()

const resultsData = computed(() => {
  const score = new Score(props.schemas, props.userAnswers)
  return score.calculate()
})
</script>
