<script lang="ts">
import { defineComponent } from 'vue';
import '@/assets/main.css';
import { RestaurantService } from "@/services";
import { OrderService } from '@/services/OrderService';

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
      formattedDate: '',
      status: '',
      statusClass: '',
      total: Number
    };
  },
  methods: {
    async takeOffArticle(article) {
      if (article.quantite > 0) {
        article.quantite--;
        OrderService.addArticleToOrder(article.id_commande, article.id_article, article)
            .then(res => {
              console.log('Article ajouté à la commande:', res);
              this.updateTotal();
            })
            .catch(err => console.error(err));
      }
    },
    async addArticle(article) {
      article.quantite++;
      OrderService.addArticleToOrder(article.id_commande, article.id_article, article)
          .then(res => {
            console.log('Article ajouté à la commande:', res);
            this.updateTotal();
          })
          .catch(err => console.error(err));
    },
    isTakeOffDisabled(quantity) {
      return quantity <= 0; // Disable if quantity is 0 or less
    },
    deleteFromOrder(article) {
      this.$confirm.require({
        message: 'Voulez-vous supprimer cet article de la commande ?',
        header: 'Supprimer cet article',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
          label: 'Annuler',
          severity: 'secondary',
          outlined: true
        },
        acceptProps: {
          label: 'Supprimer',
          severity: 'danger'
        },
        accept: async () => {
          try {
            console.log(article);
            await OrderService.deleteArticleFromOrder(article.id_commande, article.id_article);
            const index = this.order.commande_lists.findIndex((item: any) => item.id_article === article.id_article);
            if (index !== -1) {
              this.order.commande_lists.splice(index, 1);
              this.updateTotal();
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de l\'article de la commande:', error);
          }
        },
        reject: () => {
          console.log('Suppression annulée');
        }
      });
    },
    async pay() {
      this.$confirm.require({
        message: 'Voulez-vous vraiment valider la commande ?',
        header: 'Payer la commande',
        icon: 'pi pi-paypal',
        accept: async () => {
          try {
            await OrderService.payOrder(this.order.id);
            console.log('Commande validée');
            this.status = 'En préparation'; // Mise à jour de l'état après validation
            this.statusClass = 'status-preparation';
            window.location.reload();
          } catch (error) {
            console.error('Erreur lors de la validation de la commande :', error);
          }
        },
        reject: () => {
          console.log('Commande non validée');
        }
      });
    },
    updateTotal() {
      this.total = OrderService.getTotalPrice(this.order.commande_lists);
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

    this.status = OrderService.getOrderStatus(this.order);
    this.statusClass = OrderService.getOrderStatusClass(this.order);
    this.updateTotal();
  },
  emits: ['close']
});
</script>


<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <Button icon="pi pi-times" class="close" severity="secondary" text rounded aria-label="Bookmark" @click="$emit('close')"></Button>
      <div class="modal_header">
        <h2>Commande pour : <RouterLink :to="`/restaurants/${restaurant.id}`">{{ restaurant.nom }}</RouterLink></h2>
        <p :class="['status', statusClass]">Status : {{ status }}</p>
        <p>Fait le : {{ formattedDate }}</p>
      </div>
      <br>
      <div class="model_body">
        <p class="content">Contenu :</p>
        <div class="order-list">
          <div class="order-item" v-for="(article, i) in order.commande_lists" :key="i">
            <div class="quantity">
              <Button v-if="status=='Commande non validée'" icon="pi pi-minus" text aria-label="takeOffArticle" severity="secondary"
                      :disabled="isTakeOffDisabled(article.quantite)"
                      @click="takeOffArticle(article)"></Button>
              <span class="quantity">{{ article.quantite }}</span>
              <Button v-if="status=='Commande non validée'" icon="pi pi-plus" text aria-label="addArticle" severity="secondary"
                      @click="addArticle(article)"></Button>
            </div>
            <span class="product-name">{{ article.id_article_article.nom }}</span>
            <span class="total-price">{{ article.id_article_article.prix * article.quantite }}€</span>
            <Button v-if="status=='Commande non validée'" icon="pi pi-trash" severity="danger" text rounded aria-label="Supprimer" @click="deleteFromOrder(article)"/>
          </div>
          <ConfirmDialog></ConfirmDialog>
        </div>
      </div>
      <p class="total_price">Total : {{ total }}€</p>
      <Button v-if="status=='Commande non validée'" label="Valider et payer" @click="pay"/>
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