<script setup lang="ts">
  import SingleCategory from "@/components/CategoryCard.vue";
</script>

<template>
    <RouterLink class="category_row" to="/resultats">
      <SingleCategory v-for="(category, i) in 2" :key="i"/>
    </RouterLink>
</template>

<style scoped>
.category_row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0;
}

</style>