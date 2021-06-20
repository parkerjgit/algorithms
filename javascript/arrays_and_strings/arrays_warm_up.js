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
    },
    {
        problem: `Transform every element of an array`,
        solutions: [
            (arr, fn) => arr.map(fn)
        ],
        tests: [
            {
                expectation: 'returns an array of equal size with each element transformed by input function',
                params: [[1,2,3,4,5,6,7,8], x=>x+1],
                expected_output: [2,3,4,5,6,7,8,9]
            }
        ]
    },
    {
        problem: `Transform every third element of an array`,
        solutions: [
            (arr, fn) => arr.map((el,i) => i % 3 == 0 ? fn(el) : el)
        ],
        tests: [
            {
                expectation: 'returns an array of equal size with every third element transformed by input function',
                params: [[1,2,3,4,5,6,7,8], x=>x*10],
                expected_output: [10,2,3,40,5,6,70,8]
            }
        ]
    },
    {
        problem: `Process a sliding window of elements in an array`,
        solutions: [
            (arr, windowSize, fn) => {
                let [left, right] = [0, windowSize],
                    res = [];
                while (right < arr.length) {
                    res.push(fn(...arr.slice(left, right)));
                    left++;
                    right++;
                }
                return res;
            }
        ],
        tests: [
            {
                expectation: 'returns an array of results of passing items in sliding window to input function',
                params: [[1,2,3,4,5,6,7,8,9], 3, (...arr)=>arr.reduce((a,b)=>a+b,0)],
                expected_output: [ 6, 9, 12, 15, 18, 21 ]
            }
        ]
    },
    {
        problem: `process mirror elements in an array, e.g. to test for palindromicity`,
        solutions: [

            // [0, 1, 2, 3, 4]  (l = 5)     5//2 = 2
            // [0, 1, 2, 3]     (l = 4)     4//2 = 2
            // [0, 1, 2]        (l = 3)     3//2 = 1
            (arr, fn) => {
                let res = [];
                for (let i = 0; i < Math.floor(arr.length / 2); i++) {
                    res.push(fn(arr[i], arr[arr.length - 1 - i]))
                }
                return res;
            },

            (arr, fn) => {
                return arr.slice(0, Math.floor(arr.length/2))
                    .map((_, i) => [arr[i], arr[arr.length - 1 - i]])
                    .map(params => fn(...params))
            }
        ],
        tests: [
            {
                expectation: 'returns array of results of passing mirrored element pairs to input function',
                params: [[1,2,3,4,3,2,1], (a,b)=>a==b],
                expected_output: [true, true, true]
            }
        ]
    },
    // {
    //     problem: `<problem description>`,
    //     solutions: [
    //         // () => ...
    //     ],
    //     tests: [
    //         {
    //             expectation: '<test case expection>',
    //             params: [x, y],
    //             expected_output: z
    //         }
    //     ]
    // },
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
