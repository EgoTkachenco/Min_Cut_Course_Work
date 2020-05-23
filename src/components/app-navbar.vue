<template>
	<nav>
		<div class="h4 mb-0 w-25">
			Min-Cut Problem
		</div>
		<div class="d-flex w-75" v-if="matrix">
			<button class="toolbar-btn" @click="fillTestData">
				Test Data
			</button>
			<button class="toolbar-btn" @click="addVertex">
				Add Vertex
			</button>
			

			<div class="d-flex align-items-center ml-2">
				<select
					class="custom-select py-0"
					style="height: 25px"
					required
					v-model="settings.method">
					<option selected value="greedy_algoritm">Greedy Algoritm</option>
					<option value="kargers_algoritm">Kargers Algoritm</option>
				</select>
			</div>
			<div class="d-flex align-items-center ml-2" v-if="settings.method === 'kargers_algoritm'">
				<input
					class="form-control py-0"
					style="height: 25px"
					type="number"
					required
					v-model="settings.iterations">
			</div>

			<button class="toolbar-btn ml-auto" @click="solve">
				Solve
			</button>
		</div>
	</nav>
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
	}
}
</script>

<style scoped>
	nav {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 25px;
		background: #3f3f44;
		color: #fff;
		height: 60px;
	}

  
</style>