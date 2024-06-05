<script setup lang="ts">
  import SingleCategory from "@/components/CategoryCard.vue";
</script>

<template>
  <div class="category_row">
    <SingleCategory v-for="(category, i) in 2" :key="i"/>
  </div>
</template>

<style scoped>
.category_row {
  display: flex;
  flex-direction: row!important;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
}

</style>