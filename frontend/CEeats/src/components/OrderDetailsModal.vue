<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "OrderDetailsModal",
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  emits: ['close']
})
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <Button icon="pi pi-times" class="close" severity="secondary" text rounded aria-label="Bookmark" @click="$emit('close')"></Button>
      <h2>Commande : {{ order.id }}</h2>
      <p class="status">Status : {{  }}</p>
      <p>Fait le :</p>
      <br>
      <p class="content">Contenu :</p>
      <div class="details">
        <p class="articles">{{nbr}}x{{article}}</p>
        <p class="price">{{price}}€</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.close {
  float: right;
}

.details {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  width: 80%;
  max-width: 500px; /* Limiter la largeur maximum */
  height: 80%;
  max-height: 80%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  position: relative;
}
</style>