import { fetchEpisode } from '../../api/episode'

import * as getterTypes from '../types/getters'
import * as actionTypes from '../types/actions'
import * as mutationTypes from '../types/mutations'

export default {
  state: {
    loading: false,
    episode: null
  },

  actions: {
    [actionTypes.FETCH_EPISODE] ({ commit }, id) {
      commit(mutationTypes.FETCH_EPISODE)
      fetchEpisode(id).then(payload => {
        commit(mutationTypes.FETCH_EPISODE_DONE, payload)
      })
    }
  },

  getters: {
    [getterTypes.EPISODE]: state => state.episode,
    [getterTypes.EPISODE_LOADING]: state => state.loading
  },

  mutations: {
    [mutationTypes.FETCH_EPISODE] (state, payload) {
      state.loading = true
    },
    [mutationTypes.FETCH_EPISODE_DONE] (state, payload) {
      state.loading = false
      state.episode = payload
    }
  }
}
