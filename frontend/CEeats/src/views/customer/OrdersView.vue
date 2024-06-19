<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import OrderDetailsModal from '@/components/OrderDetailsModal.vue';
import { OrderService } from '@/services/OrderService'
import {useRoute} from "vue-router";

export default defineComponent({
  name: "OrdersView",
  components: {
    OrderCard,
    OrderDetailsModal
  },
  props: {},
  setup() {
    const route = useRoute();
    const userId = ref<string>(route.params.id as string);
    const selectedOrder = ref(null);
    const showOrderDetails = ref(false);
    let orders = ref([]);

    const selectOrder = (order) => {
      selectedOrder.value = order;
      showOrderDetails.value = true;
    };

    const closeModal = () => {
      showOrderDetails.value = false;
      selectedOrder.value = null;
    };

    onMounted( () => {
        OrderService.getOrders(userId.value)
            .then(res => {
              orders.value = res.data;
              console.log(res.data);
            })
            .catch(err => console.log(err));
    })

    return {
      orders,
      selectedOrder,
      showOrderDetails,
      selectOrder,
      closeModal
    };
  }
})
</script>

<template>
  <main v-if="orders">
    <div class="order" v-for="(order, i) in orders" :key="i" @click="selectOrder(order)">
      <OrderCard :order="order"></OrderCard>
    </div>
    <OrderDetailsModal v-if="showOrderDetails" :order="selectedOrder" @close="closeModal"></OrderDetailsModal>
  </main>
</template>

<!--TODO : styliser la page-->
<style scoped>
.modal {
  max-width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.80);
  z-index: 999;
}
</style>