<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: "RestorerOrderCard",
  props: {
    command: {
      type: Object as PropType<{
        id: number;
        detaille: string;
        client: string;
        livreur: string;
      }>,
      required: true
    }
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
    }
  }
});

</script>

<template>
  <div class="order_card_container">
    <div class="order_card_info">
      <p>{{ command.detaille }}</p>
      <!--Rajouter une liste des article ici-->
      <p>Client: {{ command.client }}</p>
      <p>Livreur: {{ command.livreur }}</p>
    </div>
    <div class="order_card_container_btn">
      <div>
        <button> <!--@click="validerCommande(command.id)"-->Valider</button>
      </div>
      <div>
        <button> <!--@click="validerCommande(command.id)"-->Refuser</button>
      </div>
      <div>
        <button> <!--@click="finaliserCommande(command.id)"-->Finaliser</button>
      </div>
      <div>
        <button> <!--@click="annulerCommande(command.id)"-->Annuler</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order_card_container {
  display: flex;
}
.order_card_container_btn {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  //width : 100%;
}
.order_card_info {
  flex-basis: 70%;
}
button {
  width : 100%;
  align-self: center;
  justify-self: center;
}
</style>