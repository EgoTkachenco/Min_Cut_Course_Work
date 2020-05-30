import Vue from 'vue'
import Vuex from 'vuex'
import * as Graph from '../graph.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrix: null,
    graph: null,
    solution: null,
    cut: [],
    settings: {
      method: 'greedy_algoritm',
      iterations: 1
    },
    showGraph: false,
    algError: ''
  },
  mutations: {
    'SET_MATRIX' (state, payload) {
      state.matrix = payload;
      state.algError = ''
      state.solution = null
    },
    'SET_GRAPH' (state) {
      state.graph = new Graph(state.matrix);
    },
    'SET_SETTINGS' (state, payload) {
      state.settings = payload;
      state.solution = null
    },
    'SET_CUT' (state, payload) {
      state.cut = payload;
    },
    'TOGGLE_GRAPH' (state) {
      state.showGraph = !state.showGraph;
    },
    'GREEDY_CUT' (state) {
      let graph = new Graph(state.matrix);
      try {
        state.solution = graph.greedyMinCut();
      } catch(err) {
        state.algError = "Перевірте матрицю суміжності, вона має містити 1 граф"
      }
    },
    'KARGERS_CUT'(state) {
      try {
        let startTime = new Date().getTime()
        let solution = { optimal: { weight: Infinity }, iterations: [], time: 0 };
        for (let index = 0; index < state.settings.iterations; index++) {
          let graph = new Graph(state.matrix);
          solution.iterations.push(graph.kargersMinCut());
        }
        for (const key in solution.iterations) {
          if(solution.iterations[key].weight < solution.optimal.weight) {
            solution.optimal = solution.iterations[key];
          }
        }
        let endTime = new Date().getTime();
        solution.time = endTime - startTime
        state.solution = solution;
      } catch (err) {
        state.algError = "Перевірте матрицю суміжності, вона має містити 1 граф"
      }
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
          if (Number(col) > Number(row) && Number(col) < Number(row) + 4) {
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
    setIteration({commit}, {iteration, cut}) {
      console.log(iteration)
      commit('SET_CUT', cut);
    },
  },
  modules: {
    
  }
})
