function tests(label, problems) {
  problems.forEach(({ problem, solutions, tests }) => {
    describe(`${label}: ${problem}`, function () {
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
}

exports = {tests}
