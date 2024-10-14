<template>
  <SharedResults
    v-if="sharedResultParams"
    :result="sharedResultParams"
    :schemas="schemas"
  />
  <FinalResultrs :result="testAnswers" v-else :schemas="schemas" />
  <ResultLink :result="testAnswers" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import schemas from '../data/schemas.json'
import LocalStorageService from '../store/LocalStorageService'
import SharedResults from '../pages/SharedResults.vue'
import FinalResultrs from '../pages/FinalResultrs.vue'
import ResultLink from '../components/ResultLink.vue'

const storageService = new LocalStorageService('testAnswers', { answers: [] })

const route = useRoute()
const testAnswers = ref({})
const sharedResultParams = ref(null)

onMounted(() => {
  const savedData = storageService.load()
  testAnswers.value = savedData

  const resultParam = route.query.result
  sharedResultParams.value = resultParam
})
</script>
