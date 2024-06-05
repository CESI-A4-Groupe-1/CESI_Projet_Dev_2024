<script setup lang="ts">
  import Button from "primevue/button";
</script>

<template>
  <button class="filter_button">
    Filtre
    <span class="chevron">
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
        <title>Chevron down small</title>
        <path d="M18 8v3.8l-6 4.6-6-4.6V8l6 4.6L18 8Z" fill="currentColor"></path>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.filter_button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border: 1px solid transparent;
  margin-right: 8px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-right: 12px;
  padding-left: 12px;
}

</style>