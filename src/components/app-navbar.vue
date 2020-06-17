<template>
	<nav>
		<div class="h4 mb-0">
			Min-Cut Problem
		</div>
		<div class="d-flex" v-if="matrix">
			<button class="toolbar-btn" @click="fillTestData">
				Рандом
			</button>
			<button class="toolbar-btn" @click="addVertex">
				Додати вершину
			</button>
			

			<div class="d-flex align-items-center ml-2">
				<select
					class="custom-select py-0"
					style="height: 25px"
					required
					v-model="settings.method">
					<option selected value="greedy_algoritm">Жадібний Алгоритм</option>
					<!-- <option value="kargers_algoritm">Алгоритм Каргера</option> -->
					<option value="kernighan_lin_algoritm">Алгоритм Ліна-Кернігана</option>
					
				</select>
			</div>
			<div class="d-flex align-items-center ml-2" v-if="settings.method === 'kargers_algoritm'">
				<label class="mb-0" for="number_of_iterations">Кількість ітерацій :</label>
				<input
					class="form-control py-0 ml-2"
					style="height: 25px; width: 70px"
					type="number"
					name="number_of_iterations"
					required
					v-model="settings.iterations">
			</div>
		</div>
		<button v-if="matrix" class="toolbar-btn ml-auto" @click="solve">
			Знайти рішення
		</button>
		<button v-if="matrix" class="toolbar-btn" :class="{'active': showGraph}" @click="show">
			{{ showGraph ? 'Сховати' : 'Показати'}} Граф
		</button>
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
		},
		showGraph() {
			return this.$store.state.showGraph;
		}
	},
	methods: {
		show() {
			this.$store.commit('TOGGLE_GRAPH');
		},
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
		flex-wrap: wrap;
		align-items: center;
		padding: 0 25px;
		background: rgb(63, 63, 68, 0.6);
		color: #fff;
    /* border-bottom: 1px solid #efefef; */
		height: 60px;
	}

  
</style>