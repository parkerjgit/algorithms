/* Write a program that takes as input a directed graph and check s if the graph contains a cycle

source: EPI 18.4 Deadlock detection
*/

/*
 * checks if graph contains a cycle.
 *
 * requires: non-empty graph represented by a javascript object (hash map), where keys
 * correspond to single nodes and values correspond to a set of all predecessor nodes.
 * effects: none
 * 
 * @param graph     a directed graph
 * @param seen      nodes that have already been visited
 * @return          true or false
 * 
 */
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
    if (seenInSubtree.has(root))   // found cycle!
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

// test tbd... don't think this works. need to backtrack, see javascript\trees_and_graphs\course_schedule.js