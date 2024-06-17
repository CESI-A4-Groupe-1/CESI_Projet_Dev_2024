<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AccountService } from '@/services/AccountService';
import User from '@/models/UserModel';

export default defineComponent({
  name: "AccountView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    // Variables réactives
    const userId = ref<string>(route.params.id as string);
    const user = ref<User>({
      id: '',
      nom: '',
      prenom: '',
      email: '',
      role_id: '',
      date_anniv: '',
      password: '',
      telephone: '',
      is_notified: false,
      path_pfp: '',
      id_parain: '',
      adresse: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: ''
    });

    // Fonction pour charger l'image de profil
    const loadFile = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const image = document.getElementById("output") as HTMLImageElement;
        if (image) {
          image.src = URL.createObjectURL(input.files[0]);
        }
      }
    };

    // Fonction pour déconnecter l'utilisateur
    const logout = async () => {
      try {
        await AccountService.logout();
        await router.push('/login');
      } catch (err) {
        console.error(err);
      }
    };

    // Fonction pour naviguer vers une autre page
    const navigateTo = (path: string) => {
      router.push(path);
    };

    // Chargement des données de l'utilisateur une fois le composant monté
    onMounted(() => {
      AccountService.getUser(userId.value)
          .then(res => {
            user.value = res.data as User;
            console.log(user);
          })
          .catch(err => console.log(err));
    });

    // Retour des variables et fonctions à utiliser dans le template
    return {
      user,
      loadFile,
      logout,
      navigateTo
    };
  }
});
</script>

<template>
  <main>
    <h2 class="profile">Profil Utilisateur</h2>
    <div class="pp_logout">
      <div class="profile-pic">
        <label class="-label" for="file">
          <span class="pi pi-camera"></span>
          <span>Changer l'image</span>
        </label>
        <input id="file" type="file" @change="loadFile"/>
        <img src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg" id="output" width="200"  alt="profile picture"/>
      </div>
      <div class="logout" @click="logout()">
        <div class="txt_logout">Déconnexion <i class="pi pi-sign-out"></i></div>
      </div>
    </div>
    <h2 class="personnal_info">Informations personelles</h2>
    <div class="name">
      <div class="display">
        <p class="title">Nom</p>
        <p class="data">
          {{ user.prenom }} {{ user.nom }}
        </p>
      </div>
      <button @click="navigateTo('./account/update/name')"><i class="pi pi-chevron-right"></i></button>
    </div>
    <div class="phone">
      <div class="display">
        <p class="title">Numéro de téléphone</p>
        <p class="data">
          {{ user.telephone }}
        </p>
      </div>
      <button @click="navigateTo('./account/update/phone')"><i class="pi pi-chevron-right"></i></button>
    </div>
    <div class="email">
      <div class="display">
        <p class="title">Adresse email</p>
        <p class="data">
          {{ user.email }}
        </p>
      </div>
      <button @click="navigateTo('./account/update/email')"><i class="pi pi-chevron-right"></i></button>
    </div>
    <h2 class="security">Sécurité</h2>
    <div class="password">
      <div class="display">
        <p class="title">Mot de passe</p>
      </div>
      <button @click="navigateTo('./account/update/password')"><i class="pi pi-chevron-right"></i></button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
$circleSize: 165px;
$radius: 100px;
$shadow: 0 0 10px 0 rgba(255,255,255,.35);
$fontColor: rgb(250,250,250);

@mixin object-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pp_logout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.logout {
  color: red;
}

.title {
  font-weight: bold;
}

.name, .phone, .email, .password {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.profile-pic {
  position: relative;
  width: $circleSize;
  height: $circleSize;
  border-radius: $radius;
  overflow: hidden;
  transition: all .3s ease;

  input {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: $shadow;
  }

  .-label {
    @include object-center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    color: $fontColor;
    font-size: 1.2em;
    cursor: pointer;
    opacity: 0;
    transition: opacity .2s;

    &:hover {
      opacity: 1;
    }

    span {
      margin: 0 0.5em;
    }
  }
}
</style>