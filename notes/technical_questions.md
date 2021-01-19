## Technical Questions

### Question: xxx (title)

Question:

xxx

Source:

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

---

Decode:

xxx

Solution:

xxx

### Question: Check if permutation.

Question:

Given two strings, write a method to decide if one is a permutation of the
other (McDowell 193)

Source:

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

---

#### Solution 1: sort strings and compare (simplest) 

```py
def perms1(A,B):
    AList = list(A)
    BList = list(B)
    AList.sort()
    BList.sort()
    return True if (AList == BList) else False
```

#### Solution 2: Use dictionary 

Step through A and count occurance of each char. Store counts in dictionary, where key is character and value is count. Step through B matching each char with char in dictionary by decrementing count if count greater than zero. If count equals zero -> no match -> not a permutation. This solution is most efficient b/c there is no need to sort.

```py
def perms2(A,B):

    if len(A) != len(B): return False

    Cnt = {}
    for c in A: 
        if c in Cnt: 
            Cnt[c] += 1
        else:
            Cnt[c] = 1

    for c in B: 
        if Cnt[c] > 0:
            Cnt[c] -= 1
        else:
            return False

    return True
```

#### Solution 3: if dictionary not allowed, use a list:

```py
def perms3(A,B):
    if len(A) != len(B): return False
    AChars = [0 for i in range(128)]
    BChars = [0 for i in range(128)]
    for c in A: AChars[ord(c)] += 1
    for c in B: BChars[ord(c)] += 1
    return True if AChars == BChars else False
```

see notebook for complete solution with complexity analysis.

### Question: Implement multiple stacks with single array.

Question:

Describe how you could use a single array to implement three stacks. (McDowell 227)

Source:

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

---

#### Solution 1: Fixed Division - Time Efficient

```py
```

see notebook.

#### Solution 2: Flexible Division - Space Efficient

```py
```

see notebook.

#### Solution 3: Space and Time efficient

```py
```

see [How to efficiently implement k stacks in a single array?](http://www.geeksforgeeks.org/efficiently-implement-k-stacks-single-array/)

### Question: Route Between Nodes ############################################

Question:

A binary search tree was created by traversing through an array from left to right and inserting each element. Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree. (McDowell 262)

Source:

Question 4.9 on page 262

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

---

Decode:

xxx

Solution:

xxx

### Question: Implement Binary Tree ###########################################

Question:

Create your own binary tree and implement two methods: search(), which searches for the presence of a node in the tree, and print_tree(), which prints out the values of tree nodes in a pre-order traversal. You should attempt to use the helper methods provided to create recursive solutions to these functions. 

Source:

Lesson 5, 10.Quiz: Binary Tree Practice

https://classroom.udacity.com/courses/ud513/lessons/7122604912/concepts/79211181170923

---

Solution:

```py
class Node(object):
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree(object):
    def __init__(self, root):
        self.root = Node(root)

    def search(self, find_val):
        """Return True if the value
        is in the tree, return
        False otherwise."""
        return self.preorder_search(self.root, find_val)

    def print_tree(self):
        """Print out all tree nodes
        as they are visited in
        a pre-order traversal."""
        return self.preorder_print(self.root, [])

    def preorder_search(self, start, find_val):
        """Helper method - use this to create a 
        recursive search solution."""
        if start:
            if (start.value == find_val):
                return True
            else:
                return self.preorder_search(start.left, find_val) or self.preorder_search(start.right, find_val)
        return False

    def preorder_print(self, start, traversal):
        """Helper method - use this to create a 
        recursive print solution."""
        if start:
            traversal.append(start.value)
            self.preorder_print(start.left, traversal)
            self.preorder_print(start.right, traversal)
        return traversal


# Set up tree
tree = BinaryTree(1)
tree.root.left = Node(2)
tree.root.right = Node(3)
tree.root.left.left = Node(4)
tree.root.left.right = Node(5)

# Test search
# Should be True
print tree.search(4)
# Should be False
print tree.search(6)

# Test print_tree
# Should be 1-2-4-5-3
print tree.print_tree()
```

### Question: List of Depths

Question:

Given a binary tree, design an algorithm  which creates a linked  ist of  all the nodes at each depth (e.g ., if you have a tree with depth D, you'll have D linked lists).

Source:

Question 4.3 on page 243

[McDowell, Gayle Laakmann. Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition. 2015.](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_3?ie=UTF8&qid=1492123225&sr=8-3&keywords=Algorithms+in+a+nutshell)

---

Solution:

```py
class Node:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.left = left
        self.right = right
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def push(self, item):
        new_node = item
        new_node.next = self.head
        self.head = new_node

def bstToLinkedList(root):
    cur_list = LinkedList()
    cur_list.push(root)
    result = []
    result.append(cur_list)
    while cur_list.head:
        next_list = LinkedList()
        cur_node = cur_list.head
        while cur_node:
            if cur_node.left: next_list.push(cur_node.left)
            if cur_node.right: next_list.push(cur_node.right)
            cur_node = cur_node.next
        if next_list.head:
            result.append(next_list)
        cur_list = next_list
    return result

#      8
#     / \
#    4   10
#   / \   \
#  2   6   20

n2 = Node(2)
n6 = Node(6)
n4 = Node(4, left=n2, right=n6)
n20 = Node(20)
n10 = Node(10, right=n20)
n8 = Node(8, left=n4, right=n10)

a = bstToLinkedList(n8)
print(a[0].head.data)
print('{0} -> {1}'.format(a[1].head.data, a[1].head.next.data))
print('{0} -> {1} -> {2}'.format(a[2].head.data, a[2].head.next.data, a[2].head.next.next.data))
```

