<script lang="ts">
export default {
  name: "ArticleCard",
  components: {},
  props: {
    article: Object as any,
  }
}

</script>

<template>
  <div class="article_card">
    <div class="info_and_add">
      <div class="article_infos">
        <h3 class="article_name">{{article.nom}}</h3>
        <p class="price">{{ article.prix }}€</p>
        <p class="description">{{ article.description }}</p>
      </div>
      <div class="image">
        <img src="https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg" alt="mcdo">
      </div>
    </div>
    <div class="button_add">
      <Button icon="pi pi-plus" severity="secondary" rounded aria-label="AddArticle" />
    </div>
  </div>
</template>

<style scoped>
.article_card {
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative; /* This is important for absolute positioning inside */
}

.info_and_add {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.image {
  width: 20%;
  img {
    height: 90px;
  }
}

.button_add {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

</style>