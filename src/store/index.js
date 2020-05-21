import Vue from 'vue'
import Vuex from 'vuex'
import * as Graph from '../graph.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrix: null,
    method: 'greedy_algoritm',
    graph: null,
    solution: null
  },
  mutations: {
    'SET_MATRIX' (state, payload) {
      state.matrix = payload
    },
    'SET_GRAPH' (state) {
      state.graph = new Graph(state.matrix);
    }
  },
  actions: {
    setMatrix({commit}, matrix) {
      commit('SET_MATRIX', matrix)
    },
    getSolution({commit}, settings) {
      console.log(settings)
      commit('SET_GRAPH')
    },
    fillTestData({commit}, testArray) {
      for (const row in testArray) {
        for (const col in testArray[row]) {
          if (col > row) {
            let data = Math.floor(Math.random() * 10);
            testArray[row][col] = data;
            testArray[col][row] = data;
          }
        }
      }
      commit('SET_MATRIX', testArray)
    },
  },
  modules: {
    
  }
})
