<script lang="ts">
import {defineComponent} from 'vue'
import { ref } from 'vue'
import {getToken, messaging} from "../../firebase";


export default defineComponent({
  name: "SettingsView",
  data() {
    return {
      checked_notif: Boolean,
      checked_other: Boolean
    }
  },
  methods: {
    requestNotifications: async (checked: BooleanConstructor) => {
      console.log(checked)
      if (checked.valueOf()) {
        try {
          const currentToken = await getToken(messaging, {vapidKey: import.meta.env.VITE_PUBLIC_VAPID_KEY});
          if (currentToken) {
            console.log('FCM Token:', currentToken);
            // Send the token to your server to store it
          } else {
            console.warn('No registration token available. Request permission to generate one.');
          }
        } catch (err) {
          console.error('Unable to get permission to notify.', err);
        }
      }
    }
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
      <InputSwitch v-model="checked_notif" @change="event => requestNotifications(checked_notif)"/>
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