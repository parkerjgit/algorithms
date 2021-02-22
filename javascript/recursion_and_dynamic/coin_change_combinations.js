/*
1. total number of ways to make change given unlimited supply of coins with given denominations

source: Counting Change Combinations (codewars) - https://www.codewars.com/kata/541af676b589989aed0009e7
*/

{

  // Solution 1: backtracking (by passing start index down)
  function countChange(change, coins) {
    let count = 0;

    function combinationSum(target, startIndex) {
      if (target < 0) 
        return;
      
      if (target == 0)
        count += 1;
      
      for (let i = startIndex; i < coins.length; i++) {
        combinationSum(target - coins[i], i)
      }
    }

    combinationSum(change, 0);
    return count;
  }
  
  // Solution 2: backtracking (by slicing candidate array)
  var countChange2 = function(change, coins) {
    if(change < 0 || coins.length === 0)
      return 0

    if(change === 0)
      return 1

    return countChange(change - coins[0], coins) + countChange(change, coins.slice(1))
  }

  // Test

  const problems = [
    {
      problem: `Write a function that counts how many different ways you can make change for an amount of money, given an array of coin denominations.`,
      solutions: [
        {
          description: 'backtracking (by passing start index down)',
          fn: countChange
        },
        {
          description: 'backtracking (by slicing candidate array)',
          fn: countChange2
        },
      ],
      tests: [
        {
          expectation: 'simple case',
          params: [4, [1,2]],
          expected_output: 3
        },
        {
          expectation: 'complex case',
          params: [300, [5,10,20,50,100,200,500]],
          expected_output: 1022
        },
        {
          expectation: 'no change case',
          params: [11, [5,7]],
          expected_output: 0
        },
      ]
    }
  ];

  problems.forEach(({ problem, solutions, tests }) => {
    describe(`Change Combinations (Combination Sum): ${problem}`, function () {
      solutions.forEach((solution, i) => {
        tests.forEach(test => {
          let t0 = performance.now();
          let results = solution.fn(...test.params);
          let t1 = performance.now();
          let timing = t1 - t0;
          it(`Solution ${i + 1} works for ${test.expectation} using ${solution.description} (timing: ${timing} ms)`, function () {
            expect(results).toEqual(test.expected_output)
          })
        })
      })
    })
  })

}