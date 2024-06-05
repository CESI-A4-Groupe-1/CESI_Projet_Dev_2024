<script setup lang="ts">
  import RowCategory from "@/components/CategoryRow.vue";
  import SingleCategory from "@/components/CategoryCard.vue";
</script>

<template>
  <main>
    <input class="search" placeholder="Search"></input>
    <h2 class="topCategories">Top Categories</h2>
    <div class="category_rows">
      <RowCategory v-for="(row, i) in 6" :key="i"></RowCategory>
    </div>
  </main>
</template>

<style scoped>
  .search {
    width: 100%;
  }
  .category_row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
</style>