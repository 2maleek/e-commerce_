<template>
  <div class="home">
    <Navbar :username="this.$store.state.username"> </Navbar>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
  },
};
</script>
