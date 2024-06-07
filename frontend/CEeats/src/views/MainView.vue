<script setup lang="ts"></script>

<script lang="ts">
export default {
  data() {
    return {
      test: 5
    }
  },
  mounted() {
    this.maFonction()
  },
  methods: {
    maFonction() {
      this.test += (this.test + 3)
    }
  }
}
</script>


<template>
  <h3>ceci est la vue principale</h3>
  <h3>elle est utilisée pour le débogage</h3>
</template>

<style scoped></style>
