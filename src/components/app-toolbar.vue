<template>
	<div class="toolbar">
		<div class="d-flex" v-if="activeView === 'app-graph-input'">
			<button class="toolbar-btn" @click="fillTestData">
				Test Data
			</button>
			<button class="toolbar-btn" @click="addVertex">
				Add Vertex
			</button>
			<button class="toolbar-btn" @click="solve">
				Solve
			</button>

			<div class="d-flex align-items-center ml-5">
				<select
					class="custom-select py-0"
					style="height: 25px"
					required
					v-model="settings.method">
					<option selected value="greedy_algoritm">Greedy Algoritm</option>
					<option value="kargers_algoritm">Kargers Algoritm</option>
				</select>
			</div>
		</div>

		<div class="ml-auto d-flex" v-if="solution">
			<button class="toolbar-btn"
				:class="{'active-view': activeView === 'app-graph-input'}"
				@click="changeView('app-graph-input')">
				DATA
			</button>
			<button class="toolbar-btn"
				:class="{'active-view': activeView === 'app-solution'}"
				@click="changeView('app-solution')">
				SOLUTION
			</button>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({

	}),
	computed: {
		settings: {
			get() {
				return this.$store.state.settings
			},
			set(value) {
				this.$store.dispatch('setSettings', value);
			}
		},
		solution() {
			return this.$store.state.solution;
		},
		activeView() {
			return this.$store.state.activeCmp;
		},
		matrix() {
			return this.$store.state.matrix
		}
	},
	methods: {
		fillTestData() {
			this.$store.dispatch('fillTestData', this.initMatrix(this.matrix.length, false));
		},
		addVertex() {
			this.$store.dispatch('setMatrix', this.initMatrix(1 + this.matrix.length, true));
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
		solve() {
			this.$store.dispatch('getSolution', this.settings);
		},
		changeView(view) {
			this.$store.dispatch('changeView', view);
		}
	}
}
</script>

<style scoped>
.toolbar {
    display: flex;
    width: 100%;
    height: 40px;
    /* background: #404E5C; */
    background: #3f3f44;
  }
  
</style>