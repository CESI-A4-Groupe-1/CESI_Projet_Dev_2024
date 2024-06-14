<script lang="ts">
import RestorerOrderList from "@/components/RestorerOrderList.vue";

export default {
  name: 'RestorerSidebar',
  components: {RestorerOrderList},
}
</script>

<template>
  <div class="right-sidebar">
    <div>
      <h1> Commandes en cours </h1>
    </div>
    <div>
      <RestorerOrderList></RestorerOrderList>
      <!-- Ajouter le composant liste de commandes-->
    </div>
  </div>
</template>


<style scoped>
h1 {
  color: #2a4252;
  font-size: 20px;

}

.right-sidebar {
  position: fixed;
  right: 0;
  width: 40%;
  height: fit-content;
  border-width: 5px;
  border-style: solid;
  border-color: black;
}
</style>
