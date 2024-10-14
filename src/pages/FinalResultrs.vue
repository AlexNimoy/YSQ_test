<template>
  <h1>FinalResultrs</h1>
  <!-- {{ result.answers }} -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  result: {
    type: Object,
    required: true,
  },
})
</script>
