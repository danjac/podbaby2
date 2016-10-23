import module from 'src/store/modules/episodes'

import * as actionTypes from 'src/store/types/actions'
import * as mutationTypes from 'src/store/types/mutations'

const testAction = (action, payload, state, expectedMutations, done) => {
  let count = 0

  // mock commit
  const commit = (type, payload) => {
    const mutation = expectedMutations[count]
    expect(mutation.type).to.equal(type)
    if (payload) {
      expect(mutation.payload).to.deep.equal(payload)
    }
    count++
    if (count >= expectedMutations.length) {
      done()
    }
  }
  // call the action with mocked store and arguments
  action({ commit, state }, payload)

  // check if no mutations should have been dispatched
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0)
    done()
  }
}

describe('mutations', () => {
  it('should set loading to true', () => {
    const state = { loading: false }
    module.mutations[mutationTypes.FETCH_EPISODES](state)
    expect(state.loading).to.equal(true)
  })
})

describe('actions', () => {
  const injector = require('inject!src/store/modules/episodes')

  const response = {
    count: 1,
    previous: null,
    next: '/api/episodes/?page=2',
    results: [
      {
        id: 100,
        title: 'test episode',
        channel: {
          id: 100,
          title: 'test channel'
        }

      }
    ]
  }

  const mock = injector({
    '../../api/episodes': {
      fetchEpisodes () {
        return new Promise(resolve => {
          resolve(response)
        })
      }
    }
  }).default

  it('should fetch episodes', done => {
    testAction(mock.actions[actionTypes.FETCH_EPISODES], 1, {}, [
      { type: mutationTypes.FETCH_EPISODES },
      { type: mutationTypes.FETCH_EPISODES_DONE, payload: response }
    ], done)
  })
})
