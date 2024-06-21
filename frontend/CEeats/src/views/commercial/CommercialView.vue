<script lang="ts">
import { defineComponent } from 'vue';
import CommercialTable from "@/components/CommercialTable.vue";
import SalesInfos from "@/components/SalesInfos.vue";

export default defineComponent({
  name: 'CommercialView',
  components: {
    CommercialTable,
    SalesInfos,
  }
});
</script>

<template>
  <main>
    <div class="dashboard">
      <CommercialTable></CommercialTable>
      <SalesInfos></SalesInfos>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  display: flex;
  justify-content: space-between;
  margin-left:15%;
}
</style>