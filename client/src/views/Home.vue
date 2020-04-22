<template>
  <div class="home">
    <Navbar :username="this.$store.state.username"> </Navbar>
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
};
</script>
