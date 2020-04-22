import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Cart from '@/views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        next({ name: 'Home' })
      }
      else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        next({ name: 'Home' })
      }
      else next()
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.commit('setUsername', localStorage.getItem('username'))
        store.dispatch('findAllProduct')
        next()
      }
      else next({ name: 'Login' })
    }
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('access_token')){
        store.commit('setUsername', localStorage.getItem('username'))
        store.dispatch('findAllProduct')
        next()
      }
      else next({ name: 'Login' })
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
