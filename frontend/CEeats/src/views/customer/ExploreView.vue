  <script lang="ts">
  import {defineComponent} from 'vue'
  import RowCategory from "@/components/CategoryRow.vue";

  export default defineComponent({
    name: "OrdersView",
    components: {
      RowCategory
    },
    props: {},
    setup(props, { emit }) {

    }
  })
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
  .category_rows {
    margin-bottom: 20px;
  }
</style>