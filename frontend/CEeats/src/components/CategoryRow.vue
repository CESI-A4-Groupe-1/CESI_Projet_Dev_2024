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
  flex-direction: row;
  align-items: center;
}

</style>