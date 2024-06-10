<script lang="ts">
import {defineComponent} from "vue";
import RestaurantList from "@/components/RestaurantList.vue";
import FilterButton from "@/components/FilterButton.vue";

export default defineComponent({
  name: "CategoryThumbnail",
  components: {
  },
  data() {
    return {

    }
  },
  props: {
    category_id: Number
  },

})
</script>

<template>
    <RouterLink :to="'/resultats/' + category_id" class="category_thumbnail">
<!--      from: https://www.flaticon.com/fr/icone-gratuite/fast-food_3787263-->
      <img src="https://cdn-icons-png.flaticon.com/512/3787/3787263.png" alt="fast food">
      <p class="category_name">Catégorie {{ category_id }}</p>
  </RouterLink>
</template>

<style scoped>
.category_thumbnail {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  color: black ;
  text-decoration: none;
  img {
    width: 60px;
  }
  .category_name {
    font-size: smaller;
    flex-wrap: wrap;
  }
}

</style>