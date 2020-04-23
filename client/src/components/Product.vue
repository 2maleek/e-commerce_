<template>
  <div class="row">
    <div class="col-sm-6 col-md-3 col-lg-3" v-for="product in products" :key="product.id">
      <div class="cols-12">
        <b-card
          no-body
          style="width: 13rem; height: 27rem; font-size:0.8rem;"
          :img-src="product.image_url"
          img-alt="Image"
          img-top
        >
          <b-card-body class="mb-5">
            <p>{{ product.name.substring(0, 20) }}</p>
            <small>category: {{ product.category }}</small>
            <p>Price: Rp.{{ product.price }}</p>
            <p>Stocks: {{ product.stock }}</p>
            <p><b-link @click="viewDetail(product.id)">View detail</b-link></p>
          </b-card-body>

          <b-card-body>
            <b-button size="sm" variant="primary" @click="addToCart(product.id)">Add to cart</b-button>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: [ 'products' ],
  methods: {
    addToCart(ProductId) {
      this.$store.dispatch('addToCart', ProductId)
    },

    viewDetail(ProductId) {

    },
  }
}
</script>
