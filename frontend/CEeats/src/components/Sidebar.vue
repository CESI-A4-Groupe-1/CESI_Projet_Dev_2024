<template>
  <div class="sidebar_class" v-if="isMenuOpen"></div>
</template>
<script lang="ts">
export default {
  name: 'mainpage-sidebar',
  props: {
    isMenuOpen: {}
  }
}
</script>
<style scoped>
h1 {
  color: #2a4252;
  font-size: 34px;
}

.sidebar_class {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
  border: 2px solid #2a4252;
}
</style>
