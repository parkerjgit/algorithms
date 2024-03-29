/*
1. total number of ways to make change given unlimited supply of coins with given denominations

source: Counting Change Combinations (codewars) - https://www.codewars.com/kata/541af676b589989aed0009e7
*/

{

  // Solution 1: backtracking (by passing start index down)
  function countChange(change, denominations) {
    let count = 0;

    function combinationSum(target, startIndex) {
      if (target < 0) 
        return;
      
      if (target == 0)
        count += 1;
      
      for (let i = startIndex; i < denominations.length; i++) {
        combinationSum(target - denominations[i], i)
      }
    }

    combinationSum(change, 0);
    return count;
  }
  
  // Solution 2: backtracking (by slicing candidate array)
  function countChange2(change, denominations) {
    if(change < 0 || denominations.length === 0)
      return 0

    if(change === 0)
      return 1

    return countChange(change - denominations[0], denominations) + countChange(change, denominations.slice(1))
  }

  // tbd changeCombinationsFromDenominations(...)

  function changeCombinationsFromCoins(change, coins) {
    let results = [];
    coins.sort();
    
    function _comboSum(target, startIdx, candidate) {
        
        if (target < 0)
            return;
        
        if (target == 0) {
            results.push([...candidate]);
            return;
        }
        
        for (let i = startIdx; i < coins.length; i++) {
            
            // coins are sortted, so if candidate at i is same as prev, 
            // and previous not included this combination, then ignore it
            // to avoid duplicate combinations.
            if (i > startIdx && coins[i] == coins[i-1]) {
                continue;
            }
            
            candidate.push(coins[i]);
            _comboSum(target - coins[i], i + 1, candidate);
            candidate.pop();

                  
        }
    }
    
    _comboSum(change, 0, []);
    return results;
    
};

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
    },
    {
      problem: `Write a function that counts how many different ways you can make change for an amount of money, given an array of finite coins.`,
      solutions: [
        {
          description: 'backtracking (by passing start index down)',
          fn: changeCombinationsFromCoins
        },
      ],
      tests: [
        {
          expectation: 'simple case',
          params: [8, [10,1,2,7,6,1,5]],
          expected_output: [ [1,1,6], [1,2,5], [1,7], [2,6] ]
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