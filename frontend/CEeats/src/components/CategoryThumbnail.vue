<script setup lang="ts">

</script>

<template>
    <div class="category_thumbnail" v-for="(icons, i) in 15" :key="i">
<!--      from: https://www.flaticon.com/fr/icone-gratuite/fast-food_3787263-->
      <img src="https://cdn-icons-png.flaticon.com/512/3787/3787263.png" alt="fast food">
      <p class="category_name">Catégorie 1</p>
  </div>
</template>

<style scoped>
.category_thumbnail {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  img {
    width: 60px;
  }
  .category_name {
    font-size: smaller;
    flex-wrap: wrap;
  }
}

</style>