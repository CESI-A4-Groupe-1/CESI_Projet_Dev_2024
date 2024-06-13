<script lang="ts">
import {defineComponent} from 'vue'
import '@/assets/main.css'

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
</style>