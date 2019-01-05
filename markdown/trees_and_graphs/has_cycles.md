## Detect if a graph has a Cycle

### Problem

Write a program that takes as input a directed graph and checks if the graph contains a cycle

source: EPI 18.4 Deadlock detection

### Boardwork (Design)

![](../../images/xxx.jpg)

### Analysis

xxx

Time: O(E + V)
Space: O(E + V)

### Codework (Test)

Javascript implementation. requires: non-empty graph represented by a javascript object (hash map), where keys correspond to single nodes and values correspond to a set of all predecessor nodes.

```javascript
function graphHasCycle(graph, seen = new Set()) {
    return graph.keys().map(node => (
        subTreeHasCycles(
            graph, 
            node,
            seen)
    )).some(x => x);
}

function subTreeHasCycles(graph, root, seenInSubtree = new Set(), seenInGraph) {

    if (seenInGraph.has(root))      // already checked this subtree
        return;
    if (seenInSubtree.has(root))    // found cycle!
        return true;
    if (graph[node].length == 0)    // end of branch, so no cycle
        return false;

    // mark node seen by inner and outer scopes
    seenInGraph.add(root);
    seenInSubtree.add(root);

    return graph[root].map(node => (
        subTreeHasCycles(graph, node, seenInSubtree, seenInGraph)
    )).some(x => x);
}
```
(from [has_cycle.js](../../javascript/trees_and_graphs/has_cycle.js))