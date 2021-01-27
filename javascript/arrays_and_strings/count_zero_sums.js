/*
You have an array with up to 100,000 numbers. Write a function to determine how many fragments 
have a sum of zero. A fragment is any number of sequential numbers in the array. For example 
the array [2, 4, 1] has 6 fragments: (2), (2, 4), (2, 4, 1), (4), (4, 1), and (1). If the array 
contains over 100,000 sum zero fragments you should return -1.
*/

const countSumZero = arr => {
    let count = 0,
        sum = 0,            // current sum
        sums = {'0': 1};    // sums seen so far

    arr.forEach(el => {
        sum += el ; 
        if (sums[sum]) 
            count += sums[sum];
        sums[sum] = sums[sum] ? ++sums[sum] : 1;
    })

return count;
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
