// EPI 13.5 render a calendar

const flatten = (tuples) => {
    let res = [];
    tuples.forEach(tuple => {
        res.push(...tuple)
    })
    return res;
}

const argSort = (values) => {
    return [...Array(values.length).keys()].sort((i, j) => {
        return (values[i] === values[j]) 
            ? -1 // intervals that start and end at same point are NOT concurrent
            : values[i] - values[j];
    })
}

const flattenSortAndEncode = (tuples) => {
  
    // tuples, e.g.,    [[1,5],[6,10],[11,13],[14,15],[2,7],[8,9],[12,15],[4,5],[10,18]]
    // flattened        [ 1, 5, 6, 10, 11, 13, 14, 15, 2, 7, 8, 9, 12, 15, 4, 5, 10, 18]
    // sort permutation [ 0, 8, 14, 15, 1, 2, 9, 10, 11, 16, 3, 4, 12, 5, 6, 13, 7, 17 ]
    // sortted          [ 1, 2, 4, 5, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13, 14, 15, 15, 18]
    // encoded          [ 1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1]

    // get permutation corresponding to sortted order
    let perm = argSort(flatten(tuples));

    // apply permutation, and encoded as follows:
    // start of intervals  ->  1
    // end of intervals    -> -1
    let res = [];
    [...Array(perm.length).keys()].forEach(i => {
        res[i] = (perm[i] % 2 === 0) ? 1 : -1;
    })
    return res;
}

const maxConcurrentIntervals = (intervals) => {

    // flatten, sort and encode the interval values,
    let endPoints = flattenSortAndEncode(intervals);

    // find max concurrent intervals
    let count = 0;
    let maxConcurrent = 0;
    endPoints.forEach(pt => {   
        count += pt;      
        maxConcurrent = Math.max(maxConcurrent, count);
    });

    return maxConcurrent;
}

// test

describe('maxConcurrentIntervals', function() {
    it('correctly returns max number of concurrent intervals', function() {
        expect(maxConcurrentIntervals([[1,5],[6,10],[11,13],[14,15],[2,7],[8,9],[12,15],[4,5],[10,18]])).toEqual(3);
    })
})