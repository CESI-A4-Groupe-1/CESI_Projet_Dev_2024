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
    }
  },
  methods: {
    async login() {
      AccountService.login(this.user)
          .then(res => {
            console.log(res);
            AccountService.saveToken(res.data.token)
            AccountService.saveUser(res.data.user_id, res.data.user_role)
            switch(res.data.user_role) {
              case 1: {
                this.$router.push('/parcourir');
                break;
              }
              case 2: {
                this.$router.push('/parcourir');
                break;
              }
              case 3: {
                this.$router.push('/parcourir');
                break;
              }
              case 4: {
                this.$router.push('/parcourir');
                break;
              }
              case 5: {
                this.$router.push('/parcourir');
                break;
              }
              default: {
                this.$router.push('/parcourir');
                break;
              }
            }
            this.$router.push('/parcourir')
          })
          .catch(err => console.log(err))
    }
  }
})
</script>

<template>
<main>
  <form @submit.prevent="login">
    <FloatLabel>
      <InputText id="email" v-model="user.email" />
      <label for="email">Adresse e-mail</label>
    </FloatLabel>
    <FloatLabel>
      <Password id="password" v-model="user.password" :feedback="false" />
      <label for="password">Mot de passe</label>
    </FloatLabel>
    <Button label="Connexion" type="submit" severity="success" />
  </form>
</main>
</template>

<style scoped>

</style>