<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import User from '@/models/UserModel';
import {AccountService} from "@/services";

export default defineComponent({
  name: "EmailFormView",
  setup() {
    const route = useRoute();
    const userId = ref<string>(route.params.id as string);
    // Variables réactives
    const user = ref<User>({
      id: '',
      nom: '',
      prenom: '',
      email: '',
      role_id: '',
      date_anniv: '',
      password: '',
      telephone: '',
      is_notified: false,
      path_pfp: '',
      id_parain: '',
      adresse: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: ''
    });
    onMounted(() => {
      AccountService.getUser(userId.value)
          .then(res => {
            user.value = res.data as User;
          })
          .catch(err => console.log(err));
    });

    const updateUser = async () => {
      try {
        await AccountService.updateUser(userId.value, user.value);
        alert("Utilisateur mis à jour avec succès");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour de l'utilisateur");
      }
    };

    // Retour des variables et fonctions à utiliser dans le template
    return {
      user,
      updateUser
    };
  }
})
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
    <form @submit.prevent="updateUser">
      <h1>Adresse e-mail</h1>
      <p>Utilisez cette adresse e-mail vous connecter et récupérer votre compte.</p>
      <div class="form">
        <label for="email">E-mail</label>
        <InputText id="email" v-model="user.email" :value="user.email"/>
      </div>
      <Button label="Mettre à jour" type="submit" raised />
    </form>
  </main>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>