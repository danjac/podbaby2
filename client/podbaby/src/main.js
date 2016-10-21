import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import { camelizeKeys, decamelizeKeys } from 'humps'

Vue.use(VueResource)

// HTTP configuration
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
