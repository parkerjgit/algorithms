/*
There are n computers numbered from 0 to n-1 connected by ethernet cables connections forming a 
network where connections[i] = [a, b] represents a connection between computers a and b. Any 
computer can reach any other computer directly or indirectly through the network. Given an initial 
computer network connections. You can extract certain cables between two directly connected 
computers, and place them between any pair of disconnected computers to make them directly connected. 
Return the minimum number of times you need to do this in order to make all the computers connected. 
If it's not possible, return -1. 

Constraints:

1 <= n <= 10^5
1 <= connections.length <= min(n*(n-1)/2, 10^5)
connections[i].length == 2
0 <= connections[i][0], connections[i][1] < n
connections[i][0] != connections[i][1]
There are no repeated connections.
No two computers are connected by more than one cable.

source:
*/

var makeConnected = function(n, connections) {
  
  class UnionFind {
      constructor(num) {
          this.graph = [...Array(num)].map((_, i) => i);
          this.extra = 0;
          this.components = num;
      }
      
      find(id) {
          if(this.graph[id] === id) return id;
          this.graph[id] = this.find(this.graph[id]);
          return this.graph[id];
      }
      
      union(x, y) {
          const rootX = this.find(x);
          const rootY = this.find(y);
          if(rootX !== rootY) {
              this.graph[rootY] = rootX;
              this.components--;
          } else this.extra++;
      }
  }
  
  const unionfind = new UnionFind(n);
  
  for(let [u, v] of connections) {
      unionfind.union(u, v);
  }
  const unconnected = unionfind.components-1;
  return unionfind.extra >= unconnected ? unconnected : -1; 
};

var makeConnected = function(n, connections) {  // n nodes, 0 to n-1
  let parents = [...Array(n).keys()];           // initially all nodes point to self, ie [0, 1, 2, ...]
  let connected = n;                                // initially all nodes and unconnected
  let redundant = 0;

  function find(id) {
    if(parents[id] !== id) 
      parents[id] = find(parents[id]); // compress
    
    return parents[id];
  }
  
  function union(a, b) {
    let rootA = find(a);
    let rootB = find(b);

    if(rootA !== rootB) {
      parents[rootB] = rootA;
      connected--;
    } else { // already connected
      redundant++;
    }
  }

  for(let [u, v] of connections) {
      union(u, v);
  }

  let unconnected = connected - 1;
  return (redundant >= unconnected) ? unconnected : -1;
}