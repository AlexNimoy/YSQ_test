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
      <tr v-for="schema in schemas" :key="schema.id">
        <td>{{ schema.id }}</td>
        <td>{{ schema.name }}</td>
        <td>
          {{
            getFilteredAnswers(schema.id)
              .map((answer) => answer.answer_score)
              .join(', ')
          }}
        </td>
        <td>{{ getSumOfScores(schema.id) }}</td>
        <td>{{ getPercentageExpression(schema.id) }}%</td>
        <td>{{ getSumOfSpecificScores(schema.id) }}</td>
        <td>{{ getPercentageSpecificScores(schema.id) }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from 'vue'

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

// Caching filtered answers for each schema
const cachedFilteredAnswers = computed(() => {
  const result = {}
  props.schemas.forEach((schema) => {
    result[schema.id] = props.userAnswers.filter(
      (answer) => answer.schema_id === schema.id
    )
  })
  return result
})

// Helper functions to improve performance and structure
const getFilteredAnswers = (schemaId) => {
  return cachedFilteredAnswers.value[schemaId] || []
}

// Calculate the sum of all scores for a given schema
const getSumOfScores = (schemaId) => {
  return getFilteredAnswers(schemaId).reduce(
    (sum, answer) => sum + answer.answer_score,
    0
  )
}

// Calculate the percentage expression for a given schema
// Formula: (sum of scores - 5) / 25 * 100
const getPercentageExpression = (schemaId) => {
  return (((getSumOfScores(schemaId) - 5) / 25) * 100).toFixed(2)
}

// Calculate the sum of scores that are either 5 or 6 for a given schema
const getSumOfSpecificScores = (schemaId) => {
  return getFilteredAnswers(schemaId)
    .filter((answer) => answer.answer_score === 5 || answer.answer_score === 6)
    .reduce((sum, answer) => sum + answer.answer_score, 0)
}

// Calculate the percentage of scores that are either 5 or 6 for a given schema
// Formula: (number of scores equal to 5 or 6) / 5 * 100
const getPercentageSpecificScores = (schemaId) => {
  return (
    (getFilteredAnswers(schemaId).filter(
      (answer) => answer.answer_score === 5 || answer.answer_score === 6
    ).length /
      5) *
    100
  ).toFixed(2)
}
</script>
