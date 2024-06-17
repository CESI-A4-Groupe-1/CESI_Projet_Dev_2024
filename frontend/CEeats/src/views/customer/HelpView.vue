<script lang="ts">
import {defineComponent} from 'vue'
import pkg from '../../../package.json';

export default defineComponent({
  name: "HelpView",
  data() {
    return {
      version: pkg.version
    }
  },
})
</script>

<template>
  <main>
    <h2 class="help">Aide et informations</h2>
    <div class="confidentiality">
      <p class="title">Confidentialité des données</p>
      <p class="description">Information sur l'utilisateur des données utilisateurs</p>
    </div>
    <div class="version">
      <p class="title">Version du logiciel</p>
      <p class="description">v {{ version }}</p>
    </div>
    <div class="guide">
      <p class="title">Guide d'utilisation</p>
      <a class="description" href="https://github.com/CESI-A4-Groupe-1/CESI_Projet_Dev_2024/tree/master">Projet github</a>
    </div>

  </main>
</template>

<style scoped>
.title {
  font-weight: bold;
}

</style>