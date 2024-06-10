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
  components: {
    CategoryCard,
  },
  methods: {
    //TODO : fonction de recherche pour l'élément 'search' ou utilisation d'un composant déjà existant (potentiellement primevue)
    //TODO : méthode get_category()
    getCategories() {
      this.categories_array = ["Cat1", "Cat2", "Cat3", "Cat4", "Cat5"];
    }
  },
  mounted() {
    //TODO : utiliser cette section comme l'équivalent d'un évènement "onready" de HTML basique pour envoyer un fetch au serveurs de catégories
    this.getCategories();
  },
}
</script>


<template>
  <main>
    <input class="search" placeholder="Search"/>
    <h2 class="topCategories">Top Categories</h2>
    <div class="category_container">
      <CategoryCard v-for="(row, i) in categories_array" :key="i" :tag-name='row' :category_id="1" style="margin: 5px"></CategoryCard>
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