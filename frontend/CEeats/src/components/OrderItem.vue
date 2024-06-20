<script lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue';

export default defineComponent({
  name: 'OrderItem',
  props: {
    article: {
      type: Object as () => any,
      required: true
    },
    // onUpdate: {
    //   type: Function,
    //   required: true
    // },
    // onRemove: {
    //   type: Function,
    //   required: true
    // }
  },
  setup(props) {
    const quantity = ref<number>(props.article.quantity);

    // const updateQuantity = () => {
    //   props.onUpdate(props.article.id, quantity.value);
    // };
    //
    // const removeItem = () => {
    //   props.onRemove(props.article.id);
    // };

    // const totalPrice = computed(() => {
    //   return (props.article.price * quantity.value).toFixed(2);
    // });

    watch(() => props.article.quantity, (newVal) => {
      quantity.value = newVal;
    });

    return {
      quantity,
      // totalPrice,
      // updateQuantity,
      // removeItem
    };
  }
});
</script>

<template>
  <p>{{article}}</p>
  <div class="order-item">
    <input
        type="number"
        v-model.number="quantity"
<!--        @change="updateQuantity"-->
        min="1"
        class="quantity-input"
    />
    <span class="product-name">{{ article.nom }}</span>
    <span class="total-price">{{ article.prix }}€</span>
    <button @click="console.log('oui')" class="remove-btn">Supprimer</button>
  </div>
</template>

<style scoped>
.order-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-input {
  width: 50px;
  margin-right: 10px;
}

.product-name {
  flex: 1;
}

.total-price {
  width: 80px;
  text-align: right;
  margin-right: 10px;
}

.remove-btn {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #ff1a1a;
}
</style>
