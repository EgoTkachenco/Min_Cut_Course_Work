class Graph {
  constructor(matrix) {
		let nodes = [];
    for (let id = 0; id < matrix.length; id++) {
			let edges = [];
			let name = this.nodes ? this.nodes[id].name : id + 1;  
      matrix[id].forEach((item, index) => {
        if (item) edges[index] = { node: index, weight: item };
			});
      nodes[id] = { name: name, edges: edges };
    }
    this.nodes = nodes;
  }
  getMinConnectiveNode() {
    let minNode = { node: null, weight: Infinity };
    this.nodes.map((item, id) => {
      let edgesSum = 0;
      item.edges.map((item) => {
        edgesSum += item.weight;
      });
      console.log('Iteration', { node: id, weight: edgesSum });
      if (edgesSum < minNode.weight) {
        minNode = { node: id, weight: edgesSum };
      }
    });
    return minNode;
  }
  getNodeMaxConnectiveNode(node) {
    let maxNode = { node: null, weight: 0 };
    this.nodes[node].edges.map((item, id) => {
      if (id !== node && maxNode.weight < item.weight) {
        maxNode = { node: id, weight: item.weight };
      }
    });
    return maxNode;
  }
  // Merge Node 1 to node 2
  mergeNodes(node_1, node_2) {
		this.nodes[node_2].name += ' ' + this.nodes[node_1].name;
		
		this.nodes[node_1].edges.map(item => {
			if(item.node !== node_1 && item.node !== node_2) {
				this.nodes[node_2].edges[item.node].weight += this.nodes[node_1].edges[item.node].weight
				this.nodes[item.node].edges[node_2].weight += this.nodes[node_1].edges[item.node].weight
				delete this.nodes[this.nodes[node_1].edges[item.node].node].edges[node_1]
			}
		})

		delete this.nodes[node_2].edges[node_1];
		delete this.nodes[node_1];


		// let newMatrix = [];
    // for (let row = 0; row < this.matrix.length; row++) {
    //   if (row !== node_1) {
    //     let newRow = Object.assign([], this.matrix[row]);
    //     newRow.splice(node_1, 1);
    //     newMatrix.push(newRow);
    //   }
		// }
		// let mergedRow = Object.assign([], this.matrix[node_1]);
		// mergedRow.splice(node_1, 1);
		// mergedRow.map((item, index) => {
		// 	if( index!== node_2) {
		// 		newMatrix[node_2][index]+=item;
		// 		newMatrix[index][node_2]+=item;
		// 	}
		// })
		// debugger
		// this.nodes[node_2].name += ' ' + this.nodes[node_1].name; 
		// this.matrix = newMatrix;
		// this.saveGraph();
  }
}

module.exports = Graph;
