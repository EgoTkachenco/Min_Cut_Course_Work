<template>
  <div class="dialog-wrapper">
    <div class="container-fluid">
      <div class="row pt-5">
        <div class="col-4">
          <form @submit.prevent="getResearch" class="p-3" style="background: rgb(63, 63, 68, 0.6);">
              <div class="d-flex align-items-center my-2">
                <label for="name">Алгоритм:</label>
                <select
                  name="name"
                  class="custom-select py-0"
                  style="height: 25px"
                  required
                  v-model="algoritmName">
                  <option value="greedy_algoritm">Жадібний Алгоритм</option>
                  <option value="kernighan_lin_algoritm">Алгоритм Ліна-Кернігана</option>
                </select>
              </div>
              <div class="d-flex align-items-center my-2">
                <label for="iter">Кількість повторень: </label>
                <input type="number" 
                  min="1" 
                  max="100" 
                  name="iter"
                  required
                  v-model="iterations"> 
              </div>
              <div class="d-flex align-items-center my-2">
                <label>Розмір задачі</label>
                <label for="min" class="ml-auto">Від: </label>
                <input type="number" 
                  min="4" 
                  :max="Number(problemSize.max) - 10"
                  v-model="problemSize.min">
                <label for="max">До: </label>
                <input
                  type="number" 
                  :min="Number(problemSize.min) + 10" 
                  max="100"
                  v-model="problemSize.max">
              </div>
              <button class="btn btn-primary d-block ml-auto" type="submit">Дослідити</button>
          </form>
        </div>
        <div class="col-8">
          <canvas id="myChart" width="820" style="background: white;" height="450"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Chart from 'chart.js';
  export default {
    data: () => ({
      algoritmName: '',
      problemSize: {min: 5, max: 15},
      iterations: 10,
      chart: null
    }),
    computed: {
      research: {
        get() {
          return this.$store.state.research;
        }
      }
    },
    watch: {
      research(val) {
        if(val) {
          if(this.chart) {
            this.chart.removeData();
            this.chart.update();
          }
          this.initChart();
        }
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getResearch() {
        this.$store.dispatch('getResearch', {
          algoritmName: this.algoritmName, 
          problemSize: this.problemSize, 
          iterations: this.iterations
        })
      },
      initChart() {
        let labels = this.research.solutions.map(item => {  
          return item.size 
        } )
        let timeData = this.research.solutions.map(item => { 
          return item.time 
          } )
          // rgba(220, 53, 69, 1)
          // [0.35,0.28,0.49,0.35,0.47,0.61,0.81,0.95,1.28,1.46,1.7,2.44,3.38,1.86,2.74]
        let data = {
          labels: labels,
          datasets: [
            {
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: timeData
            },
            // {
            //   fillColor: "rgba(220, 53, 69, 0.2)",
            //   strokeColor: "rgba(220, 53, 69, 1)",
            //   pointColor: "rgba(220, 53, 69, 1)",
            //   pointStrokeColor: "#fff",
            //   pointHighlightFill: "#fff",
            //   pointHighlightStroke: "rgba(220, 53, 69, 1)",
            //   data: [0.35,0.28,0.49,0.35,0.47,0.61,0.81,0.95,1.28,1.46,1.7,2.44,3.38,1.86,2.74]
            // }
          ]}
        let ctx = document.getElementById("myChart").getContext("2d");
        let options = { };
        debugger
        this.chart = new window.Chart(ctx).Line(data, options);  
      }
    },
  };
</script>

<style scoped>
  .dialog-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: #fff;
    background: rgb(88, 86, 107);
  }
  label {
    color: white;
    margin: 0 10px;
  }
</style>
