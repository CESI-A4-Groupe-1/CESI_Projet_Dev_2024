<script lang="ts">
import { defineComponent } from 'vue';
import RestorerSidebar from "@/components/RestorerSidebar.vue";
import RestorerList from "@/components/RestorerList.vue";
import PrimeVue from "primevue/config";
import Button from 'primevue/button';

export default defineComponent({
  name: 'RestorerhomeView',
  components: {
    RestorerSidebar,
    RestorerList,
  },
});
</script>

<template>
  <main class="p-p-4">
    <div class="p-card">
      <div class="p-grid">
        <div class="p-col-12 p-md-6">
          <RestorerList></RestorerList>
        </div>
        <div class="p-col-12 p-md-3">
          <RestorerSidebar></RestorerSidebar>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.p-cardA {
  background-color: #04AA6D; /* Couleur de fond verte */
  color: white; /* Texte en blanc */
  padding: 20px;
  border-radius: 8px;
}

.p-grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10%;
}

.p-col-12 {
  flex: 1 1 100%;
}

.p-md-3 {
  flex-basis : 25%;
}

.p-md-6 {
  flex-basis: 50%;
}

@media screen and (max-width: 768px) {
  .p-md-3{
    display: none;
  }
}
</style>
