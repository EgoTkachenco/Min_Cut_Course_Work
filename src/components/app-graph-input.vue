<template>
  <div id="graph-input" class="d-flex flex-column">
    <div v-if="matrix" class="table-wrapper">
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
          type="number"
          :disabled="index == rowIndex"
          :value="index != rowIndex ? matrix[rowIndex][index] : 'M'"
          @input="changeWeight(rowIndex, index, $event.target.value)"
        />
      </div>
    </div>
    <form v-else class="px-5 mt-3" @submit="createMatrix">
      <div class="text-white mb-2">
        For finding minimum cut - enter matrix size and fill data
        <br>
        Choose algoritm:
          <ul>
            <li>Greedy Algoritm</li>
            <li>Karger's (randomized) Algoritm</li>
          </ul>
        * Karger's algoritm find solution with propability p = 1 / n <sup>2</sup> 
        for increasing this value you can choose number of iterations for algoritm

      </div>
      <div class="d-flex">
        <input
          required
          type="number"
          min="3"
          max="100"
          class="form-control"
          v-model="matrixSize"
          placeholder="Enter matrix size"
        />

        <button class="btn btn-success d-block ml-3">
          Initialize
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      matrixSize: null,
      sizeError: '',
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
    methods: {
      changeWeight(row, col, value) {
        let arr = this.initMatrix(this.matrix.length, true);
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
    },
  };
</script>

<style scoped>
  #graph-input input,
  #graph-input .label {
    min-width: 70px;
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
  #graph-input input:not(.form-control):focus {
    outline-style: dashed;
    outline-width: 2px;
    outline-color: #4062bb;
  }
  .table-wrapper {
    width: 100%;
    overflow: auto;
    transition: all 300ms;
  }
</style>
