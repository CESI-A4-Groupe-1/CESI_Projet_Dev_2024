<script setup lang="ts">
import RestorerOrderCard from "@/components/RestorerOrderCard.vue";

interface Command {
  id: string;
  detaille: string,
  client: string;
  livreur: string;
}

interface Commands {
  [key: string]: Command;
}

const commands : Commands = {
  command1: {
    id: 1,
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe"
  },
  command2: {
    id: 2,
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe"
  }
};

</script>

<template>
  <div>
    <div>
      <RestorerOrderCard v-for="(command,i) in commands" :key="i" :command="command"></RestorerOrderCard>
    </div>
  </div>
</template>

<style scoped>

</style>