<template>
  <div class="row" style="min-height: calc(100vh - 90px);">
    <div
      id="graph-input"
      class="col-12 col-md-6 px-0 d-flex flex-column"
      v-if="matrix"
    >
      <div class="table-wrapper">
        <div class="d-flex align-items-start">
          <input class="label" disabled />
          <input
            v-for="(item, index) in matrix.length"
            :key="index"
            class="label"
            type="text"
            disabled
            :value="`node ${index + 1}`"
          />
        </div>
        <div
          class="d-flex align-items-start"
          v-for="(row, rowIndex) in matrix"
          :key="rowIndex"
        >
          <input
            class="label"
            type="text"
            disabled
            :value="`node ${rowIndex + 1}`"
          />
          <input
            v-for="(item, index) in matrix[rowIndex]"
            :key="rowIndex + ' ' + index"
            type="text"
            :disabled="index == rowIndex"
            :value="index != rowIndex ? matrix[rowIndex][index] : 'M'"
            @input="changeWeight(rowIndex, index, $event.target.value)"
          />
        </div>
      </div>

      <div class="d-flex mt-3 flex-grow-1">
        <div class="toolbar">
          <div class="d-flex align-items-center">
            <select class="custom-select py-0" style="height: 25px" required v-model="settings.method">
              <option selected value="greedy_algoritm">Greedy Algoritm</option>
              <option value="kargers_algoritm">Kargers Algoritm</option>
            </select>
          </div>
          <button class="toolbar-btn ml-auto" @click="fillTestData">
            Test Data
          </button>
          <button class="toolbar-btn" @click="addVertex">
            Додати Вершину
          </button>
          <button class="toolbar-btn" @click="solve"> 
            Solve
          </button>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 px-0" v-else>
      <form class="px-5 mt-5" @submit="createMatrix">
        <input
          required
          type="number"
          min="3"
          max="100"
          class="form-control"
          v-model="matrixSize"
          placeholder="Nodes number"
        />

        <button class="btn btn-outline-success d-block mx-auto my-3">
          Initialize Matrix
        </button>
      </form>
    </div>

    <div class="col-12 col-md-6 px-0">
      <app-visualize :data="matrix"></app-visualize>
    </div>
  </div>
</template>

<script>
  import Visualize from './app-graph-visualization';

  export default {
    data: () => ({
      matrixSize: null,
      sizeError: '',
      settings: {
        method: 'greedy_algoritm'
      }
    }),
    computed: {
      matrix: {
        get() {
          return this.$store.state.matrix;
        },
        set(val) {
          this.$store.dispatch('setMatrix', val);
        },
      },
    },
    components: {
      'app-visualize': Visualize,
    },
    methods: {
      addVertex() {
        this.matrix = this.initMatrix(1 + this.matrix.length, true);
      },
      fillTestData() {
        this.$store.dispatch(
          'fillTestData',
          this.initMatrix(this.matrix.length, false),
        );
      },
      changeWeight(row, col, value) {
        let arr = this.initArray(this.matrix.length, true);
        arr[row][col] = Number(value);
        arr[col][row] = Number(value);
        this.matrix = arr;
      },
      initMatrix(size, inited) {
        let arr = new Array(size).fill(0);
        for (const row in arr) {
          arr[row] = new Array(size).fill(0);
          for (const col in arr[row]) {
            let data = null;
            if (col != row) {
              if (
                inited &&
                col < this.matrix.length &&
                row < this.matrix.length
              ) {
                data = this.matrix[row][col];
              } else {
                data = 0;
              }
            }
            arr[row][col] = data;
          }
        }
        return arr;
      },
      createMatrix() {
        this.matrix = this.initMatrix(Number(this.matrixSize), false);
      },
      solve() {
        this.$store.dispatch('getSolution', this.settings);
      },
    },
  };
</script>

<style scoped>
  #graph-input input,
  #graph-input .label {
    min-width: 90px;
  }
  #graph-input .label {
    text-align: center;
  }
  #graph-input input {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    color: #000f0f;
    font-weight: 500;
  }
  #graph-input input:disabled {
    background: #bed0d5;
  }
  #graph-input input.label:disabled {
    background: #fff;
  }
  #graph-input input:focus {
    outline-style: dashed;
    outline-width: 2px;
    outline-color: #4062bb;
  }
  .table-wrapper {
    width: 100%;
    overflow: auto;
  }
</style>
