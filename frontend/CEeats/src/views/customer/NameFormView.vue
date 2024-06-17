<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NameFormView"
})
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
    <h1>Nom</h1>
    <p>Il s'agit du nom que vous souhaitez que les autres utilisateurs utilisent pour vous désigner</p>
    <div class="form">
      <label for="firstname">Prénom</label>
      <InputText id="firstname" v-model="firstname"/>
    </div>
    <div class="form">
      <label for="lastname">Nom de famille</label>
      <InputText id="lastname" v-model="lastname"/>
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