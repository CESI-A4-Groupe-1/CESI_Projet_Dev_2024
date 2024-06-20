<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Sidebar from 'primevue/sidebar';
import { AccountService } from '@/services';

export default defineComponent({
  components: { Sidebar },
  data() {
    return {
      visible: false,
      page_content: {
        page_content_2: true,
        page_content_1: false
      },
      id_user: localStorage.getItem('user_id') ?? '',
    }
  },
  computed: {
    isUserIdDefined(): boolean {
      return !!this.id_user;
    }
  },
  methods: {
    toggleMenu() {
      this.page_content.page_content_2 = !this.page_content.page_content_2;
      this.page_content.page_content_1 = !this.page_content.page_content_2;
    },
  }
});
</script>

<template>
  <header class="flex-container">
    <Button icon="pi pi-arrow-right" @click="visible = true; console.log('bouton')" />
    <h1><strong>CESeats</strong></h1>
    <span class="logo">logo</span>
  </header>
  <div class="card flex justify-center">
    <Sidebar v-model:visible="visible" header="Menu">
      <div class="flex-list">
        <RouterLink to="/home" class="button-link"><i class="pi pi-home" style="font-size: 1rem"/> Accueil</RouterLink>
        <p/>
        <RouterLink to="/parcourir" class="button-link"><i class="pi pi-search" style="font-size: 1rem"/> Parcourir</RouterLink>
        <p/>
        <RouterLink :to="`/users/${id_user}/orders`" class="button-link" v-bind:disabled="!id_user"><i class="pi pi-cart-arrow-down" style="font-size: 1rem"/> Paniers</RouterLink>
        <p/>
        <RouterLink to="/deliveries" class="button-link"><i class="pi pi-truck" style="font-size: 1rem"/> Livraisons</RouterLink>
        <p/>
        <RouterLink :to="`/users/${id_user}/settings`" class="button-link" v-bind:disabled="!id_user"><i class="pi pi-bell" style="font-size: 1rem"/> Notifications</RouterLink>
        <p/>
      </div>
    </Sidebar>
  </div>
  <div
      v-bind:class="{
      main_page_content_1: page_content.page_content_1,
      main_page_content_2: page_content.page_content_2
    }"
  >
    <router-view class="router_class"/>
  </div>
</template>

<style scoped>
.button-link {
  border-radius: 5px;
  background: #fdfdfd;
  padding: 20px;
  display: block;
  width: 100%;
  color: dimgray;
  font-size: 20px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #fdfdfd;
  transition-duration: 0.2s;
}

.button-link:hover {
  background-color: #04AA6D; /* Green */
  color: white;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #04AA6D;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.flex-list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
}

.generic_button {
  border: 5px solid #2a4252;
  background-color: white;
  width: 200px;
  height: 50px;
  font-size: 30px;
}

h1 {
  color: #2a4252;
  font-size: 34px;
}

span.logo {
  width: 50px;
  height: 50px;
  border: 10px solid #2a4252;
}

.main_page_content_1 {
  display: grid;
  grid-template-columns: 10% auto;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-gap: 1em 1em;
  padding: 0px;
}

.main_page_content_2 {
  display: block;
  padding: 20px;
}

.router_class {
  grid-area: 1 / 2 / 2 / 3;
}
</style>
