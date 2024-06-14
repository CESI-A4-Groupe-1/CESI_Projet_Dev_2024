<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PhoneFormView"
})
</script>

<template>
<main>
  <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>

  <h1>Numéro de téléphone</h1>
  <p>Utilisez ce numéro pour vous connecter et récupérer votre compte.</p>

  <div class="form">
    <label for="phone">Numéro de téléphone</label>
    <InputText id="phone" v-model="phone"/>
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