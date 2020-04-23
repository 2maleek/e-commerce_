import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);
axios.defaults.baseURL = 'https://blooming-reef-46142.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:3000';


export default new Vuex.Store({
  state: {
    username: '',
    products: [],
    carts: [],
    statusAlert: false,
    message: '',
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },

    updateQuantity(state, payload) {
      let { id, index, quantity } = payload
      state.carts[index].quantity = quantity
    }
  },
  actions: {
    findAllProduct({commit, state}) {
      axios({
        method: 'get',
        url: '/products',
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        state.products = response.data
      })
      .catch(err => {
        if(err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('username')
          router.push('/login')
          //nanti send message
          state.message = err.response.data.message
          state.statusAlert = true
        }else {
          state.message = err.response.data.message
          state.statusAlert = true
        }
      })
    },

    updateProduct({commit, state}, data) {
      const id = data.id
      const payload = data.payload
      const index = data.index
      axios({
        method: 'put',
        url: `/products/${id}`,
        headers: { 'access_token': localStorage.getItem('access_token') },
        data: payload,
      })
      .then(response => {
        Object.assign(state.products[index], response.data)
      })
      .catch(err => {
        state.message = err.response.data.message
        state.statusAlert = true
      })
    },

    addToCart(context, ProductId) {
      axios({
        method: 'post',
        url: '/carts',
        data: { ProductId },
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        context.state.message = err.response.data.message
        context.state.statusAlert = true
      })
    },

    findAllCart({state}) {
      axios({
        method: 'get',
        url: '/carts',
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        state.carts = response.data
      })
      .catch(err => {
        state.message = err.response.data.message
        state.statusAlert = true
      })
    },

    deleteCart(context, id) {
      axios({
        method: 'delete',
        url: `/carts/${id}`,
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        context.dispatch('findAllCart')
      })
      .catch(err => {
        context.state.message = err.response.data.message
        context.state.statusAlert = true
      })
    },

    updateProductQuantity(context, payload) {
      const { ProductId, quantity } = payload
      axios({
        method: 'put',
        url: `/products/${ProductId}`,
        data: { quantity },
        headers: {'access_token': localStorage.getItem('access_token')}
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        context.state.message = err.response.data.message
        context.state.statusAlert = true
      })
    }

  },
  modules: {
  },
});
