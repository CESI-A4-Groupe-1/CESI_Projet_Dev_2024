<script setup lang="ts">
import ChoiceCard from "@/components/ChoiceCard.vue";

interface Card {
  nom: string;
  icon: string;
}

interface Cards {
  [key: string]: Card;
}

const cards : Cards = {
    card1: {
      nom: "Commandes",
      icon: "fa-solid fa-fire-burner fa-6x"
    },
    card2: {
      nom: "Livraisons",
      icon: "fa-solid fa-truck fa-7x"
    },
    card3: {
      nom: "Gestion des menus",
      icon: "fa-solid fa-utensils fa-7x"
    },
    card4: {
      nom: "Statistiques",
      icon: "fa-solid fa-chart-line fa-7x"
    }
};


</script>

<template>
  <div class="list_choice">
    <ChoiceCard v-for="(card, i) in cards" :key="i" :card="card"></ChoiceCard>
  </div>
</template>

<style scoped>
.list_choice {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 10px;
}

@media (max-width: 768px) {
  .list_choice {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}


</style>