<template>
  <div>
    <div class="questions">
      <div v-for="question in questions" :key="question.id">
        <p>{{ question.question }}</p>
        <Answers
          :answers="answers_list"
          v-model="userAnswers"
          :question="question"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import questions from '../data/questons.json'
import answers_list from '../data/answers.json'
import Answers from '../components/test/Answers.vue'

const userAnswers = ref([])
</script>
