<template>
  <div>
    <Navbar :username="this.$store.state.username"> </Navbar>
    <div class="container">
      <b-alert
        variant="danger"
        dismissible
        fade
        :show="this.$store.state.statusAlert"
        @dismissed="this.$store.state.statusAlert=false"
      >
        {{this.$store.state.message}}
      </b-alert>
      <div class="row">
        <div class="col-sm-12 col-md-8">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th class="text-center">Price</th>
                <th class="text-center">Subtotal</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <CartProduct
                v-for="(cart, index) in this.$store.state.carts"
                :key="cart.id"
                :productName="cart.Product.name"
                :category="cart.Product.category"
                :price="cart.Product.price"
                :stock="cart.Product.stock"
                :id="cart.id"
                :ProductId="cart.Product.id"
                :quantity="cart.quantity"
                :index="index"
                :image_url="cart.Product.image_url"
              >
              </CartProduct>
            </tbody>
          </table>
        </div>

        <div class="col-sm-12 col-md-4 mt-5">
          <tr>
              <td><h3>Total</h3></td>
              <td class="text-right"><h3><strong>Rp.{{totalPrice}}</strong></h3></td>
          </tr>
          <tr>
              <td>
                <button type="button" class="btn btn-default" @click="toHome">
                  <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-success" @click="checkout">
                  Checkout <span class="glyphicon glyphicon-play"></span>
                </button>
              </td>
          </tr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CartProduct from '@/components/CartProduct.vue';

export default {
  name: 'Cart',
  components: {
    Navbar,
    CartProduct,
  },
  computed: {
    totalPrice() {
      let total = 0
      this.$store.state.carts.forEach((item, i) => {
        total += item.Product.price * item.quantity
      });
      return total;

    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    dismissed() {
      this.$store.state.statusAlert = false
    },
    checkout() {
      let prom = []
      this.$store.state.carts.forEach((item, i) => {
        prom.push(this.$store.dispatch('updateProductQuantity', {ProductId: item.Product.id, quantity: item.quantity}))
        prom.push(this.$store.dispatch('deleteCart', item.id))
        this.$router.push('/checkout')
      });
    }
  },
}
</script>
