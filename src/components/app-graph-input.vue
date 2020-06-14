<template>
  <div id="graph-input" class="d-flex justify-content-center">
    <div v-if="matrix" class="panel-card">
      <div class="h2 mb-3 text-center text-white">Матриця суміжності</div>
      <div class="table-wrapper">
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
    </div>
    <form v-else class="px-4 mt-3 panel-card col-6 d-flex flex-column justify-content-center" @submit="createMatrix($event)">
      <div class="text-white mb-2 text-center">
        Згенеруйте матрицю суміжності потрібного розміру, щоб ввести дані вручну
      </div>
      <div class="d-flex">
        <input
          required
          type="number"
          min="3"
          max="100"
          class="form-control size-input"
          v-model="matrixSize"
          placeholder="Введіть Розмір Матриці Суміжності"
        />

        <button class="btn btn-success d-block ml-3">
          Створити
        </button>
      </div>
      <div class="text-center text-white my-3">Або завантажте матрицю з файла</div>
      <div class="d-flex flex-column align-items-center">
        <input
          type="file"
          min="3"
          max="100"
          @input="loadFile($event)"
        />
        <div class="text-danger" v-if="errorFile">
          {{errorFile}}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      matrixSize: null,
      sizeError: '',
      errorFile: ''
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
      createMatrix(e) {
        e.preventDefault();
        this.$nextTick(() => {
          this.matrix = this.initMatrix(Number(this.matrixSize), false);
        })
      },
      loadFile(e) {
        this.errorFile = '';
        let reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = (event) => {
         try {
            this.matrix = JSON.parse(event.target.result);
         } catch (error) {
           if(error) {
             this.errorFile = "Неможливо зчитати матрицю з файлу";
           }
         }
        }
      }
    },
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
    max-height: 400px;
  }
  .size-input {
    background: #fefefe !important;
    color: #000 !important;
    font-weight: 500;
  }
</style>
