<script setup lang="js">
import Carousel from 'primevue/carousel';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import {ref} from "vue";
import {RestaurantService} from "@/services/index.js";

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
</script>

<script lang="js">
import {RestaurantService} from "@/services/index.js";

export default {
  data() {
    return {
      restaurant_array: [],
      categories: [],
    }
  },
  mounted() {
    RestaurantService.getAllRestaurants()
        .then(res => {
          this.restaurant_array = res.data;
          console.log(this.restaurant_array)
        })
        .catch(err => console.log(err))

    RestaurantService.getAllCategories()
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => console.log(err))
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Avatar v-for="(category, i) in categories" :key="1" class="categ" :image="categories.image" size="xlarge" shape="circle">
      <RouterLink :to="'/resultats/' + categories.id" class="category_thumbnail"/>
    </Avatar>
    <Avatar v-for="(category, i) in categories" :key="2" class="categ" :image="categories.image" size="xlarge" shape="circle">
      <RouterLink :to="'/resultats/' + categories.id" class="category_thumbnail"/>
    </Avatar>
    <Avatar v-for="(category, i) in categories" :key="3" class="categ" :image="categories.image" size="xlarge" shape="circle">
      <RouterLink :to="'/resultats/' + categories.id" class="category_thumbnail"/>
    </Avatar>
    <Avatar v-for="(category, i) in categories" :key="4" class="categ" :image="categories.image" size="xlarge" shape="circle">
      <RouterLink :to="'/resultats/' + categories.id" class="category_thumbnail"/>
    </Avatar>
    <Avatar v-for="(category, i) in categories" :key="5" class="categ" :image="categories.image" size="xlarge" shape="circle">
      <RouterLink :to="'/resultats/' + categories.id" class="category_thumbnail"/>
    </Avatar>
  </div>
  <InputGroup>
    <InputGroupAddon>
      <i class="pi pi-search"></i>
    </InputGroupAddon>
    <InputText  placeholder="Search" />
  </InputGroup>
  <div class="card">
    <Carousel :value="restaurant_array" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img :src="slotProps.data.image" :alt="slotProps.data.description" class="w-full rounded" />
            </div>
          </div>
            <Button outlined class="border-2">
              <RouterLink class="restos" :to="`/restaurants/${slotProps.data.id}`"><div class="mb-4 font-medium">{{ slotProps.data.nom }}</div></RouterLink>
            </Button>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.searchbardebz {
  width: 80%;
}

.restos {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: white;
}

.w-full rounded {
  width: 30%;
}

.categ {
  object-fit: cover;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
</style>
