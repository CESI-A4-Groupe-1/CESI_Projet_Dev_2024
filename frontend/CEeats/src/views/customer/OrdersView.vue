<script lang="ts">
import {defineComponent, ref} from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import OrderDetailsModal from '@/components/OrderDetailsModal.vue';

export default defineComponent({
  name: "OrdersView",
  components: {
    OrderCard,
    OrderDetailsModal
  },
  props: {},
  setup() {
    const selectedOrder = ref(null);
    const showOrderDetails = ref(false);

    const orders = [
      { id: 1, name: 'Order 1', details: 'Details for Order 1' },
      { id: 2, name: 'Order 2', details: 'Details for Order 2' },
      { id: 3, name: 'Order 3', details: 'Details for Order 3' },
      { id: 4, name: 'Order 4', details: 'Details for Order 4' }
    ];

    const selectOrder = (order) => {
      selectedOrder.value = order;
      showOrderDetails.value = true;
    };

    const closeModal = () => {
      showOrderDetails.value = false;
      selectedOrder.value = null;
    };

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
  <main>
    <div class="order" v-for="(order, i) in orders" :key="order.id" @click="selectOrder(order)">
      <OrderCard></OrderCard>
    </div>
    <OrderDetailsModal v-if="showOrderDetails" :order="selectedOrder" @close="closeModal"></OrderDetailsModal>
  </main>
</template>

<!--TODO : styliser la page-->
<style scoped>
.modal {
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