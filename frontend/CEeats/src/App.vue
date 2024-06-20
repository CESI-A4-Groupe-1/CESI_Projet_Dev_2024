<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { AccountService } from "@/services/index.js";

const menu = ref(null);
const router = useRouter();
const user_id = ref(localStorage.getItem('user_id') ?? '');

onMounted(() => {
  if (AccountService.isLogged()) {
    user_id.value = localStorage.getItem("user_id");
  }
});

const items = ref([
  {
    label: 'Profil',
    icon: 'pi pi-user',
    command: async () => {
        try {
          await router.push(`/users/${user_id.value}/account`);
        } catch (err) {
          console.error("Failed to navigate to account:", err);
        }
    }
  },
  {
    label: 'Paramètres',
    icon: 'pi pi-cog',
    command: async () => {
        try {
          await router.push(`/users/${user_id.value}/settings`);
        } catch (err) {
          console.error("Failed to navigate to settings:", err);
        }
    }
  },
  {
    label: 'Aide',
    icon: 'pi pi-question',
    command: async () => {
      try {
        await router.push('/help');
      } catch (err) {
        console.error("Failed to navigate to help:", err);
      }
    }
  },
  {
    separator: true
  },
  {
    label: 'Déconnexion',
    icon: 'pi pi-sign-out',
    command: async () => {
      await logout();
    }
  }
]);

const toggle = (event) => {
  if (menu.value) {
    menu.value.toggle(event);
  }
};

const logout = async () => {
  try {
    await AccountService.logout();
    await router.push('/login');
  } catch (err) {
    console.error("Failed to logout:", err);
  }
};
</script>

<script>
import { defineComponent, ref, computed } from 'vue';
import Sidebar from 'primevue/sidebar';

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
  methods: {
    toggleMenu() {
      this.page_content.page_content_2 = !this.page_content.page_content_2;
      this.page_content.page_content_1 = !this.page_content.page_content_2;
    },
    showHeader() {
      const currentPath = this.$route.path;
      return currentPath !== '/login' && currentPath !== '/signup';
    }
  }
});
</script>

<template>
  <header v-if="showHeader()" class="flex-container">
    <Button icon="pi pi-bars" @click="visible = true; console.log('bouton')" />
    <h1><strong>CESeats</strong></h1>
    <div class="card flex justify-center">
      <img class="display_user" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile_picture" @click="toggle" aria-controls="overlay_tmenu">
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </header>

  <header v-if="!showHeader()" class="header-center">
    <h1><strong>CESeats</strong></h1>
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
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

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

.claymorphism {
  border-radius: 14px;
  background: #2a4252;
  box-shadow: 8px 8px 16px #111a21,
  -8px -8px 16px #436a83;
  padding: 20px;
  color: white;
}

.display_user {
  object-fit: cover;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
