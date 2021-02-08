/*
Warm up problem set for arrays
*/

const problems = [ 
    {
        problem: `Fill an array with letters of alphabet.`,
        solutions: [

            // prefered:
            () => [...Array(26).keys()].map(x => String.fromCharCode(x + 'a'.charCodeAt(0))),
        
            // other solutions:
            () => [...Array(26).keys()].map(x => String.fromCharCode(x + 97)),
            () => [...Array(36).keys()].splice(10).map(i=>i.toString(36)),
            () => [...Array(26).keys()].map( _ => (++i).toString(36), i=9)
        ],
        tests: [
            {
                expectation: 'returns an array containing the letters of the alphabet when no parameters are passed.',
                params: [],
                expected_output: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            }
        ]
    },
    {
        problem: `Fill an array with an integer range from start (inclusive) to end (exclusive)`,
        solutions: [

            // prefered:
            (start, end) => [...Array(end).keys()].slice(start),

        ],
        tests: [
            {
                expectation: 'returns correct range when valid start and end parameters are passed.',
                params: [5, 10],
                expected_output: [5,6,7,8,9]
            }
        ]
    },
    {
        problem: `Fill an array with an integer range from start (inclusive) to end (exclusive) every step`,
        solutions: [

            // using modulo:
            (start, end, step) => [...Array(end).keys()].slice(start).filter(x => (x-start) % step == 0),

            // using generator:
            (start, end, step) => {
                function* range(start, end, step) {
                    for (let i = start; i < end; i += step) 
                        yield i;
                }
                return [...range(start, end, step)];
            },

        ],
        tests: [
            {
                expectation: 'can count by 2',
                params: [5, 10, 2],
                expected_output: [5,7,9]
            },
            {
                expectation: 'can count by 10',
                params: [5, 50, 10],
                expected_output: [5,15,25,35,45]
            }
        ]
    }
];

// Test

problems.forEach(({problem, solutions, tests}) => {
    describe(`Warm-up: ${problem}`, function() {
        solutions.forEach((fut, i) => {
            tests.forEach(test => {
                let t0 = performance.now();
                let results = fut(...test.params);
                let t1 = performance.now();
                it(`Solution ${i} ${test.expectation} (timing: ${t1 - t0} ms)`, function() {
                    expect(results).toEqual(test.expected_output)
                })
            })
        })
    })
})
