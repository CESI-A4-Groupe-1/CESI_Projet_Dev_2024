<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AccountService } from '@/services/AccountService';
import User from '@/models/UserModel';

export default defineComponent({
  name: "AccountView",
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
        const { password, ...userWithoutPassword } = user.value;
        await AccountService.updateUser(userId.value, userWithoutPassword);
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
});
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
    <form @submit.prevent="updateUser">
      <h1>Nom</h1>
      <p>Il s'agit du nom que vous souhaitez que les autres utilisateurs utilisent pour vous désigner</p>
      <div class="form">
        <label class="mb-1" for="firstname">Prénom</label>
        <InputText class="mb" id="firstname" v-model="user.prenom" :value="user.prenom"/>
      </div>
      <div class="form">
        <label class="mb-1" for="lastname">Nom de famille</label>
        <InputText class="mb" id="lastname" v-model="user.nom" :value="user.nom"/>
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