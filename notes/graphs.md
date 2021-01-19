## Graphs

---

1. A graph is a set of vertices and a set of **directed or undirected** edges (u,v).
2. **Vertices and Edges** can be decorated with weights, lengths, etc...
3. A **path** is a sequence of vertices, and the **path length** is the number of edges it traverses.
4. If there exists a path from u to v, then v is **reachable** from u.
5. A **directed acyclic graph (DAG)** is a directed graph with no cycles.
6. DAG vertices with no incoming or outgoing edges are called **sources** and **sinks** respectively.
7. A **topological ordering** of vertices in a DAG is such that each edge is from a vertex earlier in the ordering to a vertex later in the ordering.
8. cont. on EPI pg 276 with basic concepts...
9. A graph can be implemented using an **adjacency list** or an **adjacency matrix**.
10. If each vertice has at most one edge, implement the *adjacency list* with a dictionary where key/value pairs correspond to u,v edge pairs (or better yet, use an array if vertices map to array indices) (see EPI 277.)
11. If vertices have multiple edges can still use dict, where dict values are lists of tuples corresponding to outgoing edges, or alternatively, maintain seperate lists of vertices and edges. May have to use multiple representations for more complex problems.
12. If using graph to model a grid, or if graph is highly connected, consider an adjacency matrix.
10. graphs are ideal for modeling **binary relationships between pairs of objects**
11. Graphs are natural for **spatial relationships**, but consider them more generally for any binary relationship between objects (e.g. links, followers, etc.)
12. Prefer **DFS** for graph problems that entail analyzing sturcture (e.g. looking for cycles, connected components, topological ordering of a DAG, etc.)
13. Prefer **BFS** for optimization problems (e.g. shortest path, minimum spanning tree, etc.), which often involve computing dist from start vertex
14. DFS and BFS both compute in linear time **O(m + n)** for m edges and n vertices (or nodes)



---

### adsf