<script setup lang="ts">

</script>

<template>
  <div class="single_category">
    <p class="category_name">Catégorie 1</p>
  </div>
</template>

<style lang="scss" scoped>
  .single_category {
    background-color: lightgrey;
    width: 45%;
    height: 100px;
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 10px;
    .category_name {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 10px;
    }
  }
</style>