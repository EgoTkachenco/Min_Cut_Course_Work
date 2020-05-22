<template>
  <div id="network"></div>
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
          nodes.push({ 
            id: String(Number(key) + 1), 
            label: String(Number(key) + 1), 
            shape: 'circle',
            widthConstraint: {
              minimum: 35
            },
            font: {
              color: '#fff',
              size: 20
            }
          });
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
                length: 250,
                physics: true,
              });
            }
          }
        }
        // create a network
        var container = document.getElementById('network');
        var data = {
          nodes: nodes,
          edges: edges,
        };
        var options = { 
          height: '100%',
          width: '100%',
          autoResize: true,
          groups: {
            myGroup: {color:{background:'#EBEBEB'}, borderWidth: 1}
          },
          physics: {
            enabled: true,
            hierarchicalRepulsion: {
              centralGravity: 0.5,
              springLength: 500,
              springConstant: 0.0,
              nodeDistance: 200,
              damping: 1,
            },
            solver: 'hierarchicalRepulsion',
          },
        };
        new vis.Network(container, data, options);
      },
    },
    mounted() {
      if(this.data) {
        this.updateGraph();
      }
    },
  };
</script>

<style scoped>
  #network {
    width: 100%;
    height: 100%;
    background: #EBEBEB;
    border-left: 2px solid #3f3f44;
  }
</style>
