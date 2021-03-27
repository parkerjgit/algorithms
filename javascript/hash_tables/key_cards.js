/*
LeetCode company workers use key-cards to unlock office doors. Each time a worker uses their key-card, the security system saves the worker's name and the time when it was used. The system emits an alert if any worker uses the key-card three or more times in a one-hour period.
You are given a list of strings keyName and keyTime where [keyName[i], keyTime[i]] corresponds to a person's name and the time when their key-card was used in a single day.
Access times are given in the 24-hour time format "HH:MM", such as "23:51" and "09:49".
Return a list of unique worker names who received an alert for frequent keycard use. Sort the names in ascending order alphabetically.
Notice that "10:00" - "11:00" is considered to be within a one-hour period, while "22:51" - "23:52" is not considered to be within a one-hour period.

Constraints:

1 <= keyName.length, keyTime.length <= 105
keyName.length == keyTime.length
keyTime[i] is in the format "HH:MM".
[keyName[i], keyTime[i]] is unique.
1 <= keyName[i].length <= 10
keyName[i] contains only lowercase English letters.

source: Alert Using Same Key-Card Three or More Times in a One Hour Period (lc 1604) - https://leetcode.com/problems/alert-using-same-key-card-three-or-more-times-in-a-one-hour-period/
*/

/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
 var alertNames = function(keyName, keyTime) {
  let res = [];
  let map = {}; // name -> sparse array of times for name
  
  // count sort times, group by name
  for (let i of keyName.keys()) {
      let [name, time] = [keyName[i], parse(keyTime[i])];
      if (!map[name]) map[name] = []; 
      map[name][time] = 1; // note, time is key, not value!
  }
  
  // loop over names and check times using sliding window
  for (let [name, sparseTimes] of Object.entries(map)) {
      let times = Object.keys(sparseTimes); // flatten
      let i = 2;
      while (i < times.length) {
          if (times[i] - times[i-2] <= 60) {
              res.push(name);
              break;
          }
          i++;
      }
  }
  
  return res.sort(); // returns ref
};

const parse = (str) => {
  let [a,b] = str.split(':').map(part => parseInt(part));
  return a*60 + b;
};