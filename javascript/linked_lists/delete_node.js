/*
delete a middle node in a linked list given only the node to delete.

source: CTCI 2.3 delete middle node
*/

function Node(value) {
    this.value = value;
    this.next = null;
}

function addNode(head, newNode) {
    newNode.next = head;
    return newNode;
}

function deleteNode(target) {
    if (target.next) {
        target.value = target.next.value;
        target.next = target.next.next;
    } else {
        throw error('can not delete last node');
    }
}

//test

describe('deleteNode', function() {
    beforeEach(function() {
        this.head = new Node(0)
        this.target = new Node(5)
        let values1 = [4,3,2,1];
        let values2 = [9,8,7,6];
        values2.forEach((v)=>{
            this.head = addNode(this.head, new Node(v));
        })
        this.head = addNode(this.head, this.target);
        values1.forEach((v)=>{
            this.head = addNode(this.head, new Node(v));
        })
    })
    it('deletes a middle node in a linked list given only the node to delete.', function() {
        deleteNode(this.target)
        expect(this.head.next.next.next.next.value).toEqual(6)
    })
})