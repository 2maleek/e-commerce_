<template>
  <div>
    <Navbar> </Navbar>
    <div>
      <h1>Thanks for ordering</h1>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Checkout',
  components: {
    Navbar,
  }
}
</script>
