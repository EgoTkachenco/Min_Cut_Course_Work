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

    graph: null,
    solution: null,
    settings: {
      method: 'greedy_algoritm',
    },
    networkSeed: null, 
    activeCmp: 'app-graph-input',
  },
  mutations: {
    'SET_MATRIX' (state, payload) {
      state.matrix = payload;
    },
    'SET_GRAPH' (state) {
      state.graph = new Graph(state.matrix);
    },
    'SET_SETTINGS' (state, payload) {
      state.settings = payload;
    },
    'SET_ACTIVE_VIEW' (state, payload) {
      state.activeCmp = payload;
    },
    'SET_NETWORK_SEED' (state, payload) {
      state.networkSeed = payload;
    },
    'GREEDY_CUT' (state) {
      state.solution = state.graph.greedyMinCut();
    },
    'KARGERS_CUT'(state) {
      let solution = { optimal: { weight: Infinity }, iterations: [] };
      for (let index = 0; index < 4; index++) {
        let graph = new Graph(state.matrix);
        solution.iterations.push(graph.kargersMinCut());
      }
      for (const key in solution.iterations) {
        if(solution.iterations[key].weight < solution.optimal.weight) {
          solution.optimal = solution.iterations[key];
        }
      }
      state.solution = solution;
    }
  },
  actions: {
    setMatrix({commit}, matrix) {
      commit('SET_MATRIX', matrix)
    },
    getSolution({state, commit}) {
      commit('SET_GRAPH')
      switch (state.settings.method) {
        case 'greedy_algoritm':
          commit('GREEDY_CUT')
          break;
        case 'kargers_algoritm':
          commit('KARGERS_CUT')
          break;
        default:
          break;
      }
    },
    fillTestData({commit}, testArray) {
      for (const row in testArray) {
        for (const col in testArray[row]) {
          if (Number(col) > Number(row) && Number(col) < Number(row) + 3) {
            let data = Math.floor(Math.random() * 10);
            testArray[row][col] = data;
            testArray[col][row] = data;
          }
        }
      }
      commit('SET_MATRIX', testArray)
    },
    setSettings({commit}, settings) {
      commit('SET_SETTINGS', settings);
    },
    setNetworkSeed({commit}, seed) {
      commit('SET_NETWORK_SEED', seed);
    },
    changeView({commit}, view) {
      commit('SET_ACTIVE_VIEW', view);
    }
  },
  modules: {
    
  }
})
