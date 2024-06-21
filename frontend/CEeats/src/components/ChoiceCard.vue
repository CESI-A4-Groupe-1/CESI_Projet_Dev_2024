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
    <router-link :to="{ name: 'specific_history' }" class="btn-choice">
      <i :class="card.icon"></i>
    </router-link>
  </div>
</template>

<style scoped>
.btn-choice {
  width : 100%;
  align-self: center;
  justify-self: center;
  padding: 10px;
  background-color: #04aa6d;
  color: white;
  border: solid;
  font-size: 16px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
}
i {
  width: 100%;
  height: 125px;
  text-align: center;

}
h1 {
  font-size: 20px;
  text-align: center;
}

.container {
  margin: auto;
}
</style>