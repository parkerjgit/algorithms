/*
Warm up problem set for arrays
*/
{

  const identity = (x) => x;
  const identityFactory = (x) => () => x;
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const curry = (fn, a) => (b) => fn(a,b);
  const lift = (fn) => (a) => (b) => fn(a, b)


  // Test

  const problems = [
    {
      problem: `Write an identity function that takes an argument and returns that argument.`,
      solutions: {identity},
      tests: {
        identity: [{
          expectation: 'can take an integer and return that integer',
          procedure: identity,
          params: [3],
          expected_output: 3
        }]
      }
    },
    {
      problem: `Write three binary functions, add , sub, and mul, that take two numbers and return their sum, difference, and product.`,
      solutions: {add, sub, mul},
      tests: {
        add: [{
          expectation: 'returns sum of two numbers',
          procedure: add,
          params: [3, 9],
          expected_output: 12
        }],
        sub: [{
          expectation: 'returns difference of two numbers',
          procedure: sub,
          params: [8, 5],
          expected_output: 3
        }],
        mul: [{
          expectation: 'returns product of two numbers',
          procedure: mul,
          params: [6, 7],
          expected_output: 42
        }],
      }
    },
    {
      problem: `Write a function that takes an argument and returns a function that returns that argument, i.e., identity function factory`,
      solutions: {identityFactory},
      tests: {
        identityFactory: [{
          expectation: 'can take an integer and returns a function that returns that integer',
          procedure: (x) => identityFactory(x)(),
          params: [3],
          expected_output: 3
        }]
      }
    },
    {
      problem: `Write a function curry that takes a binary function and an argument, and returns a function that can take a second argument`,
      solutions: {curry},
      tests: {
        curry: [{
          expectation: 'can take a binary function and the first argument, and return a function that can take the second argument',
          procedure: (fn, a, b) => curry(fn, a)(b),
          params: [mul, 5, 6],
          expected_output: 30
        }]
      }
    },
    {
      problem: `Write a function liftf that takes a binary function, and makes it callable with two invocations`,
      solutions: {lift},
      tests: {
        lift: [{
          expectation: 'can take a binary function, and makes it callable with two invocations',
          procedure: (fn,a,b) => lift(fn)(a)(b),
          params: [mul, 5, 6],
          expected_output: 30
        }]
      }
    },
    // {
    //   problem: `xxx`,
    //   solutions: {fn},
    //   tests: {
    //     fn: [{
    //       expectation: 'can xxx',
    //       procedure: fn,
    //       params: [3],
    //       expected_output: 3
    //     }]
    //   }
    // },

  ];

  problems.forEach(({ problem, solutions, tests }) => {
    describe(`Warm-up: ${problem}`, function () {
      Object.keys(tests).forEach((fut, i) => {
        tests[fut].forEach(test => {
          let t0 = performance.now();
          let results = test.procedure(...test.params);
          let t1 = performance.now();
          it(`${fut} ${test.expectation} (timing: ${t1 - t0} ms)`, function () {
            expect(results).toEqual(test.expected_output)
          })
        })
      })
    })
  })

}
