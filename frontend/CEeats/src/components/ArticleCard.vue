<script lang="ts">
import { OrderService } from '@/services/OrderService'
import {useRoute} from "vue-router";
import {ref} from "vue";

export default {
    name: "ArticleCard",
    props: {
      article: Object as any,
    },
    data() {
      return {
        route: useRoute(),
        id_user: 1,
        orders: [] as Array<any>,
        value: ref(0),
        ordered_restaurants: [] as number[],
        article_id: this.article.id,
        data : {
          id: Number || null,
          id_article: Number || null,
          id_commande: Number || null,
          quantite: 0,
        },
        visible: ref(false),
      }
    },
    methods: {
      addToOrder() {
        this.getOrders(this.id_user)
            .then(() => {
              const restaurantId = this.route.params.id;
              const existingOrder = this.orders.find(order => Number(order.id_restaurant) === Number(restaurantId) && order.validated_at === null);
              if (!existingOrder) {
                console.log('in if');
                // Sinon, créez une nouvelle commande
                this.createOrder(this.id_user, restaurantId)
                    .then(newOrderId => {
                      let data = {
                        id_article: this.article_id,
                        id_commande: newOrderId,
                        quantite: this.data.quantite
                      };
                      // Appeler la méthode pour ajouter l'article à la commande
                      this.updateOrder(newOrderId, this.article_id, data);
                    })
                    .catch(err => {
                      console.error(err);
                    });
              } else {
                console.log('in else');
                let data = {
                  id_article: this.article_id,
                  id_commande: existingOrder.id,
                  quantite: this.data.quantite
                };
                this.updateOrder(existingOrder.id, this.article_id, data);
              }
              this.visible = false;
            })
            .catch(err => {
              this.visible = false;
              console.error(err);
            });
      },
      getOrders(id_user: number) {
        return OrderService.getOrders(id_user)
            .then(res => {
              this.orders = res.data;
              this.ordered_restaurants = this.orders.map(order => order.id_restaurant);
            })
            .catch(err => console.log(err));
      },
      updateOrder(order_id: number, article_id: number, data: object) {
        console.log('in update')
        OrderService.addArticleToOrder(order_id, article_id, data)
            .then(res => {
              console.log('Article ajouté à la commande:', res);
            })
            .catch(err => console.error(err));
      },
      createOrder(user_id: number, restaurant_id: any) {
        let data = {"id_client": user_id, "id_restaurant": restaurant_id}
        return OrderService.addOrder(user_id, data)
            .then(res => {
              console.log('Nouvelle commande créée:', res);
              return res.data.id;
            })
            .catch(err => {
              console.error('Erreur lors de la création de la commande:', err);
              throw err;
            });
      }
    }
  }
</script>

<template>
  <div class="article_card">
    <div class="info_and_add">
      <div class="article_infos">
        <h3 class="article_name">{{article.nom}}</h3>
        <p class="price">{{ article.prix }}€</p>
        <p class="description">{{ article.description }}</p>
      </div>
      <div class="image">
        <div class="button_add">
          <Button icon="pi pi-plus" severity="secondary" rounded aria-label="AddArticle" @click="visible = true"/>
          <Dialog v-model:visible="visible" modal :header="article.nom" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Choisir la quantité</span>
            <div class="flex-auto">
              <InputNumber v-model="data.quantite" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :min="0" :max="99">
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
            <div class="flex justify-end gap-2">
              <Button type="button" label="Annuler" severity="secondary" @click="visible = false"></Button>
              <Button type="button" label="Ajouter à la commande" @click="addToOrder"></Button>
            </div>
          </Dialog>
        </div>
        <!--        <img src="https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg" alt="mcdo">-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.article_card {
  border: 1px solid rgb(243, 243, 243);
  border-radius: 12px;
  margin-bottom: 1rem;
  position: relative; /* This is important for absolute positioning inside */
}

span {
  height: 100%;
}

.info_and_add {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.image {
  height: 150px;
  width: 30%;
  background-image: url("https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.button_add {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>