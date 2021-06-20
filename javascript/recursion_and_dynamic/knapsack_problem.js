/*
xxx

source: EPI 16.6
*/

// exponential-time recursive solution
function knapsack(items, capacity) {
 
    function _maxVal(items, capacity, idx) {

        // make sure room left AND items remaining
        if (capacity <= 0) return 0
        if (idx >= items.length) return 0

        // include current item or don't
        let cur = items[idx];
        let include = (cur.weight <= capacity)
            ? cur.value + _maxVal(items, capacity - cur.weight, idx + 1)
            : 0
        let exclude = _maxVal(items, capacity, idx + 1)

        // take winner
        return Math.max(include, exclude);
    }
    return _maxVal(items, capacity, 0);
}

// memoized solution - O(cn) ~ quadradic for capacity(c) -> item count, ~ linear for small capacity
function knapsack2(items, capacity) {

    // initialize memo table of size: integer capacity x item count
    let memo = [...Array(capacity + 1)].map(_ => [...Array(items.length)])
 
    function _maxVal(capacity, idx) {

        // make sure room left AND items remaining
        if (capacity <= 0) return 0
        if (idx >= items.length) return 0

        let cur = items[idx];

        // memoization (could also pre-calculate memo table first)
        if ((cur.weight <= capacity) && !memo[capacity - cur.weight][idx])
            memo[capacity - cur.weight][idx + 1] = _maxVal(capacity - cur.weight, idx + 1)
        if (!memo[capacity][idx + 1])
            memo[capacity][idx + 1] = _maxVal(capacity, idx + 1)

        // include current item or don't
        let include = (cur.weight <= capacity)
            ? cur.value + memo[capacity - cur.weight][idx + 1]
            : 0
        let exclude = memo[capacity][idx + 1]

        // take winner
        return Math.max(include, exclude);
    }
    return _maxVal(capacity, 0);
}



// exponential bitwise solution with constant O(1) space complexity for < 32 items
function knapsack3(items, capacity) {

    // encode subsets as bit mask (must be < 32 items!)
    let subsetMask = 1 << items.length;

    let maxSoFar = 0;
    while(subsetMask > 0) {
        subsetMask--;
        let subsetInfo = getSubsetInfo(items, subsetMask);
        if (subsetInfo.weight <= capacity) {
            maxSoFar = Math.max(maxSoFar, subsetInfo.value);
        }   
    }
    return maxSoFar;
}
function getSubsetInfo(items, mask) {
    let weight = 0;
    let value = 0;
    let i = items.length - 1;
    while (mask > 0) {
        if (mask & 1) {
            weight += items[i].weight;
            value += items[i].value;
        }
        mask >>= 1;
        i--;
    }
    return {weight, value};
}

// test
describe('knapsack', function(){
    beforeEach(function() {
        this.clocks = [
            {weight: 20, value: 65},
            {weight: 8, value: 35},
            {weight: 60, value: 245},
            {weight: 55, value: 195},
            {weight: 40, value: 65},
            {weight: 70, value: 150},
            {weight: 85, value: 275},
            {weight: 25, value: 155},
            {weight: 30, value: 120},
            {weight: 65, value: 320},
            {weight: 75, value: 75},
            {weight: 10, value: 40},
            {weight: 95, value: 200},
            {weight: 50, value: 100},
            {weight: 40, value: 220},
            {weight: 10, value: 99},
        ]
    })
    it('calculates the max value of a subset of clocks without exceeding weight limit', function() {
        expect(knapsack2(this.clocks, 130)).toEqual(695)
    })
})
