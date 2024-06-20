<script lang="ts">
import ChartComponent from "@/components/ChartComponent.vue";

export default {
  components: {
    ChartComponent
  }
}
</script>

<template>
  <main class="main">
    <div>
      <div class="section">
        <h2>Performances serveurs</h2>
        <div class="charts-row">
          <ChartComponent v-for="n in 2" :key="'server-' + n"></ChartComponent>
        </div>
      </div>
      <div class="section">
        <h2>Performances microservices</h2>
        <div class="charts-row">
          <ChartComponent v-for="n in 4" :key="'microservice-' + n"></ChartComponent>
        </div>
      </div>
      <div class="section">
        <h2>Performances microservices</h2>
        <div class="charts-row">
          <ChartComponent v-for="n in 4" :key="'microservice-2-' + n"></ChartComponent>
        </div>
      </div>
    </div>
  </main>
</template>


<style>
.main {
  padding: 20px;
}

.section {
  margin-bottom: 40px;
}

.charts-row {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.charts-row > * {
  margin: 10px;
}
</style>
