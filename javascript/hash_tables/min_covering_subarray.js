/*
xxx

source: EPI xxx
*/

function minCoveringSubarr(arr, set) {
    let [left, right] = [-1, -1],
        [start, end] = [-Infinity, Infinity];

    const hash = new Map(
        [...set].map(word => [word, 0])
    );

    const setCovered = () => 
        [...hash].map(([,cnt]) => cnt > 0)
            .every(x => x)
    const moreToTry = () => right < arr.length - 1;
    const minSoFar = () => (right - left) < (end - start);

    const expandRight = () => {
        while (!setCovered() && moreToTry()) {
            right++;
            if (set.has(arr[right])) {
                let word = arr[right];
                let cnt = hash.get(arr[right]);
                hash.set(word, ++cnt)
            }
        }
    }
    const shrinkLeft = () => {
        while (setCovered()) {
            left++;
            if (set.has(arr[left])) {
                let word = arr[left];
                let cnt = hash.get(arr[left]);
                hash.set(word, --cnt)
            }
        }
    }
    
    while (setCovered() || moreToTry()) {
        
        // slinky
        expandRight();
        shrinkLeft();
        
        // at this point left has been processed 
        // (removed from hash), so setCovered is false,
        // even though window (left to right inclusive)
        // still covers the set, so minSoFar can correctly
        // calculate the window size.

        if (minSoFar()) {
            [start, end] = [left, right];
        }
    }

    // return min covering subarr
    return (end - start !== Infinity)
        ? [start, end] 
        : [-1, -1];
}

// test tbd...
describe('minCoveringSubarr', ()=>{
    it('finds min covering subarray', ()=>{
        let arr = ['apple', 'banana', 'apple', 'apple', 'dog', 'dog', 'apple', 'dog', 'banana', 'dog', 'apple', 'cat', 'dog'];
        let set = new Set(['banana', 'cat'])
        expect(minCoveringSubarr(arr, set)).toEqual([8,11]);
    })
})