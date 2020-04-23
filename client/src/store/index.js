import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);
// axios.defaults.baseURL = 'https://blooming-reef-46142.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:3000';


export default new Vuex.Store({
  state: {
    username: '',
    products: [],
    carts: [],
  },
  mutations: {
    setUsername(state, username) {
      state.username = username
    },

    updateQuantity(state, payload) {
      let { id, index, quantity } = payload
      state.carts[index].quantity = quantity
      console.log(state.carts)
      console.log('masuk')
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
        console.log('masuk find all')
        console.log(response)
        state.products = response.data
      })
      .catch(err => {
        if(err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('username')
          router.push('/login')
          //nanti send message
        }else {
          console.log(err.response)
        }
      })
    },

    updateProduct({commit, state}, data) {
      const id = data.id
      const payload = data.payload
      const index = data.index
      // console.log('id di store' + id)
      axios({
        method: 'put',
        url: `/products/${id}`,
        headers: { 'access_token': localStorage.getItem('access_token') },
        data: payload,
      })
      .then(response => {
        console.log('keedit dari strore')
        console.log(response.data)
        Object.assign(state.products[index], response.data)
      })
      .catch(err => {
        console.log(err.response)
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
        console.log(err)
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
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response)
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
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response)
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
        console.log(err.response)
      })
    }

  },
  modules: {
  },
});
