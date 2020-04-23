<template>
  <b-container class="bv-example-row bv-example-row-flex-cols" style="height: 50vh;">
    <b-alert
      variant="danger"
      dismissible
      fade
      :show="statusAlert"
      @dismissed="statusAlert=false"
    >
      {{message}}
    </b-alert>
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
import axios from 'axios';

export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      email: '',
      password: '',
      message: '',
      statusAlert: false,
    }
  },
  methods: {
    signIn() {
      const payload = {
        email: this.email,
        password: this.password
      }
      axios({
        method: 'post',
        url: '/login',
        data: payload,
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('username', response.data.name)
        this.$store.commit('setUsername', localStorage.getItem('username'))
        this.$router.push('/')
      })
      .catch(err => {
        this.message = err.response.data.message
        this.statusAlert = true
      })
    },
    signUp() {
      this.$router.push('/register')
    },
  }
}
</script>
