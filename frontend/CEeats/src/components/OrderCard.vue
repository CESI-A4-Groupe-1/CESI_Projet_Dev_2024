<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "OrderCard"
})
</script>

<template>
  <div class="order_card">
    <div class="logo_and_info">
      <img src="https://images.bfmtv.com/UDAdpp33jU96JAWSB1v2R8KbfUg=/0x0:1196x1192/600x0/images/-458880.jpg" alt="mcdo">
      <div class="info_order">
        <h2 class="restaurant">Nom restaurant</h2>
        <p class="address">Adresse</p>
        <p class="price">Prix : 29 UEC</p>
      </div>
    </div>
    <div class="status_command">
      <p class="status">Status : status</p>
      <p class="nbr_article">n articles</p>
    </div>
  </div>

</template>

<style scoped>
img {
  height: 90px;
}

.order_card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.order_card:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.logo_and_info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>