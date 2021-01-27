/* given teams A and B, is there a sequenec of teams starting withaA and ending 
with B such that eachteam inthe sequence has beaten the next team inthe sequence.

ie. does path exist between two nodes, is a node reachable from start node.

source: EPI 18.0 - can team a beat team b
*/

// graph: {source: String -> Set of Strings(sinks)}
// eg graph: {'A': <'B','C'>}
// isReachable(graph: map, start: Node, target: Node, seen: Set) -> Boolean
function isReachable(graph, start, target, seen = new Set()) {

    if (start === target)
        return true;
    if (seen.has(start))
        return false;

    seen.add(start)
    
    return graph[start].map(child => {
        return isReachable(graph, child, target, seen);
    }).some(x => x);
}

// directed edges: [from, to]
function buildGraph(edges) {
    let res = Object.create(null);
    edges.forEach(([from, to]) => {
        res[from].push(to);
    })
    return res;
}

// match: [winner: string, loser: string]
// (matches: array of match, A: str, B: str) -> true/false
function canABeatB(matches, A, B) {
    return isReachable(buildGraph(matches), A, B);
}

// test tbd...