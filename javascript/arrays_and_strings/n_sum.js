/*
2Sum, 3Sum, and NSum...
*/
{

  const problems = [
    {
      problem: `Find all pairs that sum to a given value`,
      solutions: [
        {
          description: 'forEach loop',
          function: (arr, target) => {
            let res = [],
                history = new Map(); // element -> idx

            arr.forEach((el, idx) => {
              let complement = target - el;
              if(history.has(complement)) {
                res.push([history.get(complement), idx])
              }
              history.set(el, idx);
            })

            return res;
          }
        },
      ],
      tests: [
        {
          expectation: 'finds all pairs that sum to 24 for small input',
          params: [[12, 3, 4, 1, 6, 9, 6, 8, 0], 12],
          expected_output: [ [ 1, 5 ], [ 4, 6 ], [ 2, 7 ], [ 0, 8 ] ]
        }
      ]
    },
    {
      problem: `Find all triplets that sum to a given value`,
      solutions: [
        {
          description: 'for loop',
          function: (arr, target) => {
            let res = [];
            for (let i = 0; i < arr.length; i++) {
              let history = new Map();
              for (let j = i + 1; j < arr.length; j++) {
                let complement = target - arr[i] - arr[j];
                if (history.has(complement)) {
                  res.push([i, history.get(complement), j])
                }
                history.set(arr[j], j);
              }
            }
            return res;
          }
        },
      ],
      tests: [
        {
          expectation: 'finds all triplets that sum to 24 for small input',
          params: [[12, 3, 4, 1, 6, 9, 6], 24],
          expected_output: [ [ 0, 1, 5 ], [ 0, 4, 6 ] ]
        },
        {
          expectation: 'finds all triplets that sum to 24 for large input',
          params: [[12, 3, 4, 1, 6, 9, 6, 12, 3, 4, 1, 6, 9, 6, 12, 3, 4, 1, 6, 9, 6, 12, 3], 24],
          expected_output: [ [ 0, 1, 5 ], [ 0, 4, 6 ], [ 0, 5, 8 ], [ 0, 6, 11 ], [ 0, 8, 12 ], [ 0, 11, 13 ], [ 0, 12, 15 ], [ 0, 13, 18 ], [ 0, 15, 19 ], [ 0, 18, 20 ], [ 0, 19, 22 ], [ 1, 5, 7 ], [ 1, 7, 12 ], [ 1, 12, 14 ], [ 1, 14, 19 ], [ 1, 19, 21 ], [ 4, 6, 7 ], [ 4, 7, 11 ], [ 4, 5, 12 ], [ 4, 7, 13 ], [ 4, 13, 14 ], [ 4, 14, 18 ], [ 4, 12, 19 ], [ 4, 14, 20 ], [ 4, 20, 21 ], [ 5, 7, 8 ], [ 5, 11, 12 ], [ 5, 12, 13 ], [ 5, 8, 14 ], [ 5, 14, 15 ], [ 5, 12, 18 ], [ 5, 18, 19 ], [ 5, 19, 20 ], [ 5, 15, 21 ], [ 5, 21, 22 ], [ 6, 7, 11 ], [ 6, 7, 13 ], [ 6, 13, 14 ], [ 6, 14, 18 ], [ 6, 12, 19 ], [ 6, 14, 20 ], [ 6, 20, 21 ], [ 7, 8, 12 ], [ 7, 11, 13 ], [ 7, 12, 15 ], [ 7, 13, 18 ], [ 7, 15, 19 ], [ 7, 18, 20 ], [ 7, 19, 22 ], [ 8, 12, 14 ], [ 8, 14, 19 ], [ 8, 19, 21 ], [ 11, 13, 14 ], [ 11, 14, 18 ], [ 11, 12, 19 ], [ 11, 14, 20 ], [ 11, 20, 21 ], [ 12, 14, 15 ], [ 12, 18, 19 ], [ 12, 19, 20 ], [ 12, 15, 21 ], [ 12, 21, 22 ], [ 13, 14, 18 ], [ 13, 14, 20 ], [ 13, 20, 21 ], [ 14, 15, 19 ], [ 14, 18, 20 ], [ 14, 19, 22 ], [ 15, 19, 21 ], [ 18, 20, 21 ], [ 19, 21, 22 ] ]
        }
      ]
    },
  ];

  // Test

  problems.forEach(({ problem, solutions, tests }) => {
    describe(`Problem: ${problem}`, function () {
      solutions.forEach((solution, i) => {
        tests.forEach(test => {
          it(`Solution ${i + 1} ${test.expectation} using ${solution.description}`, function () {
            expect(solution.function(...test.params)).toEqual(test.expected_output)
          })
        })
      })
    })
  })

}
