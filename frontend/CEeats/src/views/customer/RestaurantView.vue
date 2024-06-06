<script setup lang="js">
  import Menue from "@/components/Menue.vue";
  import {useRoute} from "vue-router";

  const route = useRoute();
  let value = route.params.id;

  let menues = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

  const scrollToMenu = (event, index) => {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    const element = document.getElementById(`heading${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // Défilement en douceur
    }
  };

</script>

<template>
  <main>
    <div class="restaurant_banner"></div>
    <div class="restaurant_top">
      <div class="restaurant_infos">
        <h2 class="restaurant_name">Restaurants {{ value }}</h2>
        <p class="restaurant_details">
          #.9 (2000) - 5000 km - Ouverture: 12:00-22:00 <br>
          adresse - $$
        </p>
      </div>
      <nav class="list_menues">
        <ul class="list">
          <li class="menue">
            <a href="#" class="menue_link" v-for="(menue, i) in menues" :key="i" @click="(event) => scrollToMenu(event, i)">
              {{ menues[i] }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="menues_content" v-for="(menue, i) in menues" :key="i">
      <Menue :i="i" :menue_name="menue"></Menue>
    </div>
  </main>
</template>

<style scoped>
.restaurant_banner {
  height: 200px;
  background-image:url("https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt48366c92248b30a1/65ce4cf60bdd87040aaea572/400x400_RU_Cheeseburger_PtitwrapRanch_McFishMayo_frite_coca_petit.png?width=1200&height=630&crop=1200:630");
  background-size: cover;
  background-position: bottom center
}

.restaurant_top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.restaurant_infos {
  text-align: center;
}

.list_menues {
  width: 50%;
  text-align: center;
}

.list, .menue {
  display: inline-block;
  a {
    padding: 0 15px;
  }
}

.menue_link {
  text-decoration: none;
}

.menue_link.active {
  text-decoration: underline;
}
</style>