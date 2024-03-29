"""
Given Node, Edge and Graph classes, and Graph methods to insert node and insert edge,
implement graph methods to get the following graph representations:

edge list, adjacency list, and adjacency matrix.

Edge list should return a list of triples that looks like this:
(Edge Value, From Node Value, To Node Value)

Adjacency list should return a list of lists. The indecies of the outer list represent
"from" nodes. Each item in the list will store a list of tuples that looks like this:
(To Node, Edge Value)

Adjacency matrix Row numbers represent from nodes, column numbers represent to nodes.
Store the edge values in each spot, and a 0 if no edge exists.

source: https://classroom.udacity.com/courses/ud513/lessons/7114284829/concepts/79348548570923
"""
class Node(object):
    def __init__(self, value):
        self.value = value
        self.edges = []

class Edge(object):
    def __init__(self, value, node_from, node_to):
        self.value = value
        self.node_from = node_from
        self.node_to = node_to


class Graph(object):
    def __init__(self, nodes=[], edges=[]):
        self.nodes = nodes
        self.edges = edges

    def insert_node(self, new_node_val):
        new_node = Node(new_node_val)
        self.nodes.append(new_node)

    def insert_edge(self, new_edge_val, node_from_val, node_to_val):
        from_found = None
        to_found = None
        for node in self.nodes:
            if node_from_val == node.value:
                from_found = node
            if node_to_val == node.value:
                to_found = node
        if from_found == None:
            from_found = Node(node_from_val)
            self.nodes.append(from_found)
        if to_found == None:
            to_found = Node(node_to_val)
            self.nodes.append(to_found)
        new_edge = Edge(new_edge_val, from_found, to_found)
        from_found.edges.append(new_edge)
        to_found.edges.append(new_edge)
        self.edges.append(new_edge)

    def get_edge_list(self):

        """code here"""
        result = []
        for edge in self.edges:
            result.append((edge.value, edge.node_from.value, edge.node_to.value))
        return result

    def get_adjacency_list(self):

        """code here"""
        # result = [0 for n in range(len(self.nodes))]
        result = [None for n in range(5)]

        for node in self.nodes:

            adjacencies = []
            for edge in node.edges:

                if node.value == edge.node_from.value:
                    adjacency = (edge.node_to.value, edge.value)
                    adjacencies.append(adjacency)

            result[node.value] = adjacencies if adjacencies else None

        return result

    def get_adjacency_matrix(self):

        """code here"""
        result = [None for n in range(5)]

        for node in self.nodes:
            row = [0 for n in range(5)]
            for edge in node.edges:
                if node.value == edge.node_to.value:
                    row[edge.node_from.value] = edge.value
                elif node.value == edge.node_from.value:
                    row[edge.node_to.value] = edge.value
                else:
                    pass
            result[node.value] = row
        return result

if __name__ == '__main__':
    graph = Graph()
    graph.insert_edge(100, 1, 2)
    graph.insert_edge(101, 1, 3)
    graph.insert_edge(102, 1, 4)
    graph.insert_edge(103, 3, 4)
    # Should be [(100, 1, 2), (101, 1, 3), (102, 1, 4), (103, 3, 4)]
    print(graph.get_edge_list())
    # Should be [None, [(2, 100), (3, 101), (4, 102)], None, [(4, 103)], None]
    print(graph.get_adjacency_list())
    # Should be [[0, 0, 0, 0, 0], [0, 0, 100, 101, 102], [0, 0, 0, 0, 0], [0, 0, 0, 0, 103], [0, 0, 0, 0, 0]]
    print(graph.get_adjacency_matrix())