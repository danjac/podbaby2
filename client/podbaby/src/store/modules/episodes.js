import Vue from 'vue'

import * as getterTypes from '../types/getters'
import * as actionTypes from '../types/actions'
import * as mutationTypes from '../types/mutations'

import { pageNumberFromUrl } from '../utils'

export default {
  state: {
    loading: false,
    previous: null,
    next: null,
    results: [],
    count: 0
  },

  actions: {
    [actionTypes.FETCH_EPISODES] ({ commit }, page = 1) {
      const url = 'episodes/?page=' + page
      commit(mutationTypes.FETCH_EPISODES)
      Vue.http.get(url).then(response => {
        commit(mutationTypes.FETCH_EPISODES_DONE, response.body)
      })
    }
  },

  getters: {
    [getterTypes.EPISODES]: state => state.results,
    [getterTypes.EPISODES_LOADING]: state => state.loading,
    [getterTypes.EPISODES_NEXT_PAGE]: state => pageNumberFromUrl(state.next),
    [getterTypes.EPISODES_PREVIOUS_PAGE]: state => pageNumberFromUrl(state.previous)
  },

  mutations: {
    [mutationTypes.FETCH_EPISODES] (state, payload) {
      state.loading = true
    },
    [mutationTypes.FETCH_EPISODES_DONE] (state, payload) {
      Object.assign(state, payload)
      state.loading = false
    }
  }
}
