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
      <CategoryCard v-for="(category, i) in categories_array" :key="i" :tag-name='category.titre' :category_id="category.id" :image="category.image" style="margin: 5px" class="category_card"></CategoryCard>
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
  justify-content: center;
  align-items: center;
  align-content: stretch;
}

.category_card {
  flex: 0 1 calc(33.33% - 10px); /* Pour avoir 3 cartes par ligne avec marges */
  margin: 10px; /* Marge entre les cartes */
  max-width: calc(33.33% - 10px); /* Largeur maximale pour chaque carte */
}
</style>