"""
Given a directed graph, design an algorithm to find out whether there is a route between two nodes.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 241.
"""


class Node(object):

    def __init__(self, value):
        self.value = value
        self.adj = []


def route_exists(node_from, node_to):
    """
    Solution 1:
    Depth-first traversal of directed graph, checking each node along the way and marking visited to prevent cycling.
    Time: O(n) worst-case linear time when node is last node checked or node not found.
    Space: O(n) approaches linear aux space for highly connected graph
    """

    visited = set()

    def recurse(n1, n2):

        nonlocal visited

        # check if found or already visited
        if n1.value == n2.value:
            return True
        if n1.value in visited:
            return False

        # mark visited
        visited.add(n1.value)

        # depth-first traversal of adjacencies
        i = 0
        while i < len(n1.adj):
            if recurse(n1.adj[i], n2):
                return True
            else:
                i += 1

        return False

    return recurse(node_from, node_to)


"""
test
"""
def test_route_exists():
    a_node = Node("a")
    b_node = Node("b")
    c_node = Node("c")
    d_node = Node("d")
    e_node = Node("e")
    f_node = Node("f")

    a_node.adj.extend([b_node, c_node])
    b_node.adj.extend([c_node, d_node])
    c_node.adj.extend([d_node])
    d_node.adj.extend([a_node])
    e_node.adj.extend([c_node, f_node])
    f_node.adj.extend([b_node])

    assert route_exists(a_node, d_node) == True
    assert route_exists(a_node, f_node) == False