<script lang="ts">
import {defineComponent, ref} from 'vue'
import {AccountService} from '@/services'

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      redirect: '' as string | null
    }
  },
  mounted() {
    // Vérifier si l'URL contient un paramètre 'redirect'
    const params = new URLSearchParams(window.location.search);
    if (params.has('redirect')) {
      this.redirect = params.get('redirect');
    }
  },
  methods: {
    async login() {
      AccountService.login(this.user)
          .then(res => {
            console.log(res);
            AccountService.saveToken(res.data.token);
            AccountService.saveUser(res.data.user_id, res.data.user_role);

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

            if (this.redirect) {
              redirectPath = this.redirect;
            }

            this.$router.push(redirectPath);
          })
          .catch(err => console.log(err));
    }
  }
})
</script>

<template>
  <main class="body mb">
    <div class="core">
      <form @submit.prevent="login">
        <h1>Connexion</h1>
        <p>Entrer les données nécessaires</p>
        <FloatLabel class="mb">
          <InputText id="email" v-model="user.email" />
          <label for="email">Adresse e-mail</label>
        </FloatLabel>
        <FloatLabel class="mb">
          <Password id="password" v-model="user.password" :feedback="false" />
          <label for="password">Mot de passe</label>
        </FloatLabel>
        <Button class="mb" label="Connexion" type="submit" severity="success" />
      </form>
      <p>Pas de compte ? <router-link to="/signup">S'inscrire</router-link>.</p>
    </div>
  </main>
</template>

<style scoped>

</style>