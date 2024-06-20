<template>
  <table>
    <thead>
    <tr>
      <th>Restaurant</th>
      <th>Client</th>
      <th>Livreur</th>
      <th>Etat</th>
      <th>Prix</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(order, index) in orders" :key="index">
      <td>{{ order.restaurant }}</td>
      <td>{{ order.client }}</td>
      <td>{{ order.livreur }}</td>
      <td>{{ order.etat }}</td>
      <td>{{ order.prix }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommercialTable',
  data() {
    return {
      orders: [
        { restaurant: 'Whammers', client: 'Patrick L.', livreur: 'Chris', etat: 'Préparation', prix: '29€' },

      ]
    };
  }
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
}
</style>
