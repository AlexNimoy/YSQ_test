<template>
  <div class="chart-container">
    <Bar :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  result: {
    type: Array,
    required: true,
  },
})

const chartData = computed(() => ({
  labels: props.result.map((item) => item.name),
  datasets: [
    {
      label: 'Выраженность схемы %',
      data: props.result.map((item) => Number(item.percentageExpression)),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Доля 5 и 6 %',
      data: props.result.map((item) => Number(item.percentageSpecificScores)),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
}))

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF',
      },
    },
    title: {
      display: true,
      text: 'Схемы',
      color: '#FFFFFF',
      font: {
        size: 18,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#FFFFFF',
      bodyColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      stacked: true,
      ticks: {
        color: '#FFFFFF',
        autoSkip: false,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    x: {
      ticks: {
        color: '#FFFFFF',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
