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
      telephone: '',
      is_notified: false,
      path_pfp: '',
      id_parain: '',
      adresse: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: ''
    });

    const loadFile = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const imageUrl = URL.createObjectURL(file);
        user.value.path_pfp = imageUrl;
        updateUser();
      }
    };

    const updateUser = async () => {
      try {
        // Copier l'objet user sans le champ password
        const { password, ...userWithoutPassword } = user.value;
        await AccountService.updateUser(userId.value, userWithoutPassword);
        alert("Utilisateur mis à jour avec succès");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour de l'utilisateur");
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
            user.value = { ...res.data, password: undefined } as User;
          })
          .catch(err => console.log(err));
    });

    // Retour des variables et fonctions à utiliser dans le template
    return {
      user,
      loadFile,
      updateUser,
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
        <img :src="user.path_pfp" id="output" width="200"  alt="profile picture"/>
      </div>
      <div class="logout" @click="logout()">
        <div class="txt_logout">Déconnexion <i class="pi pi-sign-out"></i></div>
      </div>
    </div>
    <h2 class="personnal_info">Informations personnelles</h2>
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
    <h2 class="delete">Suppression du compte</h2>
    <p class="delete_compte">Supprimez votre compte</p>
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

.logout, .delete_compte {
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