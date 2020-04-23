<template>
  <div class="home">
    <Navbar :username="this.$store.state.username"> </Navbar>
    <b-alert
      variant="danger"
      dismissible
      fade
      :show="this.$store.state.statusAlert"
      @dismissed="dismissed"
    >
      {{this.$store.state.message}}
    </b-alert>
    <div class="container mt-5">
        <Product :products="this.$store.state.products"> </Product>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Product from '@/components/Product.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    Product,

  },
  methods: {
    dismissed() {
      this.$store.state.statusAlert = false
    }
  }
};
</script>
