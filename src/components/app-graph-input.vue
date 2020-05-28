<template>
  <div id="graph-input" class="d-flex justify-content-center">
    <div v-if="matrix && !isLoading" class="table-wrapper panel-card">
      <div class="h2 mb-3 text-center text-white">Матриця суміжності</div>
      <div class="d-flex align-items-start">
        <input class="label" disabled />
        <input
          v-for="(item, index) in matrix.length"
          :key="index"
          class="label"
          type="text"
          disabled
          :value="`Вершина ${index + 1}`"
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
          :value="`Вершина ${rowIndex + 1}`"
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
    <form v-else class="px-4 mt-3 panel-card col-6" @submit="createMatrix">
      <div class="text-white mb-2">
        Програма призначенна для пошуку такого дихотомічного розбиття вершин графа, при якому досягає максимуму мінімальна вага ребр розрізу, 
        що з'єднують вершини з різних підграфів
        <br>
        <br>
        Для рішення задачі на вибір маємо 2 алгорити:
          <ul>
            <li>Жадібний алгоритм</li>
            <li>Алгоритм Каргера(рандомізований)</li>
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
          Створити
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
      isLoading: false,
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
    created() {
      console.time()      
    },
    mounted() {
      console.timeEnd()
    }
  };
</script>

<style scoped>
  #graph-input input,
  #graph-input .label {
    min-width: 110px;
  }
  #graph-input input {
    border-radius: 0;
    border: 0;
    color: #fff;
    font-weight: 500;
    background: none;
    text-align: center;
  }
  #graph-input input:disabled {
    background: rgb(63, 63, 68, 0.6);
  }
  #graph-input input.label:disabled {
    background: none;
  }
  #graph-input input:not(.form-control):focus {
    outline-style: dashed;
    outline-width: 2px;
    outline-color: #4062bb;
  }
  .table-wrapper {
    max-width: 100%;
    overflow: auto;
    transition: all 300ms;
  }
</style>
