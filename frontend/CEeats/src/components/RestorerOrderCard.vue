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
    validerCommande(id) {
      console.log(`Commande ${id} validée`);
    },
    refuserCommande(id) {
      console.log(`Commande ${id} refusée`);
    },
    finaliserCommande(id) {
      console.log(`Commande ${id} finalisée`);
    },
    annulerCommande(id) {
      console.log(`Commande ${id} annulée`);
    },
    togglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    }
  }
});

</script>

<template>
  <div class="order_card_container">
    <div class="order_card_info" @click="togglePopup">
      <p>{{ command.detaille }}</p>
      <!--Rajouter une liste des article ici-->
      <p>Client: {{ command.client }}</p>
      <p>Livreur: {{ command.livreur }}</p>
      <div>
        <ul>
          <li v-for="item in command.items" :key="item.name">
            {{ item.quantity }}x {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="order_card_container_btn">
      <div v-if="showButtons">
        <button v-if="command.status === 'enCours' "> <!--@click="validerCommande(command.id)"-->Valider</button>
      </div>
      <div v-if="showButtons">
        <button v-if="command.status === 'enCours'"> <!--@click="validerCommande(command.id)"-->Refuser</button>
      </div>
      <div v-if="showButtons">
        <button v-if="command.status === 'finalisee'"> <!--@click="finaliserCommande(command.id)"-->Finaliser</button>
      </div>
      <div v-if="showButtons">
        <button v-if="command.status === 'finalisee'"> <!--@click="annulerCommande(command.id)"-->Annuler</button>
      </div>
    </div>
    <RestoreOrderPopUp
        :isVisible="isPopupVisible"
        :command="command"
        @close="togglePopup"
    />
  </div>
</template>

<style scoped>
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
}
</style>