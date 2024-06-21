<script lang="ts">
import RestorerOrderList from "@/components/RestorerOrderList.vue";

export default {
  name: 'RestorerSidebar',
  components: {RestorerOrderList},
}
</script>

<template>
  <div class="right-sidebar">
    <h2>Commande en cours</h2>
    <div>
      <div class="container">
        <RestorerOrderList :title="true"></RestorerOrderList>
        <!-- Ajouter le composant liste de commandes-->
      </div>
    </div>
  </div>
</template>


<style scoped>
h1 {
  color: #2a4252;
  font-size: 20px;

}

.right-sidebar {
  position: absolute;
  right: 0;
  width: 30%;
  height: 70%;
  //border-width: 5px;
  //border-style: solid;
  //border-color: black;
}

.container {
  height: 350px;
  overflow: auto;
}
</style>
