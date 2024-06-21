<template>
  <div class="chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  mounted() {
    const ctx = this.$refs.chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line', // Line chart type
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7], // X-axis labels
        datasets: [{
          label: 'Performance Data',
          data: [100, 200, 300, 400, 500, 600, 700], // Y-axis data
          borderColor: 'green',
          backgroundColor: 'rgba(4,170,109,0.15)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }
}
</script>

<style>
.chart {
  width: 200px;
  height: 200px;
}
</style>
