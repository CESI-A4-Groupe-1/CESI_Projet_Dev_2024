<script setup>
</script>

<script>
export default {
  name: "CategoryCard",
  components: {
  },
  data() {
    return {

    }
  },
  props: [
    "tagName",
    "category_id"
  ]
}

</script>

<template>
  <RouterLink :to="'/resultats/' + category_id" class="single_category">
    <p class="middle">{{ tagName }}</p>
    <p class="category_name">{{ tagName }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
  .single_category {
    background-color: lightgrey;
    width: 45%;
    height: 100px;
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 10px;
    margin-bottom: 20px;
    color: black;
    .category_name {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 10px;
    }
  }

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.single_category:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.single_category:hover .middle {
  opacity: 1;
  font-size: larger;
  margin: 0;
}

.single_category:hover .category_name {
  display: none;
}

</style>