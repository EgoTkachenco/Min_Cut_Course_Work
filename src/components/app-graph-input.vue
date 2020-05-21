<template>
  <div id="graph-input" class="row" v-if="matrix">
    <div class="col-12 col-md-6 px-0 d-flex flex-column">
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
          <button class="toolbar-btn" @click="fillTestData">
            Test Data
          </button>
          <button class="toolbar-btn" @click="addVertex">
            Додати Вершину
          </button>
          <button class="toolbar-btn" @click="save">
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-6 px-0">
      <app-visualize :data="matrix"></app-visualize>
    </div>
  </div>
</template>

<script>
  import Visualize from './app-graph-visualization';
  import * as Graph from '../graph.js';
  export default {
    data: () => ({}),
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
        this.matrix = this.initArray(1 + this.matrix.length, true);
      },
      fillTestData() {
        let testArray = this.initArray(this.matrix.length, false);
        for (const row in testArray) {
          for (const col in testArray[row]) {
            if (col > row) {
              let data = Math.floor(Math.random() * 10);
              testArray[row][col] = data;
              testArray[col][row] = data;
            }
          }
        }

        this.matrix = testArray;
      },
      changeWeight(row, col, value) {
        let arr = this.initArray(this.matrix.length, true);
        arr[row][col] = Number(value);
        arr[col][row] = Number(value);
        this.matrix = arr;
      },
      initArray(size, inited) {
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
      save() {
        let graph = new Graph(this.matrix);
        console.log(graph);
        let minNode = graph.getMinConnectiveNode();
        console.log(minNode);
        let maxConnectiveNode = graph.getNodeMaxConnectiveNode(minNode.node);
        console.log(maxConnectiveNode);
        graph.mergeNodes(minNode.node, maxConnectiveNode.node);
        console.log(graph);
        // this.graph = graph.matrix
      },
    },
    created() {
      this.matrix = this.initArray(4, false);
    },
  };
</script>

<style scoped>
  #graph-input {
    min-height: calc(100vh - 90px);
  }
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
