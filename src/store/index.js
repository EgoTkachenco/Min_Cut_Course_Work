import Vue from 'vue'
import Vuex from 'vuex'
import * as Graph from '../graph.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrix: [
      [null,2,0,0,3,0,0,0],
      [2,null,3,0,2,2,0,0],
      [0,3,null,4,0,0,2,0],
      [0,0,4,null,0,0,2,2],
      [3,2,0,0,null,3,0,0],
      [0,2,0,0,3,null,1,0],
      [0,0,2,2,0,1,null,3],
      [0,0,0,2,0,0,3,null]
    ],
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
    },
    'GREEDY_CUT' (state) {
      state.solution = state.graph.greedyMinCut();
    }
  },
  actions: {
    setMatrix({commit}, matrix) {
      commit('SET_MATRIX', matrix)
    },
    getSolution({commit}, settings) {
      commit('SET_GRAPH')
      switch (settings.method) {
        case 'greedy_algoritm':
          commit('GREEDY_CUT')
          break;

        default:
          break;
      }
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
