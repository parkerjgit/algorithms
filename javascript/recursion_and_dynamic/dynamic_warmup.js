
// memo function for single arg
const memoize = (fn) => {
  let hash = {};
  return (arg) => {
    if(!hash.hasOwnProperty(arg)) {
      hash[arg] = fn(arg); // this will not improve timing!
    }
    return hash[arg];
  }
}

const problems = [
  {
    problem: `Find nth number in fibonacci sequence`,
    solutions: [
      {
        description: 'top-down recursion without memoization',
        fn: function fib(n) {
          return (n < 2) 
            ? n
            : fib(n-2) + fib(n-1);
        }
      },
      {
        description: 'top-down recursion with inline memoization',
        fn: function fib(n) {
          const memo = {0: 0, 1: 1};
          function _fib(n) {
            if(!memo.hasOwnProperty(n)) {
              memo[n] = _fib(n-2) + _fib(n-1);
            }
            return memo[n];
          }
          return _fib(n);
        }
      },
      {
        description: 'top-down recursion with memoization function',
        fn: function(n) {
          return memoize(function fib(n) {
            return (n < 2) 
              ? n
              : fib(n-2) + fib(n-1);
          })(n)
        }
      },
      {
        description: 'preprocessing & reusing cache (functional)',
        fn: (n) => [...Array(n-1)]
          .reduce(([minus2, minus1], _) => [
            minus1,
            minus1 + minus2
          ], [0,1])[1]
      },
      {
        description: 'preprocessing & reusing cache (imperative)',
        fn: (n) => {
          let memo = [0,1];
          for (let i = 2; i <= n; i++) {
            memo = [ memo[1], memo[0] + memo[1] ];
          }
          return memo[1];
        }
      },
    ],
    tests: [
      {
        expectation: 'return nth number in fibonacci sequence for n = 10',
        params: [10],
        expected_output: 55
      },
      {
        expectation: 'return nth number in fibonacci sequence for n = 40',
        params: [30],
        expected_output: 832040 
      }
    ]
  }
];

// Test

problems.forEach(({ problem, solutions, tests }) => {
  describe(`Warm-up: ${problem}`, function () {
    solutions.forEach((solution, i) => {
      tests.forEach(test => {
        let t0 = performance.now();
        let results = solution.fn(...test.params);
        let t1 = performance.now();
        let timing = t1 - t0;
        it(`Solution ${i + 1} ${test.expectation} using ${solution.description} (timing: ${timing} ms)`, function () {
          expect(results).toEqual(test.expected_output)
        })
      })
    })
  })
})