<template>
  <div class="chart-container">
    <Bar :options="getChartOptions(isDarkTheme)" :data="chartData" />
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

const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

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

const getChartOptions = (isDarkTheme) => {
  const mainColor = isDarkTheme ? '#FFFFFF' : '#000000'
  const secondaryColor = isDarkTheme ? '#000000' : '#FFFFFF'

  return {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: mainColor,
        },
      },
      title: {
        display: true,
        text: 'Схемы',
        color: mainColor,
        font: {
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: secondaryColor,
        titleColor: mainColor,
        bodyColor: mainColor,
        borderColor: mainColor,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          color: mainColor,
          autoSkip: false,
        },
        grid: {
          color: 'transparent',
        },
      },
      x: {
        ticks: {
          color: mainColor,
        },
        grid: {
          color: 'transparent',
        },
      },
    },
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
