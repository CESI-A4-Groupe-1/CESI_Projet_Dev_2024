<script setup lang="js">
import CategoryService from "@/services/CategoryService.js";
import CategoryCard from "@/components/CategoryCard.vue";
</script>

<script lang="js">
import {RestaurantService} from "@/services/index.js";

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
    RestaurantService.getAllCategories()
        .then(res => {
          this.categories_array = res.data;
        })
        .catch(err => console.log(err))
  },
}
</script>


<template>
  <main>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-search"></i>
      </InputGroupAddon>
      <InputText  placeholder="Search" />
    </InputGroup>
    <h2 class="topCategories">Top Categories</h2>
    <div class="category_container">
      <CategoryCard v-for="(category, i) in categories_array" :key="i" :tag-name='category.titre' :category_id="category.id" style="margin: 5px"></CategoryCard>
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