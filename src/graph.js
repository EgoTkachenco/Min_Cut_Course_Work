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
  minEdge(A) {
    let a_min = { node: 0, weight: 1000}
    for (const key_a in A) {
      let a = A[key_a]
      for (const edge in a.edges) {
        const element = a.edges[edge];
        if(element.weight < a_min.weight && !A[edge]) {
          a_min = { node: key_a, weight: element.weight }
        }
      }
    }
    return a_min
  }
  isConnective(g) {
    let firstKey = Object.keys(g)[0]
    let marked_g = Object.assign({}, {[firstKey]: g[firstKey]});
    let updated = false;

    do {
      updated = false
      for (const key in marked_g) {
        let node = marked_g[key]
        for (const to in node.edges) {
          if(g[to] && !marked_g[to]) {
            marked_g[to] = g[to];
            updated = true
          }
        }
      }
    } while(updated)

    return Object.keys(g).length === Object.keys(marked_g).length
  }
  kernighanLinPartition() {
    let n = Object.keys(this.nodes).length;
    let i = 0;
    let A = {}; 
    let B = {};
    // determine a balanced initial partition of the nodes into sets A and B
    for (const key in this.nodes) {
      const node = this.nodes[key];
      if(i < Math.round(n/2)) {
        A[key] = Object.assign({}, node, { marked: false })
      } else {
        B[key] = Object.assign({}, node, { marked: false })
      }
      i++
    }
    
    let result = {optimal: null, iterations: []}
    // Algoritm stops if there's no increasing of min edge in cut
    let g_max = this.minEdge(A).weight;
    let new_g_max = 0
    do {
      // Swap while there's unmarked nodes
      let swaped_A = Object.assign({}, A)
      let swaped_B = Object.assign({}, B)
      let swaps = [];
      for (let i = 0; i < Math.round(n/2); i++) {
        let d_swap = { a: null, b: null, weight: 0 };
        for (const key_a in swaped_A) {
          const a = swaped_A[key_a];
          if(!a.marked) {
            for (const key_b in swaped_B) {
              let b = swaped_B[key_b]
              if(!b.marked) {
                let tempA = Object.assign({}, swaped_A, {[key_b]: b})
                let tempB = Object.assign({}, swaped_B, {[key_a]: a})
                delete tempA[key_a];
                delete tempB[key_b];
                // if(this.isConnective(tempA) && this.isConnective(tempB)) {
                  let m_edge = this.minEdge(tempA);
                  if(m_edge.weight > d_swap.weight) {
                    d_swap = { a: key_a, b: key_b, weight: m_edge.weight };
                  }
                // }
              }
              
            }
          }
        }  
        if(d_swap.a && d_swap.b) {
          swaped_A[d_swap.b] = swaped_B[d_swap.b]
          swaped_B[d_swap.a] = swaped_A[d_swap.a]
          swaped_A[d_swap.b].marked = true
          swaped_B[d_swap.a].marked = true
          delete swaped_A[d_swap.a]
          delete swaped_B[d_swap.b]
          swaps.push(d_swap)
        }
      }
      // get All swaps
      g_max = this.minEdge(A).weight;
      let nodeNames = Object.keys(A).map(item => Number(item) + 1).join(' ');
      result.iterations.push({ nodes: nodeNames, weight: g_max})
      // calc k
      let k = 0;
      swaps.forEach((item, index) => {
        if(item.weight > g_max) {
          k = index + 1
        }
      })
      // Swap subsets from A to B
      swaps = swaps.slice(0, k)
      swaps.forEach(item => {
        A[item.b] = B[item.b]
        B[item.a] = A[item.a]
        delete B[item.b]
        delete A[item.a]
      })
      // Unmark all nodes
      for (const key in A) {
        A[key].marked = false;
      }
      for (const key in B) {
        B[key].marked = false;
      }
      new_g_max = this.minEdge(A).weight;
    } while(new_g_max > g_max)
    let names = []
    for (const key in A) {
      const element = A[key];
      names.push(element.name)
    }
    result.optimal = result.iterations[result.iterations.length - 1]
    return result
  }
  greedyPartition() {
    let n = Object.keys(this.nodes).length;
    let A = {0: this.nodes[0]}
    let B = Object.assign({}, this.nodes)
    delete B[0]

    let result = {optimal: {}, iterations: []}
    result.iterations.push({ nodes: Object.keys(A).map(item => Number(item) + 1).join(' '), weight: this.minEdge(A).weight})
    for (let i = 0; i < Math.round(n/2) - 1; i++) {
      let minEdge = { weight : 0 }
      for (const key in B) {
        let connectiveA = false
        let b = B[key];
        let tempA = Object.assign({}, A, {[key]: b})
        for (const to in b.edges) {
          if(A[to]) {
            connectiveA = true
          }
        }
        let tempAMin = this.minEdge(tempA)
        if(connectiveA && tempAMin.weight > minEdge.weight) {
          minEdge = {node: key, weight: tempAMin.weight}
        }
      }
      if(minEdge.node) {
        A[minEdge.node] = B[minEdge.node]
        delete B[minEdge.node]
        result.iterations.push({ nodes: Object.keys(A).map(item => Number(item) + 1).join(' '), weight: minEdge.weight})
      } else {
        break
      }
    }
    
    result.optimal = result.iterations[result.iterations.length - 1]
    return result
  }
}

module.exports = Graph;
