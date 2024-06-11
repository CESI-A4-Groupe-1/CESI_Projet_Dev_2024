<script setup lang="ts">
import RestaurantCard from "@/components/RestaurantCard.vue";
import Restaurant from "@/models/Restaurant"
</script>

<script>


export default {
  mounted: function () {
    this.stored_Restaurants = (new Restaurant()).getAll()
  },
  data() {
    return {
      stored_Restaurants: [],
    }
  }
}
</script>


<template>
  <div class="restaurant_card" v-for="(restaurant, i) in 6" :key="i">
    <RouterLink class="restaurant_card_link" to="/restaurants/1">
      <RestaurantCard></RestaurantCard>
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