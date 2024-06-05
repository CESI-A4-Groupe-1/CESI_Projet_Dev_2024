<script setup lang="ts">
  import RestaurantCard from "@/components/RestaurantCard.vue";
</script>

<template>
  <div class="restaurant_card" v-for="(restaurant, i) in 6" :key="i">
    <RestaurantCard></RestaurantCard>
  </div>
</template>

<style lang="scss" scoped>
.restaurant_card {
  width: 100%;
  margin-bottom: 20px;
}

.restaurant_card:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>