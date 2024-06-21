<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RestoreOrderPopUp from "@/components/RestoreOrderPopUp.vue";

export default defineComponent({
  name: "RestorerOrderCard",
  components: {RestoreOrderPopUp},
  component: {
    RestoreOrderPopUp
  },
  props: {
    command: {
      type: Object as PropType<{
        id: number;
        detaille: string;
        client: string;
        livreur: string;
        status: string;
        items: {
          itemId: number;
          name: string;
          quantity: number;
          price: number;
        }[];
      }>,
      required: true
    },
      showButtons: {
        type: Boolean,
        default: true
      }
  },
  data() {
    return {
      isPopupVisible: false // State to control popup visibility
    };
  },

  methods: {

    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    }
  }
});

</script>

<template>
  <div class="p-card">
    <div class="order_card_container">
      <div class="order_card_info" @click="togglePopup">
        <p>{{ command.detaille }}</p>
        <!--Rajouter une liste des article ici-->
        <!--p>Client: {{ command.client }}</p-->
        <!--p>Livreur: {{ command.livreur }}</p-->
        <div>
          <ul class="overflow-item">
            <li v-for="item in command.items" :key="item.name">
              {{ item.quantity }}x {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <RestoreOrderPopUp
          :isVisible="isPopupVisible"
          :command="command"
          @close="togglePopup"
      />
    </div>
  </div>

</template>

<style scoped>

p, li {
  color: white;
}
.p-card {
  background-color: #04aa6d;
  margin: 10px 20px 10px 10px;
}
.order_card_container {
  display: flex;
  width: 100%
}
.order_card_container_btn {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  //width : 100%;
}
.order_card_info {
  flex-basis: 70%;
  padding-left: 5%;
}
button {
  width : 100%;
  align-self: center;
  justify-self: center;
  height: 10vh;
}
.overflow-item{
  overflow: clip;
}
</style>