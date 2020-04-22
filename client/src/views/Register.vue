<template>
  <b-container class="bv-example-row bv-example-row-flex-cols mt-5" style="height: 50vh;">
    <b-row class="justify-content-center" align-v="center" style="margin-top: 30vh;">
      <b-col cols=6 >
        <b-form @submit.prevent="signUp">
          <b-form-group label="Name" label-for="name" >
            <b-form-input
              id="name"
              v-model="name"
              required
              placeholder="Enter Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email address" label-for="email" >
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Sign Up</b-button>
          <p>Already have an account? <b-link @click="signIn">SignIn here</b-link></p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', {name: this.name, email: this.email, password: this.password}) 
    },
    signIn() {
      this.$router.push('/login')
    },
  }
}
</script>
