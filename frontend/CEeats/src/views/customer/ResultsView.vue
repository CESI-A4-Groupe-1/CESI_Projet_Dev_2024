<script lang="ts">
import CategoryService from "@/services/CategoryService";
import RestaurantList from "@/components/RestaurantList.vue";
import CategoryThumbnail from "@/components/CategoryThumbnail.vue";
import FilterButton from "@/components/FilterButton.vue";
import {RestaurantService} from "@/services";
import {defineComponent, ref} from "vue";
import {useRoute} from "vue-router";


export default defineComponent({
  name: "Results",
  components: {
    CategoryThumbnail,
    RestaurantList,
    FilterButton,
  },
  data() {
    return {
      categories_array: [],
      restaurants_array: [],
      route: useRoute()
    }
  },
  props: {
    //TODO : Récupérer la catégorie

    //TODO : Récupérer la valeur des filtres de 'FilterButton'
  },
  async mounted() {
    //get category_id from url
    //TODO : Fonction de recherche. Retourne restaurants.

    //TODO : Fonction get_restaurants_by_category() à partir de la catégories récupérée. Passer la valeur au composant 'RestaurantList'.
    RestaurantService.getRestaurantByCategory(this.route.params.id_category)
        .then(res => {
          this.restaurants_array = res.data;
          console.log(res.data);
        })
        .catch(err => console.log(err));

  },
})

</script>

<template>
  <main>
    <div class="return_and_search">
      <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
      <InputGroup>
        <InputText  placeholder="Search" />
      </InputGroup>
    </div>
    <div class="results_header">
      <h2 class="results">Résultats</h2>
      <p class="nbr_results">{{ restaurants_array.length }} résultats</p>
    </div>
    <div class="category_pills">
      <CategoryThumbnail v-for="(category, i) in categories_array" :key="i" :category_id="category.id" :category_name="category.name"></CategoryThumbnail>
    </div>
    <div class="filters">
      <p>Filters : </p>
      <FilterButton v-for="(filter, i) in 3" :key="i"></FilterButton>
    </div>
    <div class="restaurant_list">
<!--      FIXME : Définir la variable restaurants -->
      <RestaurantList :restaurants_array="restaurants_array"></RestaurantList>
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
    justify-content: center;

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