<template>
	<div v-if="solution" class="row" style="min-height: calc(100vh - 150px);">
		<div class="col-12 col-md-3 px-0">
			<div>
				<div>Nodes: {{solution.iterations[activeIteration].nodes}}</div>
				<div>Cut weight: {{solution.iterations[activeIteration].weight}}</div>
				<div v-if="solution.optimal === solution.iterations[activeIteration]">Optimal Solution</div>
				
			</div>
			<div class="toolbar-btn text-center" 
				v-for="(iteration, index) in solution.iterations"
				:class="{'active': index === activeIteration, 'optimal': iteration === solution.optimal}"
				@click="setActiveIteration(index)" 
				:key="index">Iteration {{index + 1}}</div>
		</div>
		<div class="col-12 col-md-9 px-0" v-if="activeCut">
			<app-visualize :data="matrix" :cut="activeCut"></app-visualize>
		</div>
	</div>
</template>

<script>
import Visualize from './app-graph-visualization';
export default {
	data: () => ({
		activeIteration: 0,
		activeCut: null
	}),
	computed: {
		solution() {
			return this.$store.state.solution;
		},
		matrix() {
			return this.$store.state.matrix;
		}
	},
	components: {
		'app-visualize': Visualize,
	},
	methods: {
		setActiveIteration(iteration) {
			this.activeIteration = iteration;
			this.activeCut = this.solution.iterations[iteration].nodes.toString().split(' ');
		},
	},
	mounted() {
		debugger
		this.setActiveIteration(0)
	}
}
</script>

<style scoped>
	
	
</style>