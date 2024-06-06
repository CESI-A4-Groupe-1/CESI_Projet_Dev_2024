<script setup lang="ts">
import RestaurantList from "@/components/RestaurantList.vue";
import CategoryThumbnail from "@/components/CategoryThumbnail.vue";
import FilterButton from "@/components/FilterButton.vue";
</script>

<template>
  <main>
    <div class="return_and_search">
      <button class="return">
        <a @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
          </svg>
        </a>
      </button>
      <input class="search" type="text" placeholder="Search">
    </div>
    <div class="results_header">
      <h2 class="results">Résultats</h2>
      <p class="nbr_results">6 résultats</p>
    </div>
    <div class="category_pills">
      <CategoryThumbnail></CategoryThumbnail>
    </div>
    <div class="filters">
      <p>Filters : </p>
      <FilterButton v-for="(icons, i) in 3" :key="i"></FilterButton>
    </div>
    <div class="restaurant_list">
      <RestaurantList></RestaurantList>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .return_and_search {
    display: flex;
    flex-direction: row;
    .search{
      width: 100%;
    }
    .return {
      padding: 0.5rem;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid transparent;
      margin-right: 8px;
    }
    .return:hover {
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ;
    }
  }

  .results_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .category_pills {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    overflow-x: scroll;
    scrollbar-width: none;
    scroll-behavior: smooth;
    justify-content: space-around;

    //put shadows on the side when overflow
    background:
        linear-gradient(to right, white 33%, rgba(255, 255, 255, 0)),
        linear-gradient(to left, white 33%, rgba(255, 255, 255, 0)) 100% 0,
        radial-gradient(farthest-side at 0 50%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)),
        radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)) 100% 0;
    background-color: white;
    background-repeat: no-repeat;
    background-attachment: local, local, scroll, scroll;
    background-size: 45px 100%, 45px 100%, 15px 100%, 15px 100%;
  }

  .filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    p {
      margin-right: 16px;
    }
  }

</style>