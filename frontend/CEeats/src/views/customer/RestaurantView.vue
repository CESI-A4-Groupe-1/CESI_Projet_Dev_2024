<script setup lang="js">
import Menue from "@/components/Menue.vue";
</script>

<script lang="js">
import { RestaurantService } from "@/services/RestaurantService.js"
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      // Ici, mettre les variables
      route: useRoute(),
      menues: [],
      restaurant: Object
    }
  },
  methods: {
    // Ici, mettre les méthodes
    capitalizeFirstLetter(str) {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    scrollToMenu(event, index) {
      event.preventDefault();
      const element = document.getElementById(`heading${index}`);
      if (element) {
        element.scrollIntoView({behavior: "smooth"});
      }
    },
    //TODO : Fonction get_menue() qui renvoie menue:[article:{nom, prix, description, img}]. Donner la valuer au composant 'Menue'
    //TODO : Fonction add_to_order(). Une gestion du panier sera nécessaire.
  },
  mounted() {
    RestaurantService.getRestaurant(this.route.params.id)
        .then(res => {
          this.restaurant = res.data;
        })
        .catch(err => console.log(err));
    RestaurantService.getRestaurantMenues(this.route.params.id)
        .then(res => {
          this.menues = res;
        })
  }
}
</script>


<template>
  <main>
    <div class="restaurant_banner">
      <div class="button_return">
        <Button icon="pi pi-arrow-left" severity="secondary" text rounded aria-label="Bookmark" @click="$router.go(-1)"></Button>
      </div>
    </div>
    <div class="restaurant_top">
      <div class="restaurant_infos">
        <h2 class="restaurant_name">{{ capitalizeFirstLetter(restaurant.nom) }}</h2>
        <p class="restaurant_details">
          #.9 (2000) - 5000 km - Ouverture: 12:00-22:00 <br>
          {{ capitalizeFirstLetter(restaurant.adresse) }} - $$
        </p>
      </div>
      <nav class="list_menues">
        <ul class="list">
          <li class="menue">
            <a href="#" class="menue_link" v-for="(menue, i) in restaurant.sections" :key="i"
               @click="(event) => scrollToMenu(event, i)">
              {{ menue.titre_section }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="menues_content" v-for="(menue, i) in restaurant.sections" :key="i">
      <Menue :i="i" :menue="menue"></Menue>
    </div>
  </main>
</template>

<!--TODO : styliser la page-->
<style scoped>
.restaurant_banner {
  height: 200px;
  background-image: url("https://eu-images.contentstack.com/v3/assets/blt5004e64d3579c43f/blt48366c92248b30a1/65ce4cf60bdd87040aaea572/400x400_RU_Cheeseburger_PtitwrapRanch_McFishMayo_frite_coca_petit.png?width=1200&height=630&crop=1200:630");
  background-size: cover;
  background-position: bottom center;
  position: relative;
}

.button_return {
  position: absolute;
  top: 10px;
  left: 10px;
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