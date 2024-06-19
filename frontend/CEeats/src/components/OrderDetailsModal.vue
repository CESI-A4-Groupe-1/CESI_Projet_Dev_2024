<script lang="ts">
import {defineComponent} from 'vue'
import '@/assets/main.css'
import {RestaurantService} from "@/services";

export default defineComponent({
  name: "OrderDetailsModal",
  props: {
    order: {
      type: Object as () => any,
      required: true
    }
  },
  data() {
    return {
      restaurant: {} as any,
      formattedDate: ''
    }
  },
  mounted() {
    RestaurantService.getRestaurant(this.order.id_restaurant)
        .then(res => {
          this.restaurant = res.data;
        })
        .catch(err => {
          console.error('Erreur lors de la récupération des informations du restaurant :', err);
        });

    // Formatage de la date DD/MM/YYYY
    const dateObj = new Date(this.order.createdAt);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    this.formattedDate = `${day}/${month}/${year}`;
  },
  emits: ['close']
});
</script>


<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <Button icon="pi pi-times" class="close" severity="secondary" text rounded aria-label="Bookmark" @click="$emit('close')"></Button>
      <div class="modal_header">
        <h2>Commande pour : {{ restaurant.nom }}</h2>
        <p class="status">Status : {{  }}</p>
        <p>Fait le : {{ formattedDate }}</p>
      </div>
      <br>
      <div class="model_body">
        <p class="content">Contenu :</p>
<!--        <div class="details">-->
<!--          <p class="articles">{{nbr}}x{{article}}</p>-->
<!--          <p class="price">{{price}}€</p>-->
<!--        </div>-->
        <div class="order-list" v-for="(article, i) in order.commande_lists" :key="i">
            <div class="order-item">
              <div class="quantity">
                <Button icon="pi pi-minus" text aria-label="takeOffArticle" severity="secondary" @click="takeOffArticle"/>
                <span class="quatite">{{ article.quantite }}</span>
                <Button icon="pi pi-plus" text aria-label="addArticle" severity="secondary" @click="addArticle"/>
              </div>
              <span class="product-name">{{ article.id_article_article.nom }}</span>
              <span class="total-price">{{ article.id_article_article.prix*article.quantite }}€</span>
              <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Supprimer" />
            </div>
           </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.close {
  float: right;
}

.modal-header h3 {
  font-size: 1.2em;
  margin: 0;
}

.order-item {
  display: flex; /* Utiliser "display: contents" pour éviter des éléments supplémentaires */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.product-name {
  text-align: left;
}

.quantity {
  display: flex;
  flex-direction: row;
  align-items:center;
}
</style>