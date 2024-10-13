<template>
  <div class="chart-container">
    <Bar :options="chartOptions" :data="chartData" />
  </div>
</template>

<script setup>
import schemas from '../../data/schemas.json'
import { reactive } from 'vue'
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

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Define reactive chart data
const chartData = reactive({
  labels: schemas.map((item) => item.name),
  datasets: [
    {
      label: 'Выраженность схемы %',
      data: schemas.map(() => Math.floor(Math.random() * 51)), // Первая часть столбика
      backgroundColor: 'rgba(153, 102, 255, 0.6)', // Светло-фиолетовый
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Доля 5 и 6 %',
      data: schemas.map(() => Math.floor(Math.random() * 51)), // Вторая часть столбика
      backgroundColor: 'rgba(54, 162, 235, 0.6)', // Голубой
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
})

// Define reactive chart options
const chartOptions = reactive({
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF', // Цвет текста легенды
      },
    },
    title: {
      display: true,
      text: 'Схемы',
      color: '#FFFFFF', // Цвет текста заголовка
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
    x: {
      ticks: {
        color: '#FFFFFF', // Цвет подписей оси X
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Цвет сетки оси X
      },
    },
    y: {
      ticks: {
        color: '#FFFFFF', // Цвет подписей оси Y
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)', // Цвет сетки оси Y
      },
    },
  },
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 20px;
  border-radius: 8px;
}
</style>
