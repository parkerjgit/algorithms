/*
A format for expressing an ordered list of integers is to use a comma separated list of either individual integers
or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'. The range includes all integers in the interval including both endpoints. It is not considered a range unless it spans at least 3 numbers. For example ("12, 13, 15-17") Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted string in the range format.

eg.
rangeExtraction([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
returns "-6,-3-1,3-5,7-11,14,15,17-20"

Source:
https://www.codewars.com/kata/51ba717bb08c1cd60f00002f
*/

function rangeExtraction(list){
  let res = [];
  let run = [];
  let prev = Number.NEGATIVE_INFINITY;

  const update = (res, run) => {
    if (run.length >= 3) {
      // push long run, eg. '3-7'
      res.push(`${run[0]}-${run[run.length-1]}`)
    } else {
      // push short run, eg. 1,2
      res.push(...run)
    }
    return res;
  }

  list.forEach(num => {
    if (num !== prev + 1) {
      // run is over, so update result
      res = update(res,run);
      run = [];
    }
    // run is still going
    run.push(num)
    prev = num
   });

   res = update(res,run);
   return res.join(',');
 }

 // Test

 describe('range extraction', function() {
   it('takes a list of integers in increasing order and returns a correctly formatted string in the range format', function() {
     expect(rangeExtraction([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20])).toEqual('-6,-3-1,3-5,7-11,14,15,17-20')
   })
 })
