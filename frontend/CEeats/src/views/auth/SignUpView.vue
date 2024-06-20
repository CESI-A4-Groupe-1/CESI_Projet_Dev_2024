<script lang="ts">
import {defineComponent, ref, reactive} from 'vue'
import { AccountService } from '@/services/AccountService.js';

import { User } from '@/models/User';

export default defineComponent({
  name: 'CreateUser',
  components: {
  },
  data() {
    return {
      user: {
        role_id: 0,
        nom: '',
        prenom: '',
        email: '',
        date_anniv: null,
        password: '',
        telephone: '',
        path_pfp: '',
        adresse: '',
        is_notified: true
      },
      roles: [
        { label: 'Acheteur', value: 2 },
        { label: 'Restaurateur', value: 3 },
        { label: 'Livreur', value: 4 },
      ],
    };
  },
  methods: {
    async registerUser() {
      console.log(this.user);
      AccountService.register(this.user)
          .then(() => {
            console.log('Utilisateur enregistré avec succès');
            this.login();
          })
          .catch(error => {
            console.error('Erreur lors de l\'enregistrement :', error);
          });
    },
    async login() {
      AccountService.login({email: this.user.email, password: this.user.password})
          .then(res => {
            console.log(res);
            AccountService.saveToken(res.data.token)
            AccountService.saveUser(res.data.user_id, res.data.user_role)


            let redirectPath = '/home';

            switch (Number(res.data.user_role)) {
              case 1:
                redirectPath = '/parcourir';
                break;
              case 2:
                redirectPath = '/parcourir';
                break;
              case 3:
                redirectPath = '/parcourir2';
                break;
              case 4:
                redirectPath = '/parcourir3';
                break;
              case 5:
                redirectPath = '/parcourir4';
                break;
              default:
                break;
            }

            this.$router.push(redirectPath);
          })
          .catch(err => console.log(err))
    },
    onFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        const imageUrl = URL.createObjectURL(file);
        this.user.path_pfp = imageUrl;
      }
    },
  },
});
</script>

<template>
  <main class="body mb">
    <div class="core mb">
      <h2>Créer un compte utilisateur</h2>
      <form @submit.prevent="registerUser">
        <div class="field">
          <label for="role">Rôle</label>
          <Dropdown
              id="role"
              v-model="user.role_id"
              :options="roles"
              optionLabel="label"
              optionValue="value"
              required
          />
        </div>
        <div class="field">
          <label for="prenom">Prénom</label>
          <InputText id="prenom" v-model="user.prenom" required />
        </div>
        <div class="field">
          <label for="nom">Nom</label>
          <InputText id="nom" v-model="user.nom" required />
        </div>
        <div class="field">
          <label for="email">Email</label>
          <InputText id="email" v-model="user.email" type="email" required />
        </div>
        <div class="field">
          <label for="date_anniv">Date de naissance</label>
          <Calendar id="date_anniv" v-model="user.date_anniv" showIcon />
        </div>
        <div class="field">
          <label for="password">Mot de passe</label>
          <Password id="new_password"
                    promptLabel="Choose a password"
                    weakLabel="Too simple"
                    mediumLabel="Average complexity"
                    strongLabel="Complex password"
                    toggle-mask
                    v-model="user.password"
          />
        </div>
        <div class="field">
          <label for="telephone">Téléphone</label>
          <InputText id="telephone" v-model="user.telephone" type="tel" required />
        </div>
        <div class="field">
          <label for="path_pfp">Photo de profil</label>
          <InputText id="path_pfp" v-model="user.path_pfp" type="file" @change="onFileChange" />
        </div>
        <div class="field">
          <label for="adresse">Adresse</label>
          <InputText id="adresse" v-model="user.adresse" required />
        </div>
        <Button label="Créer le compte" type="submit" class="p-button-success" />
      </form>
      <p>Déjà un compte ? <router-link to="/login">Se connecter</router-link>.</p>
    </div>
  </main>
</template>

<style scoped>
<style scoped>
.create-user {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.field {
  margin-bottom: 15px;
}

.field label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.field input,
.field textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.field textarea {
  height: 100px;
}
</style>