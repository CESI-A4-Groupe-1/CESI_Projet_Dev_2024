<template>
  <RouterLink :to="'/resultats/' + category_id" class="single_category" :style="{ backgroundImage: 'url(' + (image ? image : defaultImage) + ')' }">
    <p class="middle">{{ tagName }}</p>
    <p class="category_name">{{ tagName }}</p>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import defaultImage from '@/assets/no-image.jpg';
</script>

<script>
export default {
  name: "CategoryCard",
  props: {
    tagName: String,
    category_id: Number,
    image: String
  }
}
</script>

<style scoped lang="scss">
.single_category {
  background-color: lightgrey;
  background-size: cover;
  background-position: center;
  width: 300px; /* Largeur fixe de la carte */
  height: 200px; /* Hauteur fixe de la carte */
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 15px; /* Augmenter le padding pour plus d'espace intérieur */
  margin-bottom: 20px;
  border-radius: 10px; /* Coins arrondis */

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 5px; /* Légèrement plus grande ombre au survol */
  }

  .category_name {
    position: absolute;
    bottom: 15px; /* Espacement du bas */
    right: 15px; /* Espacement de droite */
    color: #FFFFFF; /* Couleur du texte (blanc) */
    background-color: #04AA6D; /* Couleur de fond (vert) */
    padding: 8px 15px; /* Augmenter le padding pour plus de confort */
    border-radius: 5px; /* Coins arrondis */
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Légère ombre */
  }
}

.middle {
  color: #FFFFFF; /* Couleur du texte (blanc) */
  background-color: #04AA6D; /* Couleur de fond (vert) */
  padding: 10px; /* Espacement autour du texte */
  border-radius: 5px; /* Coins arrondis */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Légère ombre */
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.single_category:hover .middle {
  opacity: 1;
  font-size: 16px; /* Taille de police augmentée au survol */
}

.single_category:hover .category_name {
  display: none; /* Cacher le nom de la catégorie au survol */
}

</style>
