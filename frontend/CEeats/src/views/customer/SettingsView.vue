<script lang="ts">
import {defineComponent} from 'vue'
import { ref } from 'vue'

export default defineComponent({
  name: "SettingsView",
  data() {
    return {
      checked_notif: Boolean,
      checked_other: Boolean
    }
  },
  method: {
    checked_notif: ref(false),
    checked_other: ref(false)
  }
})
</script>

<template>
  <main>
    <h2 class="settings">Paramètres Utilisateur</h2>
    <div class="setting">
      <div class="notifications">
        <p class="title">Notifications</p>
        <div class="description_notif">Description du paramètre</div>
      </div>
      <InputSwitch v-model="checked_notif"/>
    </div>
    <div class="setting">
      <div class="other_settings">
        <p class="title">Autre paramètre</p>
        <p class="description_other">Description de l'autre paramètre</p>
      </div>
      <InputSwitch v-model="checked_other" />
    </div>
  </main>
</template>

<style scoped>
.setting {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-weight: bold;
}

</style>