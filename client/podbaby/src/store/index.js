import Vue from 'vue'
import Vuex from 'vuex'

import episodes from './modules/episodes'
import episode from './modules/episode'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    episodes,
    episode
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
