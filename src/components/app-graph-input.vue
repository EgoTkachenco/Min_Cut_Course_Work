<template>
  <div id="graph-input" v-if="graph">
    <div class="d-flex justify-content-center"
      v-for="(row, rowIndex) in graph"
      :key="rowIndex">
      <div v-for="(item, index) in row" :key="index">
        <input type="text" :disabled="index == rowIndex" v-model="graph[rowIndex][index]" :key="index" />
      </div>
    </div>

		<div class="d-flex justify-content-center my-3">
			<button class="btn btn-success mx-2" @click="fillTestData">Solve</button>
			<button class="btn btn-primary mx-2" @click="addVertex">Додати Вершину</button>
		</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      graph: null,
		}),
		methods: {
			addVertex() {
				this.graph = this.initArray(1 + this.graph.length, true);
			},
			fillTestData() {
				let testArray  = this.initArray(this.graph.length, false);
				for (const rowIndex in testArray) {
					for (const index in testArray[rowIndex]) {
						if(rowIndex !== index) {
							testArray[rowIndex][index] = Math.floor(Math.random() * 10);
						}
					}
				}

				this.graph = testArray;
			},
			initArray(size, inited) {
				let arr = new Array(size).fill(0);

				for (const row in arr) {
					arr[row] = new Array(size).fill(0);
					for (const col in arr[row]) {
						let data = Infinity;
						if(col != row) {
							if (inited && col < this.graph.length && row < this.graph.length) {
								data = this.graph[row][col];
							} else {
								data = 0;
							}
						}
						arr[row][col] = data;
					}
				}

				return arr;
			}
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
