<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PasswordFormView"
})
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>

    <h1>Mot de passe</h1>
    <p>Votre mot de passe doit comporter au moins 8 caractères, dont au moins un chiffre et un caractère non numérique</p>
    <div class="form">
      <label for="new_password">Nouveau mot de passe</label>
      <Password id="new_password"
                promptLabel="Choose a password"
                weakLabel="Too simple"
                mediumLabel="Average complexity"
                strongLabel="Complex password"
                toggle-mask
                v-model="new_password"
      />
    </div>
    <div class="form">
      <label for="confirm_password">Confirmer le nouveau mot de passe</label>
      <Password id="confirm_password" v-model="password" :feedback="false" />
    </div>
    <Button label="Mettre à jour" raised />
  </main>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>