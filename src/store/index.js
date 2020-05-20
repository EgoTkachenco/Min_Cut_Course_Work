import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    graph: null
  },
  mutations: {
    'SET_GRAPH' (state, payload) {
      state.graph = payload
    }
  },
  actions: {
    setGraph({commit}, graph) {
      commit('SET_GRAPH', graph)
    }
  },
  modules: {
  }
})
