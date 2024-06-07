<script setup lang="js">
import CategoryCard from "@/components/CategoryCard.vue";
</script>

<script lang="js">
export default {
  data() {
    return {
      categories_array: [],
    }
  },
  mounted() {
    //TODO : utiliser cette section comme l'équivalent d'un évènement "onready" de HTML basique pour envoyer un fetch au serveurs de catégories
    this.categories_array = ["a", "b", "c", "d", "e", "f", "g", "h"]
  },
  methods: {}
}
</script>


<template>
  <main>
    <input class="search" placeholder="Search"></input>
    <h2 class="topCategories">Top Categories</h2>
    <div class="category_container">
      <CategoryCard v-for="(row, i) in categories_array" :key="i" :tag-name='row' style="margin: 5px"></CategoryCard>
    </div>

  </main>
</template>

<style scoped>
.search {
  width: 100%;
}

.category_container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: stretch;
}
</style>