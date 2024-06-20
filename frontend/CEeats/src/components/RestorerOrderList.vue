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
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "enCours",
    items: [
      {
        articleId: 101,
        name: "Product A",
        quantity: 2,
        price: 19.99
      },
      {
        articleId: 102,
        name: "Product B",
        quantity: 1,
        price: 9.99
      },
      {
        articleId: 103,
        name: "Product C",
        quantity: 3,
        price: 4.99
      }
    ]
  },
  command2: {
    id: 2,
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "finalisee",
    items: [
      {
        articleId: 101,
        name: "Product A",
        quantity: 2,
        price: 19.99
      },
      {
        articleId: 102,
        name: "Product B",
        quantity: 1,
        price: 9.99
      },
      {
        articleId: 103,
        name: "Product C",
        quantity: 3,
        price: 4.99
      }
    ]
  },
  command3: {
    id: 3,
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "enCours",
    items: [
      {
        articleId: 101,
        name: "Product A",
        quantity: 2,
        price: 19.99
      },
      {
        articleId: 102,
        name: "Product B",
        quantity: 1,
        price: 9.99
      },
      {
        articleId: 103,
        name: "Product C",
        quantity: 3,
        price: 4.99
      }
    ]
  },
  command4: {
    id: 4,
    detaille: "Commande #00000000",
    client: "Jane Doe",
    livreur: "John Doe",
    status: "finalisee",
    items: [
      {
        articleId: 101,
        name: "Product A",
        quantity: 2,
        price: 19.99
      },
      {
        articleId: 102,
        name: "Product B",
        quantity: 1,
        price: 9.99
      },
      {
        articleId: 103,
        name: "Product C",
        quantity: 3,
        price: 4.99
      }
    ]
  },

};
</script>

<template>
  <div>
    <div>
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
  border: solid;
  //margin: 5% 5% 5% 5%;
}

</style>