/*
Implement a MyCalendar class to store your events. A new event can be added if adding the event will not cause a double booking.
Your class will have the method, book(int start, int end). Formally, this represents a booking on the half open interval [start, end), 
the range of real numbers x such that start <= x < end. A double booking happens when two events have some non-empty intersection 
(ie., there is some time that is common to both events.) For each call to the method MyCalendar.book, return true if the event can 
be added to the calendar successfully without causing a double booking. Otherwise, return false and do not add the event to the calendar.
Your class will be called like this: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)

source: My Calandar (leetcode 729) - https://leetcode.com/problems/my-calendar-i/
*/

function MyCalendar() {
  this.bookings = new Map();  // Todo: replace hash with balanced tree, so don't have to sort before lookup
}

MyCalendar.prototype.book = function(start, end) {
    
    // get keys
    let startTimes = [...this.bookings.keys()].sort((a,b)=>a-b); // oops!
    
    if (!startTimes.length) {
        this.bookings.set(start, [end, null]);
        return true;
    }

    // find event before new
    let startLeft = binFloorSearch(startTimes, start, 0, startTimes.length); // left or earliest
    

    if (startLeft > start) {

        let startRight = startLeft;
        if (end > startRight) {
          return false;
            
        } else {
          this.bookings.set(start, [end, startRight])
        }

    } else { 

        let [endLeft, startNext] = this.bookings.get(startLeft);
        

        if (start < endLeft || (startNext && end > startNext)) {
          return false;

        } else {
          // 1. add new booking
          this.bookings.set(start, [end, startNext])

          // 2. update left startNext to start
          this.bookings.get(startLeft)[1] = start;
        }
    }
    
    return true;
}

function binFloorSearch(arr, target, left, right) {
  
  while (left < right) {
    let mid = left + Math.floor((right-left)/2)

    if (arr[mid] == target) {
      return target;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return arr[left - 1] || arr[0];
}


// binary tree

function Node(start=null, end=null){
  this.start = start;
  this.end = end;
  this.left = null;
  this.right = null;
}

Node.prototype.insert = function(start,end) {
  if (this.start == null) {
      this.start = start;
      this.end = end;
      return true;
  } else if (start >= this.end) {
      if (this.right) {
          return this.right.insert(start, end);
      } else {
          this.right = new Node(start, end);
          return true;
      }
  } else if (end <= this.start) {
      if (this.left) {
          return this.left.insert(start, end);
      } else {
          this.left = new Node(start, end);
          return true;
      }
  } else {
      return false;
  }
}

function MyCalendar() {
  this.bookings = new Node();
}

MyCalendar.prototype.book = function(start, end) {
  return this.bookings.insert(start,end);
}

// using function