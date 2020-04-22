<template>
  <b-container class="bv-example-row bv-example-row-flex-cols" style="height: 50vh;">
    <b-row class="justify-content-center" align-v="center" style="margin-top: 30vh;">
      <b-col cols=6 >
        <b-form @submit.prevent="signIn">
          <b-form-group label="Email address:" label-for="email" >
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Password:" label-for="password">
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Sign In</b-button>
          <p>Don't have an account? <b-link @click="signUp">SignUp here</b-link></p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch('signIn', {email: this.email, password: this.password})
    },
    signUp() {
      this.$router.push('/register')
    },
  }
}
</script>
