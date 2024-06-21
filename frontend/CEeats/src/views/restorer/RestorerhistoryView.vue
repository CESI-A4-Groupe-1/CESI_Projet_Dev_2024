<script lang="ts">
import RestorerOrderList from "@/components/RestorerOrderList.vue";

export default {
      name: 'RestorerhistoryView',
      components: {
        RestorerOrderList,
      },
}
</script>


<template>
  <main class="main">
    <div>
      <div class="commands">
        <div class="commandlist_encour">
          <h2> Commandes en Cours </h2>
          <div class="commandlist_encours">
            <RestorerOrderList :title="true"></RestorerOrderList>
          </div>
        </div>
        <div class="commandlist_final">
          <h2> Commandes Finalisé Aujourd'hui</h2>
          <div class="commandlist_finalisee">
            <RestorerOrderList :title="false"></RestorerOrderList>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.main {
  padding-left: 10%;
  padding-right: 10%;
}

.commandlist_encours {
  height: 400px;
  overflow: auto;
}

.commandlist_encour {
  border: solid;
  border-radius: 15px;
  margin-bottom: 10%;
  padding-left: 10%;
}

.commandlist_finalisee {
  overflow: auto;
  height: 400px;
}

.commandlist_final {
  border: solid;
  border-radius: 15px;
  height: 100%;
  padding-left: 10%;
}

</style>