 <script setup lang="ts">
import ArticleCard from "@/components/ArticleCard.vue";

// Définir l'interface pour un article
interface Article {
  nom: string;
  prix: number;
  description: string;
}

// Définir l'interface pour la collection d'articles
interface Articles {
  [key: string]: Article;
}

// Déclarer les articles en respectant les interfaces
const articles: Articles = {
  "article1": {
    nom: "Bœuf Bourguignon",
    prix: 16.00,
    description: "Un bœuf bourguignon mijoté au vin rouge avec des carottes et des oignons."
  },
  "article2": {
    nom: "Escargots de Bourgogne",
    prix: 9.00,
    description: "Escargots cuits au beurre d'ail et au persil."
  },
  "article3": {
    nom: "Soufflé au fromage",
    prix: 7.00,
    description: "Un soufflé léger et aéré au fromage."
  }
};

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