<script setup>
import ArticleCard from "@/components/ArticleCard.vue";
</script>

<script>

export default {
  props: {
    articles: Object,
  },
}
</script>

<template>
  <div class="article_list">
    <ArticleCard v-for="(article, i) in articles" :key="i" :article="article"></ArticleCard>
  </div>
</template>

<style scoped>
.article_list {
  width: 100%;
}

</style>