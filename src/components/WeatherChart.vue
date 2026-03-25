<template>
  <div class="chart-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ data: any[] }>();
const { t, locale } = useI18n();
const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

const updateChart = () => {
  if (!canvas.value) return;
  if (chart) chart.destroy();

  chart = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: props.data.map(i => i.dt_txt.split(' ')[1].slice(0, 5)),
      datasets: [{
        label: `${t('weather.temperature')} °C`,
        data: props.data.map(i => i.main.temp),
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
};

onMounted(updateChart);
watch(() => props.data, updateChart, { deep: true });
watch(locale, updateChart);
</script>

<style scoped>
.chart-wrapper { height: 200px; width: 100%; margin-top: 20px; }
</style>
