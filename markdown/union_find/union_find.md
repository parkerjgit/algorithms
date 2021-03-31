# Union-Find

* asdf

## Implement union-find w/ an array

```js
const parents = [];
const find = (x) => {
    if (parents[x] < 0) { // if nodes map to array indices, can use sign to repr. self and magnitude to repr. child count
        return x;
    }
    return find(parents[x])
}

const union = (a, b) => {
    let rootA = find(a);
    let rootB = find(b);

    // if detecting cycles, check here btween lookup and union!!!
    if (rootA == rootB) {
        return false;
    }

    parents[rootB] = rootA;
}
```

---
## Implement union-find with path compression

```js
const parents = {};
const find = (x) => {

    // compress
    if (parents[x] !== x) { // if node values are complex or don't easily map to indices.
        parents[x] = find(parents[x]);
    }

    // compressed, so parent is now root.
    return parents[x];
};

const union = (x, y) => {
    parents[find(y)] = find(x);
};
```

---
## Validation: Does Undirected Graphy have cycles (or redundant edges)?

**union-find w/ parents array**

```js
var findRedundantConnection = function(edges) {
    let parents = Array(edges.length + 1).fill(-1);

    const find = (x) => {
        if (parents[x] < 0) {
            return x;
        }
        return find(parents[x])
    }

    const union = (a, b) => {
        let rootA = find(a);
        let rootB = find(b);

        // cycle check has to go here btween lookup and union!!!
        if (rootA == rootB) {
            return false;
        }

        parents[rootB] = rootA;
        return true;
    }

    // build graph
    for (let [u, v] of edges) {
        if (!union(u, v)) {
            return [u,v];
        }
    }

    return -1;
};
```
see [full implementation](.\javascript\trees_and_graphs\redundant_connections.js)

---
## Group nodes by root (ie. collapse graph) in disjointed undirected graphs (eg. Merge Accounts)

```js
var accountsMerge = function (accounts) {
  const parents = {};       // email -> parent (root b/c collapsed)
  const names = {};         // email -> name
  const allEmails = {};     // root -> all emails (including root)

  const find = (x) => {

      // collapse
      if (parents[x] !== x) {
          parents[x] = find(parents[x]);
      }

      // collapsed, so returning root
      return parents[x];
  };

  const union = (x, y) => {
      parents[find(y)] = find(x);
  };

  // 1. initialize disjoint nodes
  for (let [name, ...emails] of accounts) {
      for (let email of emails) {
          parents[email] = email; // no-op if email already initialized
          names[email] = name;
      }
  }

  // 2. build graph, ie perform unions
  for (let [_, firstEmail, ...restOfEmails] of accounts) {
    for (let email of restOfEmails) {
        union(firstEmail, email);
    }
  }

  // 3. group emails by root
  for (let email of Object.keys(parents)) {
      let root = find(email);
      if (root in allEmails) {
          allEmails[root].push(email);
      } else {
          allEmails[root] = [email];
      }
  }

  let result = [];
  for (let [root, emails] of Object.entries(allEmails)) {
    result.push([names[root], ...emails.sort()])
  }
  return result;
};
```
see [full implementation](.\..\..\javascript\trees_and_graphs\merge_account.js)

---
## Searching: Count number of connected components.

```js
function countConnectedComponents(n, connections) {  // n nodes
  let parents = [...Array(n).keys()];       // [0, 1, 2, ...]
  let count = n;                            // initially all nodes and unconnected

  function find(id) {
    if(parents[id] !== id) 
      parents[id] = find(parents[id]); // compress
    
    return parents[id];
  }
  
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if(rootX !== rootY) {
        parents[rootY] = rootX;
        count--;
    } else {
      // already connected. ie. this connection is redundant
    }
  }

  for(let [u, v] of connections) {
      union(u, v);
  }

  // num connected = count;
  // num unconnected = count - 1;
  return count;
}
```
(based on [make connected solution](.\..\..\javascript\union_find\connected_components.js)])