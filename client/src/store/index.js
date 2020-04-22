import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    username: '',
  },
  mutations: {
  },
  actions: {
    signIn(context, payload) {
      axios({
        method: 'post',
        url: '/login',
        data: payload,
      })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        localStorage.setItem('username', response.data.name)
        context.state.username = response.data.name
        router.push('/')
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },

    signUp(context, payload) {
      axios({
        method: 'post',
        url: '/register',
        data: payload,
      })
      .then(response => {
        context.dispatch('signIn', payload)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  modules: {
  },
});
