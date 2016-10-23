import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import * as getterTypes from 'src/store/types/getters'
import * as actionTypes from 'src/store/types/actions'

import Episodes from 'src/components/Episodes'

describe('Episodes.vue', () => {
  const episodes = [
    {
      id: 1,
      title: 'test',
      channel: {
        id: 1,
        name: 'test',
        categories: []
      }
    }
  ]

  const mockStore = {
    state: {},
    mutations: {},
    getters: {
      [getterTypes.EPISODES]: () => episodes,
      [getterTypes.EPISODES_NEXT_PAGE]: () => 0,
      [getterTypes.EPISODES_PREVIOUS_PAGE]: () => 2,
      [getterTypes.EPISODES_LOADING]: () => false
    },
    actions: {
      [actionTypes.FETCH_EPISODES]: () => {
        console.log('fetching episodes...')
      }
    }
  }

  it('should render component', () => {

    Vue.use(VueRouter)

    const routes = [
      { name: 'episodes', path: '/', component: Episodes },
    ]

    const router = new VueRouter({
      mode: 'abstract',
      routes
    })

    console.log("HISTORY", router.history)

    const vm = new Vue({
      el: document.createElement('div'),
      render (h) {
        router.push('/?page=5')
        return h(Episodes)
      },
      router,
      store: new Vuex.Store(mockStore)
    })
    expect(vm.$el.querySelector('.page-header h1').textContent)
      .to.equal('Podcasts')
  })
})
