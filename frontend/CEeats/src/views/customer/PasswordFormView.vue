<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {AccountService} from "@/services";
import {useRoute} from "vue-router";

export default defineComponent({
  name: "PasswordFormView",
  setup() {
    const route = useRoute();
    const userId = ref<string>(route.params.id as string);

    const user = ref<{ password: string }>({ password: '' });

    const new_password = ref<string>('');
    const confirm_password = ref<string>('');

    const updatePassword = async () => {
      try {
        if (new_password.value === confirm_password.value) {
          user.value.password = new_password;
          await AccountService.updateUser(userId.value, user.value);
          alert("Utilisateur mis à jour avec succès");
        }
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la mise à jour de l'utilisateur");
      }
    };

    // Retour des variables et fonctions à utiliser dans le template
    return {
      new_password,
      confirm_password,
      updatePassword,

    };
  }
})
</script>

<template>
  <main>
    <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
    <form @submit.prevent="updatePassword">
      <h1>Mot de passe</h1>
      <p>Votre mot de passe doit comporter au moins 8 caractères, dont au moins un chiffre et un caractère non numérique</p>
      <div class="form">
        <label for="new_password">Nouveau mot de passe</label>

        <div class="card flex justify-center">
          <Password id="new_password"
                    promptLabel="Choose a password"
                    weakLabel="Too simple"
                    mediumLabel="Average complexity"
                    strongLabel="Complex password"
                    toggle-mask
                    v-model="new_password"
          />
        </div>
      </div>
      <div class="form">
        <label for="confirm_password">Confirmer le nouveau mot de passe</label>
        <div class="card flex justify-center">
          <Password id="confirm_password" v-model="confirm_password" :feedback="false" toggle-mask/>
        </div>
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