<template>
  <div class="sidebar_class" v-if="isMenuOpen">
    <!--TODO : Vérifier le nombre de bouton en lien à mettre ici pour que les utilisateurs puissent naviguer correctement sans aller aux mauvais endroit -->
    <RouterLink to="/" class="neomorphism-button-link">Accueil</RouterLink>
    <RouterLink to="/parcourir" class="neomorphism-button-link">Parcourir</RouterLink>
    <RouterLink to="/users/1/orders" class="neomorphism-button-link">Panier</RouterLink>
    <RouterLink to="" class="neomorphism-button-link">Livraisons</RouterLink>
    <RouterLink to="/users/1/settings" class="neomorphism-button-link">Notifications</RouterLink>
  </div>
</template>
<script lang="ts">
export default {
  name: 'mainpage-sidebar',
  props: {
    isMenuOpen: {}
  }
}
</script>
<style scoped>
.neomorphism-button-link {
  border-radius: 14px;
  background: #2a4252;
  box-shadow: 8px 8px 16px #111a21,
  -8px -8px 16px #436a83;
  color: white;
  padding: 10px;
  text-align: center;
}


h1 {
  color: #2a4252;
  font-size: 34px;
}


.sidebar_class {
  grid-area: 1 / 1 / 2 / 2;
  padding: 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 2px solid #2a4252;
  height: 500px;
  justify-content: space-around;
  align-items: center;
  align-content: stretch;
}
</style>
