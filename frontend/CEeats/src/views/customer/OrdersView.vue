<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import OrderCard from "@/components/OrderCard.vue";
import OrderDetailsModal from '@/components/OrderDetailsModal.vue';
import { OrderService } from '@/services/OrderService'
import { useRoute } from "vue-router";

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
    const orders = ref<any[]>([]);

    const selectOrder = (order: any) => {
      selectedOrder.value = order;
      showOrderDetails.value = true;
    };

    const closeModal = () => {
      showOrderDetails.value = false;
      selectedOrder.value = null;
    };

    onMounted(() => {
      OrderService.getOrders(userId.value)
          .then(res => {
            orders.value = res.data;
            console.log(res.data);
          })
          .catch(err => console.log(err));
    });

    const ordersByStatus = computed(() => {
      const groupedOrders: Record<string, any[]> = {
        "Commande non validée": [],
        "En préparation": [],
        "Livrée": []
      };

      orders.value.forEach(order => {
        const status = OrderService.getOrderStatus(order);
        if (groupedOrders[status]) {
          groupedOrders[status].push(order);
        }
      });

      return groupedOrders;
    });

    return {
      orders,
      selectedOrder,
      showOrderDetails,
      selectOrder,
      closeModal,
      ordersByStatus
    };
  }
});
</script>

<template>
  <main v-if="orders">
    <!-- Section pour "Commande non validée" -->
    <section v-if="ordersByStatus['Commande non validée'].length">
      <h2>Commandes non validées</h2>
      <div class="order" v-for="(order, i) in ordersByStatus['Commande non validée']" :key="i" @click="selectOrder(order)">
        <OrderCard :order="order"></OrderCard>
      </div>
    </section>

    <!-- Section pour "En préparation" -->
    <section v-if="ordersByStatus['En préparation'].length">
      <h2>Commandes en préparation</h2>
      <div class="order" v-for="(order, i) in ordersByStatus['En préparation']" :key="i" @click="selectOrder(order)">
        <OrderCard :order="order"></OrderCard>
      </div>
    </section>

    <!-- Section pour "Livrée" -->
    <section v-if="ordersByStatus['Livrée'].length">
      <h2>Commandes livrées</h2>
      <div class="order" v-for="(order, i) in ordersByStatus['Livrée']" :key="i" @click="selectOrder(order)">
        <OrderCard :order="order"></OrderCard>
      </div>
    </section>

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
