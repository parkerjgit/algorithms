/*
You have an array with up to 100,000 numbers. Write a function to determine how many fragments
have a sum of zero. A fragment is any number of sequential numbers in the array. For example
the array [2, 4, 1] has 6 fragments: (2), (2, 4), (2, 4, 1), (4), (4, 1), and (1). If the array
contains over 100,000 sum zero fragments you should return -1.
*/


const countSumZero = arr => {

    // Key insight: substrings between elements (inclusively) with the same running sum have a zero sum!
    // Every time we see a running sum that we have already seen increment zero sum count by the number
    // of times we have already seen it.

    let zeroSumCount = 0,
        runSum = 0;

    // initialize zero run sum count to 1, because the next time we see a zero run sum, we want to count it.
    let runSumCounts = new Map([[0, 1]]);

    arr.forEach(val => {

        // update running sum
        runSum += val;

        if (runSumCounts.has(runSum)) {

            // We have seen this sum before, get number of times seen so far
            let count = runSumCounts.get(runSum);

            // increment zero sum count by the number of times we've seen it
            zeroSumCount += count;

            // increment run sum count by 1
            runSumCounts.set(runSum, count + 1)

        } else { // New running sum

            // init run sum count
            runSumCounts.set(runSum, 1)
        }

    })

    return zeroSumCount;
}

describe('countSumZero', function() {
    it('counts zero sums correctly', function() {
        expect(countSumZero([])).toEqual(0)
        expect(countSumZero([0])).toEqual(1)
        expect(countSumZero([0,0])).toEqual(3)
        expect(countSumZero([0,0,0])).toEqual(6)
        expect(countSumZero([-5])).toEqual(0)
        expect(countSumZero([-5,1,2,-3])).toEqual(1)
        expect(countSumZero([-5,1,2,-3,4,-2,-2,2,3])).toEqual(5)
        expect(countSumZero([-5,1,2,-3,4,-2,-2,2,3,0])).toEqual(7)
    })
})
