<script lang="js">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "deliverer_view",
  data() {
    let delivery_data;
    let delivery_id;
    return {
      delivery_data, //les données de livraison sont stockées ici. Cette variable peut muter en objet si le besion s'en fait ressentir
      delivery_id,
    }
  },
  async mounted() {
    //TODO : préparer l'url pour récupérer les données de livraison ici
    this.delivery_id = $router.params.id

    this.delivery_data = await (await fetch("/api/delivery/" + this.delivery_id)).json()

    //TODO : ajouter des étapes de traitement supplémentaires selon les données renvoyées par la requête fetch
  }
})
</script>


<template>
  <div class="container">
    <p v-if="delivery_data != null">{{ delivery_data }}</p>
    <p v-else class="error">Aucune adresse n'a été fournie pour cette url</p>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: normal;
  border: 4px solid black;
  border-radius: 10px;
  padding: 5px;
  font-size: 18px;
}

.error {
  background-color: #DF1717;
  color: white;
  font-size: 18px;
}
</style>