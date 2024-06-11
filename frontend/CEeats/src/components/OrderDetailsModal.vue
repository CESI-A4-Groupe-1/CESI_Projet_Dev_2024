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
      <h2>{{ order.name }}</h2>
      <p>{{ order.details }}</p>
      <button @click="$emit('close')">Fermer</button>
    </div>
  </div>
</template>

<style scoped>
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