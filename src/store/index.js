import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrix: null
  },
  mutations: {
    'SET_MATRIX' (state, payload) {
      state.matrix = payload
    }
  },
  actions: {
    setMatrix({commit}, matrix) {
      commit('SET_MATRIX', matrix)
    }
  },
  modules: {
  }
})
