/*
xxx

source: EPI 16.6
*/

function maxKnapsackValue (clocks, weightCapacity) {

    function _maxVal(items, capacity, idx) {

        if (capacity <= 0) return 0
        if (idx >= items.length) return 0

        let cur = items[idx];
        console.log(cur)

        // calc max values that result from including current item 
        // and excluding it, and return the max of the two.
        let include = (cur.weight <= capacity)
            ? cur.value + _maxVal(items, capacity - cur.weight, idx + 1)
            : 0
        let exclude = _maxVal(items, capacity, idx + 1)

        return Math.max(include, exclude);
    }
    return _maxVal(clocks, weightCapacity, 0);
}

// test
describe('maxKnapsackValue', function(){
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
        expect(maxKnapsackValue(this.clocks, 130)).toEqual(695)
    })
})