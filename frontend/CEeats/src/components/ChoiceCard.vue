<script lang="ts">
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  name: "ChoiceCar",
  components: {},
  props: {
    card: Object as any,
  }
}

</script>

<template>
  <div>
    <h1> {{card.nom}} </h1>
      <button class ="btn-choice" type="button">
        <i :class="card.icon"></i>
      </button>
  </div>
</template>

<style scoped>
.btn-choice {
  width : 100%;
  align-self: center;
  justify-self: center;
  padding: 10px;
}
i {
  width: 100%;
  height: 150px;
}
h1 {
  font-size: 20px;
  text-align: center;
}

.container {
  margin: auto;
}
</style>