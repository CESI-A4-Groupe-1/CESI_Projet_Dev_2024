<script setup>
import defaultImage from '@/assets/no-image.jpg';
</script>

<script>
export default {
  name: "RestaurantCard",
  components: {
  },
  data() {
    return {

    }

  },
  props: {
    restaurant: Object,
  }
}
</script>

<template>
  <div class="restaurant_card">
    <img :src="restaurant.image ? restaurant.image : defaultImage" :alt="restaurant.nom">
    <div class="restaurant_info">
      <div class="restaurant_card_head">
        <p class="name">{{ restaurant.nom }}</p>
        <p class="note">
          <span>
            4.4
          </span>
        </p>
      </div>
      <p class="time">20-50 min</p>
      <p class="category">Catégorie</p>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.restaurant_card {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
  overflow: hidden;
  .restaurant_info {
    width: 100%;
    padding: 10px;
    .restaurant_card_head {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
}

.restaurant_card:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

img {
  padding: 1rem;
  height: 60px;
}
p {
  margin: 0;
}
.time, .category {
  font-size: smaller;
}

.note {
  background-color: #eeeeee;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  border-radius: 50%;
}

</style>