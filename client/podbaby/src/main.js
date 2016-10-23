import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Cookies from 'cookies-js'
import { camelizeKeys, decamelizeKeys } from 'humps'

import store from './store'

import App from './App'
import Episodes from './components/Episodes'
import Episode from './components/EpisodeDetail'

// HTTP configuration

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8000/api'
Vue.http.options.credentials = true

Vue.http.interceptors.push((request, next) => {
  // post outgoing data keys as underscores
  if (request.body) {
    request.body = decamelizeKeys(request.body)
  }

  // check if user authenticated
  const authToken = window.localStorage.getItem('auth-token')

  if (authToken) {
    request.headers.set('Authorization', 'Token ' + authToken)
  }

  // CSRF protection
  const xsrfToken = Cookies.get('csrftoken')

  if (xsrfToken) {
    request.headers.set('X-CSRFToken', xsrfToken)
  }

  next(response => {
    if (response.body) {
      // render incoming data keys in camel case
      response.body = camelizeKeys(response.body)
    }
  })
})

// Router configuration

Vue.use(VueRouter)

const routes = [
  { name: 'episodes', path: '/', component: Episodes },
  { name: 'episode', path: '/podcasts/:id', component: Episode }
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
  router,
  store
})
