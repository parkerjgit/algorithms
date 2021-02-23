/*
Warm up problem set for arrays
*/
{

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // this one
  const debounceTrailing = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            return fn(...args);
        }, delay)
    }
  }






// let debouceLeading2 = (fn, delay) => {
//   let timer,
//       ready = true;
//   return (...args) => {
//       if (ready) {
//           ready = false;
//           timer = setTimeout(() => {
//               ready = true;
//           }, delay)
//           return fn(...args);
//       } else {
//           clearTimeout(timer);
//           timer = setTimeout(() => {
//               ready = true;
//           }, delay)
//       }
//   }
// }

const debounceLeading3 = (fn, delay) => {
  let timer;
  return (...args) => {
      clearTimeout(timer);
      if (!timer) {
        fn(...args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, delay)
  }
}

const debouceLeading = (fn, delay) => {
  let timer,
      ready = true;
  return (...args) => {
      if (ready) {
          ready = false;
          timer = setTimeout(() => {
              ready = true;
          }, delay)
          return fn(...args);
      } else {
          clearTimeout(timer);
      }
  }
}

// this one
const debounceLeading4 = (fn, delay) => {
  let timer,
      ready = true;
  return (...args) => {
      clearTimeout(timer);
      if (ready) {
        fn(...args);
      }
      ready = false;
      timer = setTimeout(() => {
        ready = true;
      }, delay)
  }
}

const debounce2 = (fn, delay, leading=true) => {
  let timer;
  return (...args) => {

      // 1. stop timer if its going
      clearTimeout(timer);

      // 2. if leading, call fn if no timer (first call or timeout)
      if (leading && !timer) {
        fn(...args);
      }

      // 3. start/restart timer
      timer = setTimeout(() => {
        if (leading) {
          timer = null; // 5a. if leading, nullify timer
        } else {
          fn(...args); // 5b. if trailing, call fn
        }
      }, delay)
  }
}

const debounce3 = (fn, delay, leading=true) => {
  let timer,
      ready = leading; // only used if leading;

  return (...args) => {

      // 1. stop timer if its going
      clearTimeout(timer);

      // 2. if leading, call fn if ready (first call or timeout)
      if (leading && ready) {
        fn(...args);
      }

      // 3. start/restart timer
      let ready = false;
      timer = setTimeout(() => {
        if (leading) {
          ready = true; // 5a. if leading, nullify timer
        } else {
          fn(...args); // 5b. if trailing, call fn
        }
      }, delay)
  }
}

// throttle -> turn fn into fn that only fires at rate of once per some delay.
// for  Guaranteeing a constant flow of executions every X milliseconds. Like
// checking every 200ms your scroll position to trigger a CSS animation.
// see https://css-tricks.com/debouncing-throttling-explained-examples/
function throttle(fn, delay) {
  let lastCall = 0;
  return (...args) => {
      let now = (new Date).getTime();
      let elapsed = now - lastCall;
      if (elapsed >= delay) {
          lastCall = now;
          return fn(...args);
      }
  }
}

const throttleTrailing = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn(...args);

      // when function is called, reset timer, so subsequent call can restart timer
      timer = null;
    }, delay);
  }
}

// see https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc
const throttleLeading = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      return;
    }
    if (!timer) {
      fn(...args);
    }
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  }
}

// see https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc
const throttle = (fn, delay, leading) => {
  let timer;
  return (...args) => {

    if (timer) {
      return;
    }
    if (leading && !timer) {
      fn(...args);
    }
    timer = setTimeout(() => {
      if(!leading) {
        fn(...args);
      }
      timer = null;
    }, delay);
  }
}


  // Test

  const problems = [
    {
      problem: `Write a function that turns a fn into async fn that executes after some delay following the trailing end of a burst (debounce trailing)`,
      tests: {
        debouceLeading: [{
          expectation: 'can modify a function so that it executes the first call in a burst and ignores all subsequent calls',
          procedure: (fn, delay) => {
            let results = [];
            let push = debounceLeading4(fn(results), delay);
            return Promise.resolve(null)
              .then(() => push(1))
              .then(() => wait(delay))
              .then(() => push(2))
              .then(() => push(3))
              .then(() => wait(delay))
              .then(() => push(4))
              .then(() => push(5))
              .then(() => push(6))
              .then(() => wait(delay))
              .then(() => push(7))
              .then(() => wait(delay/2))
              .then(() => push(8))
              .then(() => wait(delay/2))
              .then(() => push(9))
              .then(() => wait(delay/2))
              .then(() => push(10))
              .then(() => {
                return results;
              })
          },
          params: [(arr)=>(x)=>arr.push(x), 100],
          expected_output: [1,2,4,7]
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
    describe(`Problem: ${problem}`, function () {
      Object.keys(tests).forEach(function(fut, i) {
        tests[fut].forEach(test => {
          // let t0 = performance.now();
          // let results = await test.procedure(...test.params);
          // let t1 = performance.now();
          // it(`${fut} ${test.expectation} `, async function() {
          //   let results = await test.procedure(...test.params);
          //   expect(results).toEqual(test.expected_output)
          // })
          it(`${fut} ${test.expectation} `, function(done) {
            test.procedure(...test.params).then(function(results) {
              expect(results).toEqual(test.expected_output);
              done();
            })
          })
        })
      })
    })
  })

}
