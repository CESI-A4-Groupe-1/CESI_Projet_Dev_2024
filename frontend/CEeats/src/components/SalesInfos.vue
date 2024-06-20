<template>
  <div>
    <div class="sales-summary">
      <h2>Chiffre d'affaires : 1234 €</h2>
      <p>31/05/24</p>
    </div>
    <div>
      <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
    </div>
    <div class="time-filters">
      <button @click="setTimeFilter('week')">Semaine</button>
      <button @click="setTimeFilter('month')">Mois</button>
      <button @click="setTimeFilter('semester')">Semestre</button>
      <button @click="setTimeFilter('year')">Année</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import { ChartOptions } from 'chart.js';

export default defineComponent({
  name: 'SalesInfo',
  components: {
    'bar-chart': Bar
  },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      } as ChartOptions
    };
  },
  methods: {
    setTimeFilter(period: string) {
      console.log(`Filter set to ${period}`);
      // Update the chartData based on the selected time filter
    }
  }
});
</script>

<style scoped>
.sales-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-filters {
  display: flex;
  justify-content: space-around;
}
</style>
