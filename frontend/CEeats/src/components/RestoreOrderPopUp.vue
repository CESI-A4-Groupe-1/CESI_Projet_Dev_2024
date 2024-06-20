<template>
  <div class="popup" v-if="isVisible">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <h3>Commande #{{ command.id }}</h3>
      <p>Status: <span :class="statusClass">{{ command.status }}</span></p>
      <p>Faite le: {{ command.date }}</p>
      <div>
        <ul>
          <li v-for="item in command.items" :key="item.itemId">
            {{ item.quantity }}x {{ item.name }} - {{ item.price }}$
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    command: {
      type: Object,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
    }
  },
  computed: {
    statusClass() {
      return {
        'enCours': 'status-encours',
        'finalisee': 'status-finalisee'
      }[this.command.status] || 'status-default';
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 600px;
}

.close {
  position: absolute;
  top: auto;
  left: auto;
  cursor: pointer;
}

</style>
