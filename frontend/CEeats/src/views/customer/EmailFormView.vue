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
    const user = ref<User>({
      id: '',
      nom: '',
      prenom: '',
      email: '',
      role_id: '',
      date_anniv: '',
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
            user.value = { ...res.data, password: undefined } as User;
          })
          .catch(err => console.log(err));
    });
    const updateUser = async () => {
      try {
        // Copier l'objet user sans le champ password
        const { password, ...userWithoutPassword } = user.value;
        await AccountService.updateUser(userId.value, userWithoutPassword);
        alert("Utilisateur mis à jour avec succès");
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour de l'utilisateur");
      }
    };
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
        <label class="mb-1" for="email">E-mail</label>
        <InputText class="mb" id="email" v-model="user.email" :value="user.email"/>
      </div>
      <Button class="mb" label="Mettre à jour" type="submit" raised />
    </form>
  </main>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>