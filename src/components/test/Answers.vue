<template>
  <div v-for="answer in answers" :key="answer.id">
    <label>
      <input
        type="radio"
        :value="answer.id"
        :checked="answer.id === selectedAnswer"
        @change="() => updateAnswer(answer)"
      />
      {{ answer.description }}
    </label>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  question: {
    type: Object,
    required: true,
  },
})

// Логика выбора ответа
const selectedAnswer = computed(() => {
  return (
    props.modelValue.find((a) => a.question_id === props.question.id)
      ?.answer_id || null
  )
})

const updateAnswer = (selectedAnswer) => {
  const updatedAnswers = [...props.modelValue]
  const answerIndex = updatedAnswers.findIndex(
    (a) => a.question_id === props.question.id
  )

  if (answerIndex !== -1) {
    updatedAnswers[answerIndex].answer_id = selectedAnswer.id
    updatedAnswers[answerIndex].answer_score = selectedAnswer.score
  } else {
    updatedAnswers.push({
      question_id: props.question.id,
      schema_id: props.question.schema_id,
      answer_id: selectedAnswer.id,
      answer_score: selectedAnswer.score,
    })
  }

  emit('update:modelValue', updatedAnswers)
}
</script>
