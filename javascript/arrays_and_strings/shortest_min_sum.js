/*
You have an array with up to 100,000 numbers. Write a function to determine how many fragments 
have a sum of zero. A fragment is any number of sequential numbers in the array. For example 
the array [2, 4, 1] has 6 fragments: (2), (2, 4), (2, 4, 1), (4), (4, 1), and (1). If the array 
contains over 100,000 sum zero fragments you should return -1.
*/


// const shortestMinSum2 = (arr, k) => {

//     let shortestSoFar = Infinity;

//     let memo = {};

//     const _shortest = (i, sum, len) => {

//         console.log(`sum: ${arr[i] + sum}`)

//         // 1a. new Sum
//         if (arr[i] >= k) return 1
//         if (i >= arr.length) return Infinity
//         if (sum < 0) return Infinity

//         // 1b. run Sum
//         if (sum + arr[i] >= k && len < shortestSoFar) 
//             shortestSoFar = len;
        
//         let sums = [shortestSoFar]
        

//         // 2.
//         // if (arr[i+1] >= k) return 1

//         // 3. 
//         if (sum === 0) {
//             memo[i+1] = arr[i+1];   
//             sums.push(_shortest(i+1, 0, 1));    
//         }

//         sum += arr[i]


//         if (len + 1 < shortestSoFar && sum >= 0) { // 
//             // console.log(`a: ${memo.hasOwnProperty(i+1)}`)
//             // console.log(`b: ${(sum + arr[i+1] > memo[i+1])}`)
//             if (memo.hasOwnProperty(i+1) && (sum + arr[i+1] > memo[i+1])) {
//                 memo[i+1] = sum + arr[i+1]
//                 sums.push(_shortest(i + 1, sum, len + 1));       
//             } 
//         } 

//         // console.log(sums[1])
//         shortestSoFar = Math.min(...sums);
//         // console.log(shortestSoFar)
        
//         return shortestSoFar;
//     }

//     let shortest = _shortest(0, 0, 1);
//     return isFinite(shortest) ? shortest : -1
// }

function shortestMinSum(arr, k) {

    let window = []
    let shortest = Infinity;
    let sums = Array(arr.length + 1).fill(0)
    arr.forEach((el,i) => sums[i + 1] = sums[i] + el)

    const _isMinSum = (sum) => 
        window.length && (sum - sums[window[0]] >= k)
    const _includesNeg = (sum) => 
        window.length && (sum <= sums[window[window.length-1]])
    const _shrinkLeft = (sum,i) => {
        while (_isMinSum(sum)) {
            shortest = Math.min(shortest, i - window.shift())
            // console.log(`${JSON.stringify(window)} - shrink left`)
        }}
    const _shrinkRight = (sum) => {
        while (_includesNeg(sum)) {
            window.pop()
            // console.log(`${JSON.stringify(window)} - shrink right`)
        }}

    sums.forEach((sum,i) => {
        _shrinkLeft(sum,i)       
        _shrinkRight(sum)
        window.push(i)
        // console.log(`${JSON.stringify(window)} - incr`);
    })

    return shortest
}


describe('shortestMinSum', function() {
    it('finds shortest min sum', function() {
        expect(shortestMinSum([2,-1,2], 3)).toEqual(3)
        expect(shortestMinSum([3,1,-2,2,1,3,-2,2,5,6,8,3,4,8,5,6,1,1,1,2,5,7,4,6], 22)).toEqual(4)
        expect(shortestMinSum([1,-2,3,14,-1,10,1], 27)).toEqual(5)
        expect(shortestMinSum([2,3,1,1,-1,6,4,3,3], 7)).toEqual(2)
    })
})