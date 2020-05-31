<template>
  <div class="dialog-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <div class="panel-card">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  export default {
    methods: {
      close() {
        this.$emit('close');
      },
    },
    mounted() {
      // this.research_1 = this.$store.dispatch('getResearch_1');
      let ctx = document.getElementById('myChart');
      new Chart(ctx, {
				type: 'line',
				data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'red',
            borderColor: 'green',
            data: [2, 4, 2, 5, 6, 7, 8],
            fill: false,
          },
        ],
				},
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
          tooltips: {
            mode: 'label',
          },
          hover: {
            mode: 'nearest',
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Month',
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Value',
                },
              },
            ],
          },
        },
      });
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
</style>
