/*
xxx

source: EPI 16.6
*/

function knapsack(items, capacity) {
 
    function _maxVal(items, capacity, idx) {

        if (capacity <= 0) return 0
        if (idx >= items.length) return 0

        // calc max values that results from including current item 
        // and excluding it, and return the max of the two.
        let cur = items[idx];
        let include = (cur.weight <= capacity)
            ? cur.value + _maxVal(items, capacity - cur.weight, idx + 1)
            : 0
        let exclude = _maxVal(items, capacity, idx + 1)

        return Math.max(include, exclude);
    }
    return _maxVal(items, capacity, 0);
}

// brute-force O(n^2) solution using bit-mask
function knapsack2(items, capacity) {
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
        expect(knapsack(this.clocks, 130)).toEqual(695)
    })
})
describe('knapsack2', function(){
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