<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EmailFormView"
})
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>

    <h1>Adresse e-mail</h1>
    <p>Utilisez cette adresse e-mail vous connecter et récupérer votre compte.</p>
    <div class="form">
      <label for="email">E-mail</label>
      <InputText id="email" v-model="email"/>
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