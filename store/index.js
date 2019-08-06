import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      counter: 0
    }),
    mutations: {
      increment(state) {
        state.counter++
      }
    },
    actions: {
      incremant(vuexContext) {
        vuexContext.commit('increment')
      }
    },
    getters: {}
  })
}

export default createStore
