<script setup lang="ts">
import ArticleList from "@/components/ArticleList.vue";

defineProps ({
  i: Number,
  menue_name: String
})
</script>

<template>
  <div class="menue">
    <h3 class="menue_name" :id="'heading' + i">{{ menue_name }}</h3>
    <div class="articles">
      <ArticleList :menue_id="i"></ArticleList>
    </div>
  </div>
</template>

<style scoped>
.menue {
  width: 100%;
}

</style>