<script lang="ts">
import { defineComponent } from 'vue'
import pkg from '../../../package.json';

export default defineComponent({
  name: "HelpView",
  data() {
    return {
      version: pkg.version,
      privacyInfo: {
        title: 'Confidentialité des données',
        description: [
          'Nous accordons une grande importance à la protection de vos données personnelles. Voici quelques points clés concernant l\'utilisation de vos données :',
          {
            header: 'Collecte des données',
            text: 'Nous collectons des informations personnelles telles que votre nom, adresse e-mail, et autres informations nécessaires pour fournir nos services.'
          },
          {
            header: 'Utilisation des données',
            text: 'Vos données sont utilisées pour améliorer nos services, personnaliser votre expérience utilisateur et pour des raisons administratives.'
          },
          {
            header: 'Stockage des données',
            text: 'Les données sont stockées en toute sécurité dans des bases de données protégées. Nous utilisons des technologies de cryptage pour protéger vos informations sensibles.'
          },
          {
            header: 'Partage des données',
            text: 'Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour fournir un service que vous avez demandé ou si la loi nous y oblige.'
          },
          {
            header: 'Sécurité des données',
            text: 'Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction.'
          },
          {
            header: 'Vos droits',
            text: 'Vous avez le droit d\'accéder à vos données, de les corriger, de les supprimer et de restreindre leur traitement.'
          }
        ]
      }
    }
  },
})
</script>

<template>
  <main>
    <h2 class="help">Aide et informations</h2>

    <div class="section">
      <p class="title">{{ privacyInfo.title }}</p>
      <p>{{ privacyInfo.description[0] }}</p>
      <ul>
        <li v-for="(info, index) in privacyInfo.description.slice(1)" :key="index">
          <strong>{{ info.header }}:</strong> {{ info.text }}
        </li>
      </ul>
    </div>

    <div class="section">
      <p class="title">Version du logiciel</p>
      <p class="description">v {{ version }}</p>
    </div>

    <div class="section">
      <p class="title">Guide d'utilisation</p>
      <a class="description" href="https://github.com/CESI-A4-Groupe-1/CESI_Projet_Dev_2024/tree/master" target="_blank">Projet github</a>
    </div>
  </main>
</template>

<style scoped>
.section {
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  margin: 10px 0;
  padding: 0 20px;
}

li {
  margin-bottom: 10px;
}

.description {
  line-height: 1.5;
}

a.description {
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
}

a.description:hover {
  text-decoration: underline;
}
</style>

