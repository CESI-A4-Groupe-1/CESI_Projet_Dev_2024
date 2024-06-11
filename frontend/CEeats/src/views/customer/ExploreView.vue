<script setup lang="js">
import CategoryService from "@/services/CategoryService.js";
import CategoryCard from "@/components/CategoryCard.vue";
</script>

<script lang="js">
import CategoryService from "@/services/CategoryService.js";

export default {
  data() {
    return {
      categories_array: [],
    }
  },
  components: {
    CategoryCard,
  },
  methods: {
    //TODO : fonction de recherche pour l'élément 'search' ou utilisation d'un composant déjà existant (potentiellement primevue)
  },
  mounted() {
    //TODO : utiliser cette section comme l'équivalent d'un évènement "onready" de HTML basique pour envoyer un fetch au serveurs de catégories
    this.categories_array = CategoryService.getAllCategories();
  },
}
</script>


<template>
  <main>
    <input class="search" placeholder="Search"/>
    <h2 class="topCategories">Top Categories</h2>
    <div class="category_container">
      <CategoryCard v-for="(category, i) in categories_array" :key="i" :tag-name='category.name' :category_id="category.id" style="margin: 5px"></CategoryCard>
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