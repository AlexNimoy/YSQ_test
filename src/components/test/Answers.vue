<template>
  <div v-for="answer in answers" :key="answer.id">
    <label class="answer">
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
import { computed, onMounted } from 'vue'
import LocalStorageService from '../../store/LocalStorageService'

const storageService = new LocalStorageService('testAnswers', { answers: [] })

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

  storageService.save({ answers: updatedAnswers })
  emit('update:modelValue', updatedAnswers)
}

onMounted(() => {
  const savedData = storageService.load()
  const savedAnswers = savedData.answers || []
  if (savedAnswers.length > 0) {
    emit('update:modelValue', savedAnswers)
  }
})
</script>

<style scoped>
.answer {
  cursor: pointer;
}
</style>
