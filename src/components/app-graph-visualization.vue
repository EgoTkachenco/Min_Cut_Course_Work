<template>
  <div>
    <div id="mynetwork"></div>
  </div>
</template>

<script>
  import vis from 'vis';
  export default {
    props: ['data'],
    watch: {
      data(val) {
        if (val) {
          this.updateGraph();
        }
      },
    },
    methods: {
      updateGraph() {
        let nodes = [];
        for (const key in this.data) {
          nodes.push({ id: String(Number(key) + 1), label: String(Number(key) + 1) });
        }

        let edges = [];

        for (const row in this.data) {
          for (const col in this.data[row]) {
            if (col > row && Number(this.data[row][col]) !== 0) {
              edges.push({
                from: String(Number(row) + 1),
                to: String(Number(col) + 1),
                label: String(this.data[row][col]),
                font: { align: 'middle' },
              });
            }
          }
        }
        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
          nodes: nodes,
          edges: edges,
        };
        var options = { physics: false };
        new vis.Network(container, data, options);
      },
    },
  };
</script>

<style scoped>
  #mynetwork {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }
</style>
