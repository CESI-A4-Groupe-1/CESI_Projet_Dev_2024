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
      }
    }
  },
  methods: {
    async login() {
      AccountService.login(this.user)
          .then(res => {
            AccountService.saveToken(res.data.access_token)
            this.$router.push('/restaurants')
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