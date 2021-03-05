// //sorting objects
// let objects = [
//     {a: 1, b: 'asdf'},
//     {a: 10, b: 'asdf'},
//     {a: 3, b: 'asdf'},
//     {a: 5, b: 'asdf'},
//     {a: 6, b: 'asdf'}
// ]

// // 1. extract sortable
// let comp = (a,b) => a['a'] - b['a']

// // sort one array by another array 
// // can use a Schwartzian transform also known as Decorate-Sort-Undecorate (DSU) in python.

// clickCount = [5,2,4,3,1];
// imgUrl     = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];

// imgUrl
//     .map((url, i) => [url, clickCount[i]])
//     .sort((a,b) => a[1] - b[1])
//     .map((item) => item[1])

// imgUrl
//     .map((url, i) => ({url: url, 'clickCount': clickCount[i]}))
//     .sort((a, b) => a.clickCount - b.clickCount)
//     .map(item => item.imgUrl)

// // get transform then apply

// let listToSort = [3,6,6,3,4,5,7,3];
// let listToSortBy = [2,5,3,2,8,6,3,5];

// listToSort
//     .map((itemToSort, i) => ({
//         itemToSort: itemToSort, 
//         itemToSortBy: listToSortBy[i]
//     }))
//     .sort((a,b) => a.itemToSortBy - b.itemToSortBy)
//     .map(items => item.itemToSort)


/*
Warm up problem set for arrays
*/

const problems = [ 
    {
        problem: `Sort an array of objects by a property`,
        solutions: [
            {
                description: 'native sort with a compare function',
                function: (objects, sortProp, compareFunction = (a, b) => a - b) => {
                    return objects.sort((a, b) => compareFunction(a[sortProp], b[sortProp]))
                }
            },
        ],
        tests: [
            {
                expectation: 'sorts people by height',
                params: [[{name: 'a', height: 4.2}, {name: 'b', height: 3.5}, {name: 'c', height: 4}], 'height'],
                expected_output: [{name: 'b', height: 3.5}, {name: 'c', height: 4}, {name: 'a', height: 4.2}]
            }
        ]
    },
    {
        problem: `Sort one array by another array`,
        solutions: [
            {
                description: 'Schwartzian transform, i.e., Decorate-Sort-Undecorate (DSU)',
                function: (itemsToSort, valuesToSortBy, compareFunction = (a, b) => a - b) => {
                    return itemsToSort
                        .map((item, i) => ({ item: item, value: valuesToSortBy[i] })) // creates new arr, and returns it
                        .sort((a, b) => compareFunction(a.value, b.value))            // sorts new arr in-place and returns ref
                        .map(tempObj => tempObj.item)                                 // creates another arr, and returns it
                }
            }
        ],
        tests: [
            {
                expectation: 'sorts people by height',
                params: [['jane', 'john', 'amy'], [4.2, 3.5, 6.2]],
                expected_output: ['john', 'jane', 'amy']
            }
        ]
    }
];

// Test

problems.forEach(({problem, solutions, tests}) => {
    describe(`Warm-up: ${problem}`, function() {
        solutions.forEach((solution, i) => {
            tests.forEach(test => {
                it(`Solution ${i+1} ${test.expectation} using ${solution.description}`, function() {
                    expect(solution.function(...test.params)).toEqual(test.expected_output)
                })
            })
        })
    })
})