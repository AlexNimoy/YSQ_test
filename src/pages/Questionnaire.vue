<template>
  <div>
    <div class="questions">
      <section v-for="question in questions" :key="question.id">
        <h3>{{ question.question }}</h3>
        <Answers
          :answers="answers_list"
          v-model="userAnswers"
          :question="question"
        />
      </section>
    </div>
    <div class="footer">
      <div class="results">
          <router-link 
          v-if="userAnswers.length === questions.length" 
          to="/result" 
          class="button"
        >
          📊 Просмотр результата
        </router-link>
        <div v-else>
          Осталось ответить на {{ questions.length - userAnswers.length }} из {{ questions.length }}
        </div>
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

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
.results {
  background-color: var(--bg);
  display: inline-block;
  padding: 10px;
}
</style>
