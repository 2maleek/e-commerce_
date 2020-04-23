<template>
  <div class="row">
    <div class="col-sm-6 col-md-3 col-lg-3" v-for="product in products" :key="product.id">
      <div class="cols-12">
        <b-card
          no-body
          style="width: 10rem; height: 20rem; font-size:1em;"
          :img-src="product.image_url"
          img-alt="Image"
          img-top
        >
          <b-card-body>
            <b-card-title>{{ product.name }}</b-card-title>
            <b-card-sub-title class="mb-2">category: {{ product.category }}</b-card-sub-title>
            <b-card-text>
              {{ product.description.substring(0, 70) }} <b-link @click="viewDetail(product.id)">View detail</b-link>
            </b-card-text>
            <b-card-text>
              <h5>Price: Rp.{{ product.price }}</h5>
              <p>Stocks: {{ product.stock }}</p>

            </b-card-text>
          </b-card-body>

          <b-card-body>
            <b-button variant="primary" @click="addToCart(product.id)">Add to cart</b-button>
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
