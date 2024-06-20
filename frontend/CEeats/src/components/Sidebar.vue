<template>
  <div class="sidebar_class" v-if="isMenuOpen">
    <RouterLink to="/home" class="neomorphism-button-link">Accueil</RouterLink>
    <RouterLink to="/parcourir" class="neomorphism-button-link">Parcourir</RouterLink>
    <RouterLink :to="`/users/${user_id}/orders`" class="neomorphism-button-link" :disabled="!user_id">Panier</RouterLink>
    <RouterLink to="" class="neomorphism-button-link">Livraisons</RouterLink>
    <RouterLink :to="`/users/${user_id}/settings`" class="neomorphism-button-link" :disabled="!user_id">Notifications</RouterLink>
  </div>
</template>

<script lang="ts">
import {AccountService} from "@/services";

export default {
  name: 'mainpage-sidebar',
  props: {
    isMenuOpen: {}
  },
  data() {
    return{
      user_id: '' as string
    }
  },
  mounted() {
    if(AccountService.isLogged()){
      this.user_id = localStorage.getItem('user_id') ?? ''
    }
  },
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
