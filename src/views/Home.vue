<template>
  <div>
    <h1>Инструкция</h1>
    <p>
      Далее перечислены утверждения, с помощью которых Вы можете описать себя.
      Пожалуйста, прочитайте каждое утверждение и решите, насколько точно оно
      Вас характеризует.
    </p>
    <p>
      Если Вы не уверены, как ответить, основывайте свой ответ на том, как Вы
      <strong>ЧУВСТВУЕТЕ</strong>, а не на том, что вы считаете правильным.
    </p>
    <p>Выберите подходящий вариант ответа.</p>

    <router-link to="/test">
      {{ isTestEmpty ? 'Начать тест' : 'Продолжить тест' }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import LocalStorageService from '../store/LocalStorageService'

const isTestEmpty = ref(true)
const storageService = new LocalStorageService('testAnswers', { answers: [] })

onMounted(() => {
  isTestEmpty.value = storageService.is_empty()
})
</script>
