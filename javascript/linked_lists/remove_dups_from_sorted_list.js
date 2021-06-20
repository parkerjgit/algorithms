/*
xxx

source: EPI 7.8 remove duplicates from sorted list.
*/

function removeDuplicates(head) {
    let cur = head;

    while(cur && cur.next) {
        while(cur.next && cur.value == cur.next.value) {
            cur.next = cur.next.next;
        }
        cur = cur.next;
    }
}

describe('removeDuplicates', () => {
    it('removes duplicates from a sorted list', () => {
        let myList = new LinkedList();
        let values = [1,1,2,2,2,3,4,5,6,7,8,9,9,9];
        values.reverse().forEach((v)=>{
            myList.add(v);
        })
        removeDuplicates(myList.head);
        expect(myList.values()).toEqual([1,2,3,4,5,6,7,8,9])
    })
})