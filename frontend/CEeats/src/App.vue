<script setup>
import { ref } from "vue";
import {AccountService} from "@/services/index.js";
import { useRouter } from 'vue-router';

const menu = ref();
const router = useRouter();
const items = ref([
  {
    label: 'Profil',
    icon: 'pi pi-user',
    command: () => {
      router.push('/users/1/account');
    }
  },
  {
    label: 'Paramètres',
    icon: 'pi pi-cog',
    command: () => {
      router.push('/users/1/settings');
    }
  },
  {
    label: 'Aide',
    icon: 'pi pi-question',
    command: () => {
      router.push('/help');
    }
  },
  {
    separator: true
  },
  {
    label: 'Déconnexion',
    icon: 'pi pi-sign-out',
    command: () => {
      logout();
    }
  }
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
const logout = async () => {
  try {
    await AccountService.logout();
    await router.push('/login');
  } catch (err) {
    console.error(err);
  }
};

</script>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { ref } from "vue";

export default {
  components: {Sidebar},
  data() {
    return {
      isMenuOpen: false,
      page_content: {
        page_content_2: true,
        page_content_1: false
      },
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.page_content.page_content_2 = !this.page_content.page_content_2;
      this.page_content.page_content_1 = !this.page_content.page_content_2;
    },
  }
}
</script>

<template>
  <header class="flex-container">
    <button
        class="claymorphism"
        type="button"
        @click="toggleMenu"
    >
      Menu
    </button>
    <h1><strong>CESeats</strong></h1>
    <div class="card flex justify-center">
      <img class="display_user" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile_picture" @click="toggle" aria-controls="overlay_tmenu">
      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup />
    </div>
  </header>

  <div
      v-bind:class="{
      main_page_content_1: page_content.page_content_1,
      main_page_content_2: page_content.page_content_2
    }"
  >
    <transition name="fade">
      <sidebar :is-menu-open="isMenuOpen"/>
    </transition>


    <router-view class="router_class"/>
  </div>
</template>

<style scoped>
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


.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
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
