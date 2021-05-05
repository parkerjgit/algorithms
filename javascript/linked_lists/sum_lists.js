/*
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.

source: Add two numbers II (lc 445) - https://leetcode.com/problems/add-two-numbers-ii/
*/

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {

  // if one number has fewer digits, find it.
  let [l1Len, l2Len] = [getLen(l1), getLen(l2)];
  let [sml, big] = (l1Len <= l2Len) ? [l1, l2] : [l2, l1];

  // add equal length lists (pad smaller)
  let [head, carry] = add(pad(sml, Math.abs(l1Len - l2Len)), big);

  // handle final carry
  if (carry) {
      let newNode = new ListNode(carry);
      newNode.next = head;
      head = newNode;
  }

  return head;
};

function add(n1,n2) { // postOrder dft

  if (!n1 && !n2) return [null, 0]

  // 1. add rest of digits (excluding first)
  let [head, carry] = add(n1.next,n2.next);

  // 2. add first digits + carry and append to rest
  let sum = n1.val + n2.val + carry;
  let newNode = new ListNode(sum % 10);
  newNode.next = head;
  return [newNode, Math.floor(sum/10)];
}

function getLen(head) {
  let cur = head, len = 0;
  while (cur) { len++; cur = cur.next; }
  return len;
}

function pad(list, x) {
  if (x > 0) {
      for (i = 0; i < x; i++) {
          let pad = new ListNode(0);
          pad.next = list;
          list = pad;
      }
  }
  return list;
}
