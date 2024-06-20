<script lang="ts">
import RestorerSidebar from "@/components/RestorerSidebar.vue";
import RestorerList from "@/components/RestorerList.vue";


export default {
  name: 'RestorerhomeView',
  components: {
    RestorerSidebar,
    RestorerList,
  },
}
</script>


<template>
  <main>
    <div>
      <div class="card_choice">
        <div>
          <RestorerSidebar></RestorerSidebar>
        </div>
        <div class="restorer_list">
          <RestorerList></RestorerList>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card_choice {
  display: flex;
}

.restorer_list {
  flex-basis: 60%;
}

</style>