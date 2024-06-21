<template>
  <div>
    <div class="sales-summary">
      <h2>Chiffre d'affaires : 1234 €</h2>
      <p>{{ currentDate }}</p>
    </div>
    <div>
      <bar-chart :data="chartData" :options="chartOptions"></bar-chart>
    </div>
    <div class="time-filters">
      <Button @click="setTimeFilter('week')">Semaine</Button>
      <Button @click="setTimeFilter('month')">Mois</Button>
      <Button @click="setTimeFilter('semester')">Semestre</Button>
      <Button @click="setTimeFilter('year')">Année</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Bar } from 'vue-chartjs';
import { ChartOptions } from 'chart.js';
import Button from "primevue/button";

export default defineComponent({
  name: 'SalesInfo',
  components: {
    'bar-chart': Bar,
    Button
  },
  data() {
    return {
      chartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#04aa6d',
            data: [40, 20, 12, 39, 10, 40]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      } as ChartOptions,
      currentDate: this.getCurrentDate()
    };
  },
  methods: {
    setTimeFilter(period: string) {
      console.log(`Filter set to ${period}`);
      // Update the chartData based on the selected time filter
    },
    getCurrentDate(): string {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Janvier est 0!
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
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
