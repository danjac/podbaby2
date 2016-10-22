import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import App from './App'
import Episodes from './components/Episodes'
import { camelizeKeys, decamelizeKeys } from 'humps'

// HTTP configuration

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api'
Vue.http.options.credentials = true

// camel case/underscore normalization
Vue.http.interceptors.push((request, next) => {
  if (request.body) {
    request.body = decamelizeKeys(request.body)
  }
  next(response => {
    if (response.body) {
      response.body = camelizeKeys(response.body)
    }
  })
})

// Router configuration

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Episodes }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
