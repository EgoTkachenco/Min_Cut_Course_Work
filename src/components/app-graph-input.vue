<template>
  <div id="graph-input" class="row" v-if="graph">
    <div class="col-12 col-md-6">
      <div
        class="d-flex justify-content-center"
        v-for="(row, rowIndex) in graph"
        :key="rowIndex">
        <div
          v-for="(item, index) in graph[rowIndex]"
          :key="rowIndex + ' ' + index">
          <input
            type="text"
            :disabled="index == rowIndex"
            :value="graph[rowIndex][index]"
            @input="changeWeight(rowIndex, index, $event.target.value)"
            :key="index"/>
        </div>
      </div>

      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-success mx-2" @click="fillTestData">
          Test Data
        </button>
        <button class="btn btn-primary mx-2" @click="addVertex">
          Додати Вершину
        </button>
      </div>
    </div>

    <div class="col-12 col-md-6">
      <app-visualize :data="graph"></app-visualize>
    </div>
  </div>
</template>

<script>
  import Visualize from './app-graph-visualization';

  export default {
    data: () => ({}),
    computed: {
      graph: {
        get() {
          return this.$store.state.graph;
        },
        set(val) {
          this.$store.dispatch('setGraph', val);
        },
      },
    },
    components: {
      'app-visualize': Visualize,
    },
    methods: {
      addVertex() {
        this.graph = this.initArray(1 + this.graph.length, true);
      },
      fillTestData() {
        let testArray = this.initArray(this.graph.length, false);
        for (const row in testArray) {
          for (const col in testArray[row]) {
            if (col > row) {
              let data = Math.floor(Math.random() * 10);
              testArray[row][col] = data;
              testArray[col][row] = data;
            }
          }
        }

        this.graph = testArray;
      },
      changeWeight(row, col, value) {
        let arr = this.initArray(this.graph.length, true);
        arr[row][col] = value;
        arr[col][row] = value;
        this.graph = arr;
      },
      initArray(size, inited) {
        let arr = new Array(size).fill(0);

        for (const row in arr) {
          arr[row] = new Array(size).fill(0);
          for (const col in arr[row]) {
            let data = Infinity;
            if (col != row) {
              if (
                inited &&
                col < this.graph.length &&
                row < this.graph.length
              ) {
                data = this.graph[row][col];
              } else {
                data = 0;
              }
            }
            arr[row][col] = data;
          }
        }

        return arr;
      },
    },
    created() {
      this.graph = this.initArray(4, false);
    },
  };
</script>

<style scoped>
  #graph-input {
  }
  #graph-input input {
    width: 100%;
    min-width: 30px;
    max-width: 100px;
  }
</style>
