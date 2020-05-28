<template>
  <div class="row mt-3 justify-content-around">
    <div class="col-12 col-md-6">
      <div class="text-white panel-card ">
        <div class="text-center h3 mt-2 mb-0">Розв'язок</div>
        <div class="px-3">Рішення було знайдено за: {{ solution.time }} мс</div>
        <hr class="bg-white my-2" />

        <div class="h4 mt-3 text-center">Оптимальне рішення</div>
        <div class="px-3">Вершини Розріз: {{ solution.optimal.nodes.toString() }}</div>
        <div class="px-3">Вага Розрізу: {{ solution.optimal.weight }}</div>
 
        <hr class="bg-white my-2" />
      </div>
    </div>

    <div class=" col-12 col-md-6">
      <div class="panel-card">
        <div
          class="toolbar-btn"
          v-for="(iteration, index) in solution.iterations"
          @click="setActiveIteration(index)"
          :class="{ optimal: iteration === solution.optimal, active: index === activeIteration }"
          :key="index">
          <div class="text-center px-3">Ітерація {{ index + 1 }}</div>
          <div class="px-3">
            Вершини розрізу: {{ iteration.nodes }}
          </div>
          <div class="px-3">
            Вага розрізу: {{ iteration.weight }}
          </div>
        </div>
      </div>
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
