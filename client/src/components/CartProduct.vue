<template>
  <tr>
    <td class="col-sm-8 col-md-6">
      <div class="media">
        <a class="thumbnail pull-left"> <img class="media-object" :src="image_url" style="width: 72px; height: 72px;"> </a>
        <div class="media-body">
          <h4 class="media-heading"><a>{{productName}}</a></h4>
          <!-- <h5 class="media-heading"> Category: {{ category }}</h5> -->
          <span>Stocks: </span><span class="text-success"><strong>{{ stock }}</strong></span>
        </div>
      </div>
    </td>
    <td class="col-sm-1 col-md-1" style="text-align: center">
      <b-form-spinbutton
        id="sb-inline"
        min="1"
        :max="stock"
        step="1"
        inline
        v-model="quantity"
        @change="updateQuantity(index, id, quantity)"
      >
      </b-form-spinbutton>
    </td>
    <td class="col-sm-1 col-md-1 text-center"><strong>Rp.{{ price }}</strong></td>
    <td class="col-sm-1 col-md-1 text-center"><strong>Rp.{{ subtotal }}</strong></td>
    <td class="col-sm-1 col-md-1">
    <button type="button" class="btn btn-danger" @click="deleteCart(id)">
      <span class="glyphicon glyphicon-remove"></span> Remove
    </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CartProduct',
  props: ['image_url', 'price', 'productName', 'stock', 'category', 'id', 'ProductId', 'quantity', 'index'],
  methods: {
    deleteCart(id) {
      console.log(id)
      this.$store.dispatch('deleteCart', id)
    },

    updateQuantity(index, id, quantity) {
      this.$store.commit('updateQuantity', { id, index, quantity })
    }
  },
  computed: {
    subtotal() {
      return this.price * this.quantity
    }
  },
}
</script>
