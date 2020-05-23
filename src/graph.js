class Graph {
  constructor(matrix) {
		let nodes = {};
    for (let id = 0; id < matrix.length; id++) {
			let edges = {};
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
    for (const id in this.nodes) {
      const item = this.nodes[id];
      let edgesSum = 0;
      for (const index in item.edges) {
        edgesSum += item.edges[index].weight;
      }
      if (edgesSum < minNode.weight) {
        minNode = { node: id, name: this.nodes[id].name, weight: edgesSum };
      }  
    }
    return minNode;
  }
  getNodeMaxConnectiveNode(node) {
    let maxNode = { node: null, weight: 0 };
    for (const id in this.nodes[node].edges) {
      const item = this.nodes[node].edges[id];
      if (id !== node && maxNode.weight < item.weight) {
        maxNode = { node: id, weight: item.weight };
      }  
    }
    return maxNode;
  }
  // Merge Node 1 to node 2
  mergeNodes(node_1, node_2) {
		this.nodes[node_2].name += ' ' + this.nodes[node_1].name;
    
    for (const index in this.nodes[node_1].edges) {
      const edge = this.nodes[node_1].edges[index];
      if(edge && index !== node_1 && index !== node_2) {
        if(this.nodes[node_2].edges[index]) {
          this.nodes[node_2].edges[index].weight += edge.weight
          this.nodes[index].edges[node_2].weight += edge.weight
        } else {
          this.nodes[node_2].edges[index] = { node: index, weight: edge.weight };
          this.nodes[index].edges[node_2] = { node: node_2, weight: edge.weight };
        }
        delete this.nodes[index].edges[node_1]
      }  
    }

		delete this.nodes[node_2].edges[node_1];
		delete this.nodes[node_1];
	}
  getRandomEdge() {
    let nodes = Object.keys(this.nodes);
    let node_1 = nodes[Math.floor(Math.random() * nodes.length)];

    let edges = Object.keys(this.nodes[node_1].edges);
    let edge = edges[Math.floor(Math.random() * edges.length)];
    return { node_1: node_1, node_2: edge, weight: this.nodes[node_1].edges[edge].weight }
  }
	greedyMinCut() {
    let startTime = new Date().getTime()
    let solution = { optimal: { weight: Infinity }, iterations: [], time: 0 };
    while(Object.keys(this.nodes).length > 1) {
      let minNode = this.getMinConnectiveNode();
      let maxConnectiveNode = this.getNodeMaxConnectiveNode(minNode.node);
      this.mergeNodes(minNode.node, maxConnectiveNode.node);

      solution.iterations.push({ nodes: minNode.name, weight: minNode.weight })
    }
    solution.iterations.forEach(item => {
      if(item.weight < solution.optimal.weight) {
        solution.optimal = item;
      }
    })
    let endTime = new Date().getTime();
    solution.time = endTime - startTime;
    return solution
  }
  kargersMinCut() {
    // let solution = { optimal: { weight: Infinity }, iterations: [] };
    let edge = null
    while(Object.keys(this.nodes).length > 2) {
      edge = this.getRandomEdge() 
      this.mergeNodes(edge.node_1, edge.node_2);
    } 
    return { nodes: this.nodes[edge.node_2].name, weight: this.getNodeMaxConnectiveNode(edge.node_2).weight }
  }
}

module.exports = Graph;
