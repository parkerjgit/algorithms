{

  // function score_combinations(finalScore, increments) {

  //   let memo = {}; // remaining -> int repr. number of combos

  //   // returns number of combos
  //   function _combos(remaining) {

  //     let count = 0;

  //     // count increments that are equal to remaining
  //     let equalIncrement = increments.filter(increment => increment == remaining);
  //     if (equalIncrement) {
  //       count++;
  //       remaining -= equalIncrement;
  //     }

  //     // get increments that are less than remaining
  //     let viableIncrements = increments.filter(increment => increment < remaining);
  //     viableIncrements.forEach(incr => {
  //       count += _combos(remaining - incr);
  //     })

  //     return count;
  //   }

  //   return _combos(finalScore);
  // }

  function score_combinations(final, scoreIncrements) {

    let map = {};

    const isMultipleOf = (a, b) => a % b == 0;
    const hashFn = (args) => JSON.stringify(args);

    const reverseRange = (start, stop, step) => {
      let res = [];
      for (let i = start; i > stop; i -= step) {
        res.push(i);
      }
      return res;
    }

    const addToMap = (map, key, subkey, value) => {
      // console.log('map ', map)
      if (map.hasOwnProperty(key)) {
        map[key][subkey] = value;
      } else {
        map[key] = {[subkey]: value}
      }
    }

    const splice = (array, idx) => {
      // let idx = array.indexOf(itemToRemove);
      let res = [...array.slice(0,idx), ...array.slice(idx+1)];
      // console.log('array', array);
      // console.log('res', res);
      return res;
    }

    function _combos(remaining, increments) {

      if(increments.length == 1) {
        return isMultipleOf(remaining, increments[0]) ? 1 : 0;
      }

      if (map[remaining] && map[remaining].hasOwnProperty(hashFn(increments))) {
        return map[remaining][hashFn(increments)]
      }

      let targets = increments.map(increment => reverseRange(remaining - increment, 0, increment));

      console.log('targets: ', targets)

      let count = 0;
      // targets.forEach((targetArr, i) => {
        // console.log('targetArr: ', targetArr)
        targets[0].forEach(target => {
          // console.log('target: ', target)
          let incrementsRemaining = splice(increments, 0);
          if (map[target] && map[target].hasOwnProperty(hashFn(incrementsRemaining))) {
            count += map[target][hashFn(incrementsRemaining)]
          } else {
            addToMap(map, target, hashFn(incrementsRemaining), _combos(target, incrementsRemaining));
            count += map[target][hashFn(incrementsRemaining)];
          }
        })
        console.log('map: ', map)
      // })

      

      addToMap(map, remaining, hashFn(increments), count);
      return count;
    }

    return _combos(final, scoreIncrements)
  }

  function scoreCombinations(target, candidates) {

    let results = [], count = 0;
    
    function combinationSum(target, idx, cur) {

      if (target < 0) {
        return;
      }

      if (target == 0) {
        results.push([...cur]);
        count++;
      }

      for (let i = idx; i < candidates.length; i++) {
        cur.push(candidates[i]);
        combinationSum(target - candidates[i], i, cur);
        cur.pop();
      }
    }

    combinationSum(target, 0, []);
    return count;
  }

  const problems = [
    {
      problem: `Write function that take final score and scores for possible plays and return number of combinations of scores that result in final score`,
      solutions: [
        {
          description: 'backtracking and passing index down',
          fn: scoreCombinations
        },
      ],
      tests: [
        {
          expectation: 'simple case',
          params: [12, [2,3,7]],
          expected_output: 4
        },
      ]
    }
  ];

  // Test

  problems.forEach(({ problem, solutions, tests }) => {
    describe(`Score Combinations (combination sum): ${problem}`, function () {
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