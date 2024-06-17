<script setup>
</script>

<script>
import {defineComponent} from "vue";
import RestaurantCard from "@/components/RestaurantCard.vue";

export default defineComponent({
  name: "Results",
  components: {
    RestaurantCard
  },
  data() {
    return {
    }
  },
  props: {
    restaurants_array: Array
  },
  async mounted() {
  },

})
</script>

<template>
  <div class="restaurant_card" v-for="(restaurant, i) in restaurants_array" :key="i">
    <RouterLink class="restaurant_card_link" :to="'/restaurants/' + restaurant.id">
      <RestaurantCard :restaurant="restaurant"></RestaurantCard>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.restaurant_card {
  width: 100%;
  margin-bottom: 20px;
}

.restaurant_card_link {
  text-decoration: none;
  color: black;
}

</style>