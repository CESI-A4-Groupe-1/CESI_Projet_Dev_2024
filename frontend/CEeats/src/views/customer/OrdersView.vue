<script lang="ts">
import {defineComponent} from 'vue'
import OrderCard from "@/components/OrderCard.vue";

export default defineComponent({
  name: "OrdersView",
  components: {
    OrderCard
  },
  props: {},
  setup(props, { emit }) {

  }
})
</script>

<template>
  <main>
    <div class="order" v-for="(order, i) in 4" :key="i">
      <OrderCard></OrderCard>
    </div>
  </main>
</template>

<style scoped>

</style>