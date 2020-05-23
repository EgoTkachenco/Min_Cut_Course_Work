<template>
  <div>
    <div class="text-white">
      <div class="text-center h4 mt-2 mb-0">Solution</div>
      <div class="px-3">Time: {{ solution.time }}</div>
      <div class="px-3 text-center">Optimal Solution</div>
      <div class="px-3">Optimal Cut: {{ solution.optimal.nodes.toString() }}</div>
      <div class="px-3">Optimal Cut weight: {{ solution.optimal.weight }}</div>
      <hr class="bg-white my-2" />
			<div class="px-3 text-center">
        Iteration {{activeIteration + 1}}
      </div>
      <div class="px-3">
        Cut Nodes: {{ solution.iterations[activeIteration].nodes }}
      </div>
      <div class="d-flex px-3">
        <div>Cut weight: {{ solution.iterations[activeIteration].weight }}</div>
        <div
          class="text-success ml-auto"
          v-if="solution.optimal === solution.iterations[activeIteration]"
        >
          Optimal Solution
        </div>
      </div>
      <hr class="bg-white my-2" />
    </div>

    <div
      class="toolbar-btn text-center"
      v-for="(iteration, index) in solution.iterations"
      :class="{
        active: index === activeIteration,
        optimal: iteration === solution.optimal,
      }"
      @click="setActiveIteration(index)"
      :key="index"
    >
      Iteration {{ index + 1 }}
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      activeIteration: 0,
    }),
    computed: {
      solution() {
        return this.$store.state.solution;
      },
    },
    watch: {
      solution(val) {
        if (val) {
          let optimalIndex = this.solution.iterations.indexOf(
            this.solution.optimal,
          );
          this.setActiveIteration(optimalIndex);
        }
      },
    },
    methods: {
      setActiveIteration(iteration) {
        this.activeIteration = iteration;
        let cut = this.solution.iterations[iteration].nodes
          .toString()
          .split(' ');
        this.$store.dispatch('setIteration', { iteration, cut });
      },
    },
  };
</script>

<style scoped></style>
