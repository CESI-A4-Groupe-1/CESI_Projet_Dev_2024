<script setup lang="ts">
import RestorerOrderCard from "@/components/RestorerOrderCard.vue";
import { defineProps } from 'vue';
import { defineComponent} from "vue";

const props = defineProps<{
  title: boolean;
  //commandes: Command[];
}>();

const ordercard = defineComponent({
  components: {
    RestorerOrderCard
  }
})

interface Command {
  id: string;
  detaille: string,
  client: string;
  livreur: string;
  status: string;
}

interface Commands {
  [key: string]: Command;
}

const commands : Commands = {
  command1: {
    id: 1,
    detaille: "Commande 1",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "enCours",
    items: [
      {
        articleId: 101,
        name: " Bruschetta",
        quantity: 2,
        price:  5.5
      },
      {
        articleId: 102,
        name: "Spaghetti Carbonara",
        quantity: 1,
        price: 12
      },
      {
        articleId: 103,
        name: "Sushi de Saumon ",
        quantity: 3,
        price:  8.5
      },
      {
        articleId: 101,
        name: "Ramen",
        quantity: 2,
        price: 10
      }
    ]
  },
  command2: {
    id: 2,
    detaille: "Commande 2",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "finalisee",
    items: [
      {
        articleId: 101,
        name: " Bruschetta",
        quantity: 1,
        price:  5.5
      },
      {
        articleId: 102,
        name: "Spaghetti Carbonara",
        quantity: 3,
        price: 12
      },
      {
        articleId: 103,
        name: "Sushi de Saumon ",
        quantity: 2,
        price:  8.5
      },
      {
        articleId: 101,
        name: "Ramen",
        quantity: 2,
        price: 10
      }
    ]
  },
  command3: {
    id: 3,
    detaille: "Commande 3",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "enCours",
    items: [
      {
        articleId: 101,
        name: " Bruschetta",
        quantity: 3,
        price:  5.5
      },
      {
        articleId: 102,
        name: "Spaghetti Carbonara",
        quantity: 1,
        price: 12
      },
      {
        articleId: 103,
        name: "Sushi de Saumon ",
        quantity: 3,
        price:  8.5
      },
      {
        articleId: 101,
        name: "Ramen",
        quantity: 4,
        price: 10
      }
    ]
  },
  command4: {
    id: 4,
    detaille: "Commande 4",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "finalisee",
    items: [
      {
        articleId: 101,
        name: " Bruschetta",
        quantity: 1,
        price:  5.5
      },
      {
        articleId: 102,
        name: "Spaghetti Carbonara",
        quantity: 1,
        price: 12
      },
      {
        articleId: 103,
        name: "Sushi de Saumon ",
        quantity: 3,
        price:  8.5
      },
      {
        articleId: 101,
        name: "Ramen",
        quantity: 3,
        price: 10
      }
    ]
  },

};
</script>

<template>
  <div>
    <div  class="p-card">
      <RestorerOrderCard
          v-for="(command,i) in commands"
          :key="i" :command="command" class="RestorerOrderCard"
          :showButtons="props.title">
      </RestorerOrderCard>
    </div>
  </div>
</template>

<style scoped>
.RestorerOrderCard {
  //border: solid;

  //margin: 5% 5% 5% 5%;
}

</style>