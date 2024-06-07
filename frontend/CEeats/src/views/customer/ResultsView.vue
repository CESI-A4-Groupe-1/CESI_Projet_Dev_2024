<script lang="ts">
import RestaurantList from "@/components/RestaurantList.vue";
import CategoryThumbnail from "@/components/CategoryThumbnail.vue";
import FilterButton from "@/components/FilterButton.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "OrderCard",
  components: {
    CategoryThumbnail,
    RestaurantList,
    FilterButton,
  },
  props: {
    // TODO : Récupérer la catégorie
    //TODO : Récupérer la valeur des filtres de 'FilterButton'
  },
  setup(props, { emit }) {
    // Mettre le code ici
    //TODO : Fonction de recherche. Retourne restaurants.
    //TODO : Fonction get_restaurants_by_category() à partir de la catégories récupérer. Passer la valeur au composant 'RestaurantList'.
  }
})

</script>

<template>
  <main>
    <div class="return_and_search">
      <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
      <input class="search" type="text" placeholder="Search">
    </div>
    <div class="results_header">
      <h2 class="results">Résultats</h2>
      <p class="nbr_results">6 résultats</p>
    </div>
    <div class="category_pills">
      <CategoryThumbnail></CategoryThumbnail>
    </div>
    <div class="filters">
      <p>Filters : </p>
      <FilterButton v-for="(icons, i) in 3" :key="i"></FilterButton>
    </div>
    <div class="restaurant_list">
      <RestaurantList></RestaurantList>
    </div>
  </main>
</template>

<!--TODO : styliser la page-->
<style lang="scss" scoped>
  .return_and_search {
    display: flex;
    flex-direction: row;
    .search{
      width: 100%;
    }
  }

  .results_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .category_pills {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-behavior: smooth;
    justify-content: space-around;

    //put shadows on the side when overflow
    background:
        linear-gradient(to right, white 33%, rgba(255, 255, 255, 0)),
        linear-gradient(to left, white 33%, rgba(255, 255, 255, 0)) 100% 0,
        radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),
        radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)) 100% 0;
    background-color: white;
    background-repeat: no-repeat;
    background-attachment: local, local, scroll, scroll;
    background-size: 45px 100%, 45px 100%, 15px 100%, 15px 100%;
  }

  .filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    p {
      margin-right: 16px;
    }
  }
</style>