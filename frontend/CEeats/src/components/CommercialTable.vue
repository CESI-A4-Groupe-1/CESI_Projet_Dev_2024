<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


export default defineComponent({
  name: 'CommercialTable',
  components: {
    DataTable,
    Column
  },
  data() {
    return {
      orders: [
        { restaurant: 'Whammers', client: 'Patrick L.', livreur: 'Chris', etat: 'Préparation', prix: '29€' },

      ]
    };
  }
});
</script>

<template>
  <div>
    <div>
      <h2>Historique</h2>
      <p></p>
    </div>
    <div>
      <DataTable :value="orders" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="restaurant" header="Restaurant" sortable></Column>
        <Column field="client" header="Client" sortable></Column>
        <Column field="livreur" header="Livreur" sortable></Column>
        <Column field="etat" header="État" sortable></Column>
        <Column field="prix" header="Prix" sortable></Column>
      </DataTable>
        <!--
        <thead class="pi pi-thead">
        <tr>
          <th>Restaurant</th>
          <th>Client</th>
          <th>Livreur</th>
          <th>Etat</th>
          <th>Prix</th>
        </tr>
        </thead>
        <tbody class="pi pi-tbody">
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ order.restaurant }}</td>
          <td>{{ order.client }}</td>
          <td>{{ order.livreur }}</td>
          <td>{{ order.etat }}</td>
          <td>{{ order.prix }}</td>
        </tr>
        </tbody-->
    </div>
  </div>

</template>


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
