<template>
  <div v-if="matrix" id="network"></div>
</template>

<script>
  import vis from 'vis';
  export default {
    data: () => ({
      network: null
    }),
    computed: {
      matrix() {
        return this.$store.state.matrix;
      },
      cut() {
        return this.$store.state.cut;
      },
    },
    watch: {
      matrix(val) {
        if (val) {
          this.updateGraph();
        }
      },
      cut(val) {
        if (val) {
          this.updateGraph();
        }
      },
    },
    methods: {
      isInCut(node_1, node_2) {
        return this.cut && (this.cut.includes(node_1) && !this.cut.includes(node_2) || !this.cut.includes(node_1) && this.cut.includes(node_2) );
      },
      updateGraph() {
        let nodes = [];
        for (const key in this.matrix) {
          nodes.push({
            id: String(Number(key) + 1),
            label: String(Number(key) + 1),
            shape: 'circle',
            widthConstraint: {
              minimum: 35,
            },
            font: {
              color: '#fff',
              size: 20,
            },
            group: this.cut && this.cut.includes(String(Number(key) + 1)) ? 'myGroup' : ''
          });
        }
        let edges = [];
        for (const row in this.matrix) {
          for (const col in this.matrix[row]) {
            if (col > row && Number(this.matrix[row][col]) !== 0) {
              edges.push({
                from: String(Number(row) + 1),
                to: String(Number(col) + 1),
                label: String(this.matrix[row][col]),
                font: { align: 'middle' },
                color: {
                  color: this.isInCut(String(Number(row) + 1), String(Number(col) + 1)) ? '#dc3545' : '#848484'
                },
                dashes: this.isInCut(String(Number(row) + 1), String(Number(col) + 1))
              });
            }
          }
        }
        var container = document.getElementById('network');
        var data = {
          nodes: new vis.DataSet(nodes),
          edges: new vis.DataSet(edges),
        };
        var options = {
          height: '100%',
          width: '100%',
          autoResize: true,
          groups: {
            myGroup: { color: { background: '#dc3545 ' }, borderWidth: 1 },
          },
          layout: {
            randomSeed: this.network ? this.network.getSeed() : undefined,
            improvedLayout: true
          },
          physics: false,
        };
        this.$nextTick(() => {
          this.network = new vis.Network(container, data, options);
        })
      },
    },
    mounted() {
      if (this.matrix) {
        this.updateGraph();
      }
    },
  };
</script>

<style scoped>
  #network {
    width: 100%;
    height: 100%;
    background: #ebebeb;
    max-height: 474px;
  }
</style>
