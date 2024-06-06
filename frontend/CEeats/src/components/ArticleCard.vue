<script setup lang="ts">

defineProps ({
  article: Object as any,
})
</script>

<template>
  <div class="article_card">
    <div class="article_infos">
      <h3 class="article_name">{{article.nom}}</h3>
      <p class="price">{{ article.prix }}€</p>
      <p class="description">{{ article.description }}</p>
    </div>
    <div class="image">
      <img src="https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg" alt="mcdo">
    </div>
  </div>
</template>

<style scoped>
.article_card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
}

.article_infos {
  width: 100%;
}

.image {
  width: 20%;
  img {
    height: 90px;
  }
}

</style>