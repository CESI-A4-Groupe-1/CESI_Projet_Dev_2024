<script lang="ts">
export default {
  data() {
    return {
      isMenuOpen: false,
      page_content: {
        page_content_2: true,
        page_content_1: false
      }
    }
  }, methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      this.page_content.page_content_2 = !this.page_content.page_content_2
      this.page_content.page_content_1 = !this.page_content.page_content_2
    }
  }
}


</script>

<template>
  <header class="flex-container">
    <button class="btn btn-primary" type="button"
            style="background: white;color: rgb(42, 66, 82);border-radius: 6px;margin: 0px;text-align: center;border: 4px solid rgb(42, 66, 82);"
            @click="toggleMenu">
      Menu
    </button>
    <h1><strong>CESeats</strong></h1>
    <span class="logo">logo</span>
  </header>

  <div
    v-bind:class="{main_page_content_1: page_content.page_content_1, main_page_content_2: page_content.page_content_2}">

    <div class="sidebar_class" v-if="isMenuOpen">

      qzemoifjmoqsdijfmoqziejfmoijsdmfoijqzemofijqzoif
    </div>
    <router-view class="router_class" />
  </div>


</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

.generic_button {
  border: 5px solid #2a4252;
  background-color: white;
  width: 200px;
  height: 50px;
  font-size: 30px;
}

h1 {
  color: #2a4252;
  font-size: 34px;
}

span.logo {
  width: 50px;
  height: 50px;
  border: 10px solid #2a4252;
}


.main_page_content_1 {
  display: grid;
  grid-template-columns: 30% auto;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-gap: 1em 1em;
  padding: 0px;
}

.main_page_content_2 {
  display: block;
  padding: 20px;
}

.router_class {
  grid-area: 1 / 2 / 2 / 3;

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
