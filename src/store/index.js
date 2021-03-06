import Vue from 'vue'
import Vuex from 'vuex'
import * as Graph from '../graph.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrix: null,
    // matrix: [[null,6,3,0,0,0,0,0],[6,null,0,5,0,0,7,0],[3,0,null,0,4,0,0,0],[0,5,0,null,0,1,0,0],[0,0,4,0,null,0,3,0],[0,0,0,1,0,null,0,5],[0,7,0,0,3,0,null,7],[0,0,0,0,0,5,7,null]],
    
    
    // matrix: [[null,4,3,0,7,0],[4,null,0,4,0,2],[3,0,null,5,8,0],[0,4,5,null,0,3],[7,0,8,0,null,5],[0,2,0,3,5,null]],
    // matrix: [[null,3,3,1,0,0],[3,null,0,0,0,0],[3,0,null,0,0,0],[1,0,0,null,3,3],[0,0,0,3,null,3],[0,0,0,3,3,null]],
    graph: null,
    solution: null,
    cut: [],
    settings: {
      method: 'kernighan_lin_algoritm',
      iterations: 1
    },
    showGraph: false,
    algError: '',
    research: null
  },
  mutations: {
    'SET_MATRIX' (state, payload) {
      state.matrix = payload;
      state.algError = '';
      state.solution = null;
      state.cut = [];
    },
    'SET_GRAPH' (state) {
      state.graph = new Graph(state.matrix);
    },
    'SET_SETTINGS' (state, payload) {
      state.settings = payload;
      state.solution = null
      state.cut = [];
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
        let start = new Date().getTime();
        let solution = graph.greedyPartition();
        let end = new Date().getTime();
        solution.time = end - start;
        state.solution = solution;

      } catch(err) {
        state.algError = "Перевірте матрицю суміжності, вона має містити 1 граф"
      }
    },
    // 'KARGERS_CUT'(state) {
    //   try {
    //     let startTime = new Date().getTime()
    //     let solution = { optimal: { weight: Infinity }, iterations: [], time: 0 };
    //     for (let index = 0; index < state.settings.iterations; index++) {
    //       let graph = new Graph(state.matrix);
    //       solution.iterations.push(graph.kargersMinCut());
    //     }
    //     for (const key in solution.iterations) {
    //       if(solution.iterations[key].weight < solution.optimal.weight) {
    //         solution.optimal = solution.iterations[key];
    //       }
    //     }
    //     let endTime = new Date().getTime();
    //     solution.time = endTime - startTime
    //     state.solution = solution;
    //   } catch (err) {
    //     state.algError = "Перевірте матрицю суміжності, вона має містити 1 граф"
    //   }
    // },
    'KERNIGHAN_LIN'(state) {
      let graph = new Graph(state.matrix);
      try {
        let start = new Date().getTime();
        let solution = graph.kernighanLinPartition();
        let end = new Date().getTime();
        solution.time = end - start;
        state.solution = solution;
      } catch(err) {
        state.algError = "Перевірте матрицю суміжності, вона має містити 1 граф"
      }
    },
    'RESEARCH_GREEDY'(state, {problemSize, iterations}) {
      let solutions = []
      // For problemsizes from min to max
      for (let size = problemSize.min; size < problemSize.max; size++) {
        // Iterations for check
        let averageTime = 0;
        let sucSol = 0
        for (let iteration = 0; iteration < iterations; iteration++) {
          // create empty matrix
          let matrix = new Array(size).fill(0);
          for (const row in matrix) {
            matrix[row] = new Array(size).fill(0);
            for (const col in matrix[row]) {
              matrix[row][col] = col != row ? 0 : null;
            }
          }
          // fill matrix with random data
          for (const row in matrix) {
            for (const col in matrix[row]) {
              if (Number(col) > Number(row) && Number(col) < Number(row) + 4) {
                let data = Math.floor(Math.random() * 10);
                matrix[row][col] = data;
                matrix[col][row] = data;
              } 
            }
          }

          let graph = new Graph(matrix);
          let solution = null;
          try {
            let start = new Date().getTime();
            solution = graph.greedyPartition();
            let end = new Date().getTime();
            if(solution) {
              sucSol++
              averageTime += end - start;
            }
          } catch(err) {
            solution = null
          }
        }
        averageTime = averageTime / sucSol;
        solutions.push({ time: averageTime, size: size });
      }
      state.research = { name: "Greedy Partition", solutions}
    },
    'RESEARCH_KERNIGHAN_LIN'(state, {problemSize, iterations}) {
      let solutions = []
      // For problemsizes from min to max
      for (let size = problemSize.min; size < problemSize.max; size++) {
        // Iterations for check
        let averageTime = 0;
        let sucSol = 0
        for (let iteration = 0; iteration < iterations; iteration++) {
          // create empty matrix
          let matrix = new Array(size).fill(0);
          for (const row in matrix) {
            matrix[row] = new Array(size).fill(0);
            for (const col in matrix[row]) {
              matrix[row][col] = col != row ? 0 : null;
            }
          }
          // fill matrix with random data
          for (const row in matrix) {
            for (const col in matrix[row]) {
              if (Number(col) > Number(row) && Number(col) < Number(row) + 4) {
                let data = Math.floor(Math.random() * 10);
                matrix[row][col] = data;
                matrix[col][row] = data;
              } 
            }
          }

          let graph = new Graph(matrix);
          let solution = null;
          try {
            let start = new Date().getTime();
            solution = graph.kernighanLinPartition();
            let end = new Date().getTime();
            if(solution) {
              sucSol++
              averageTime += end - start;
            }
          } catch(err) {
            solution = null
          }
        }
        console.log(averageTime, sucSol)
        averageTime = averageTime / sucSol;
        solutions.push({ time: averageTime, size: size });
      }
      state.research = { name: "Lin-Kernighan Partition", solutions}
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
        // case 'kargers_algoritm':
        //   commit('KARGERS_CUT')
        //   break;
        case 'kernighan_lin_algoritm': {
          commit('KERNIGHAN_LIN')
          break;
        }
        default:
          break;
      }
    },
    fillTestData({commit}, testArray) {
      for (const row in testArray) {
        for (const col in testArray[row]) {
          if (Number(col) > Number(row)) {
            if(Number(col) < Number(row) + 3) {
              let data = Math.floor(Math.random() * 15);
              testArray[row][col] = data;
              testArray[col][row] = data;
            }
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
    getResearch({commit}, {algoritmName, problemSize, iterations}) {
      switch (algoritmName) {
        case 'greedy_algoritm':
          commit('RESEARCH_GREEDY', {problemSize, iterations})
          break;
        case 'kernighan_lin_algoritm': {
          commit('RESEARCH_KERNIGHAN_LIN', {problemSize, iterations})
          break;
        }
      }
    }
  },
  modules: {
    
  }
})
