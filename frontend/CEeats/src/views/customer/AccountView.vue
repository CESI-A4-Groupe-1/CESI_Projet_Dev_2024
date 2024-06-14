<script lang="ts">
import {defineComponent} from 'vue';
import 'primeicons/primeicons.css';
import { AccountService } from '@/services';

export default defineComponent({
  name: "AccountView",
  data() {
    return {
      fname: '',
      lname: '',
      num: '',
      email: ''
    }
  },
  methods: {
    loadFile(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const image = document.getElementById("output") as HTMLImageElement;
        image.src = URL.createObjectURL(input.files[0]);
      }
    },
    logout() {
      AccountService.logout()
          .then((res) => {
          this.$router.push('/login');
          })
          .catch(err => {
            console.log(err)
          });
    },
    navigateTo(path: string) {
      this.$router.push(path);
    }
  }
})
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
        <img src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg" id="output" width="200" />
      </div>
      <div class="logout">
        <div class="txt_logout" @click="logout()">Déconnexion <i class="pi pi-sign-out"></i></div>
      </div>
    </div>
    <h2 class="personnal_info">Informations personelles</h2>
    <div class="name">
      <div class="display">
        <p class="title">Nom</p>
        <p class="data">
          {{ fname }} {{ lname }} Lilou Rabouille
        </p>
      </div>
      <button @click="navigateTo('./account/update/name')"><i class="pi pi-chevron-right"></i></button>
    </div>
    <div class="phone">
      <div class="display">
        <p class="title">Numéro de téléphone</p>
        <p class="data">
          {{ num }} +33 6 xx xx xx xx
        </p>
      </div>
      <button @click="navigateTo('./account/update/phone')"><i class="pi pi-chevron-right"></i></button>
    </div>
    <div class="email">
      <div class="display">
        <p class="title">Adresse email</p>
        <p class="data">
          {{ email }} prenom.nom@ceseats.com
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