<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { RestaurantService } from "@/services";
import { OrderService } from '@/services/OrderService'

export default defineComponent({
  name: "OrderCard",
  props: {
    order: Object as () => any,
  },
  setup(props) {
    const restaurant = ref<any>(null);

    onMounted(() => {
      RestaurantService.getRestaurant(props.order.id_restaurant)
          .then(res => {
            restaurant.value = res.data;
          })
          .catch(err => {
            console.error('Erreur lors de la récupération des informations du restaurant :', err);
          });
    });

    const totalOrderPrice = computed(() => {
      return props.order.commande_lists.reduce((total, item) => {
        return total + (item.id_article_article.prix * item.quantite);
      }, 0).toFixed(2);
    });

    const getOrderStatus = (order: any) => {
      return OrderService.getOrderStatus(order);
    };

    const getOrderStatusClass = (order: any) => {
      return OrderService.getOrderStatusClass(order);
    };

    return {
      restaurant,
      totalOrderPrice,
      getOrderStatus,
      getOrderStatusClass
    };
  }
});
</script>

<template>
  <div class="order_card">
    <div class="logo_and_info">
      <img v-if="restaurant" src="https://images.bfmtv.com/UDAdpp33jU96JAWSB1v2R8KbfUg=/0x0:1196x1192/600x0/images/-458880.jpg" :alt="restaurant.nom">
      <div class="info_order">
        <h2 class="restaurant" v-if="restaurant">{{ restaurant.nom }}</h2>
        <p class="address" v-if="restaurant">{{ restaurant.adresse }}</p>
        <p class="price" v-if="order">Prix : {{ totalOrderPrice }} €</p>
      </div>
    </div>
    <div class="status_command">
      <p :class="['status', getOrderStatusClass(order)]">Status : {{ getOrderStatus(order) }}</p>
      <p class="nbr_article">{{ order.commande_lists.length }} articles</p>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 90px;
  margin-left: 10px;
  margin-right: 10px;
}

.order_card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.order_card:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.status_command {
  width: 30%;
}

.logo_and_info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
