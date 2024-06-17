<script setup lang="ts">
import ArticleList from "@/components/ArticleList.vue";

defineProps ({
  i: Number,
  menue: Object as any,
})
</script>

<template>
  <div class="menue">
    <h3 class="menue_name" :id="'heading' + i">{{ menue.titre_section }}</h3>
    <div class="articles">
      <ArticleList :articles="menue.articles"></ArticleList>
    </div>
  </div>
</template>

<style scoped>
.menue {
  width: 100%;
}

</style>