<template>
  <div>
    <Chart />
    <Results :schemas="schemas" :userAnswers="userAnswers" />
    <div class="questions">
      <div v-for="question in questions" :key="question.id">
        <p>
          {{ question.id }} - {{ question.schema_id }} {{ question.question }}
        </p>
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
import schemas from '../data/schemas.json'
import Answers from '../components/test/Answers.vue'
import Results from '../components/test/Results.vue'
import Chart from '../components/test/Chart.vue'

const userAnswers = ref([])
</script>
