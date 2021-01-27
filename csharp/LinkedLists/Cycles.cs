using System;
using System.Collections.Generic;

namespace LinkedLists
{
    public class Cycles
    {
        // Finds the first node in the cycle if the list is cyclic and return it. return null if list is not cyclic.
        public static LinkedListNode<int> FindCycle(LinkedListNode<int> head)
        {
            LinkedListNode<int> anyCycleNode;
            LinkedListNode<int> firstCycleNode;

            // Find any node in a cycle
            anyCycleNode = FindAnyNodeOnCycle();

            if (anyCycleNode == null)
            {
                // List is not cyclic
                firstCycleNode = null;
            }
            else
            {
                // List has cycle, so calc length and use to find first node in cycle.
                int cycleLength = CalculateLengthOfCycle(anyCycleNode);
                firstCycleNode = FindFirstNodeOnCycle(cycleLength);
            }

            // return first node if cyclic, null if not.
            return firstCycleNode;

            LinkedListNode<int> FindAnyNodeOnCycle()
            {
                LinkedListNode<int> slow;
                LinkedListNode<int> fast;

                slow = fast = head;

                // while haven't found cycle or reached end of list, keep looking.
                while (fast != null && fast != slow)
                {
                    slow = slow.Next;
                    fast = fast.Next.Next;
                }

                // return null or node on cycle.
                return fast;
            }

            // Calculate length of cycle from a known node on cycle. 
            int CalculateLengthOfCycle(LinkedListNode<int> nodeOnCycle)
            {
                LinkedListNode<int> start = nodeOnCycle;
                LinkedListNode<int> cur = start.Next;

                // we know about 2 nodes already
                int count = 2;

                // so just count the rest
                while (cur.Next != start)
                {
                    cur = cur.Next;
                    count++;
                }

                return count;
            }

            // Find the first node in the cycle
            LinkedListNode<int> FindFirstNodeOnCycle(int lengthOfCycle)
            {
                LinkedListNode<int> front;
                LinkedListNode<int> back;

                // set back mark
                back = head;

                // set front mark lengthOfCycle ahead of back
                front = head;
                for (int i = 0; i < lengthOfCycle; i++)
                {
                    front = front.Next;
                }

                // while haven't doubled back, slide window
                while (front != back)
                {
                    front = front.Next;
                    back = back.Next;
                }

                // front is now marking the first node on cycle.
                return front;
            }
        }
    }
}
