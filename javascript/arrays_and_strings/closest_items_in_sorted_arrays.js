/*
Given three sorted arrays, return one entry from each array, such that the minimum interval covering these three entries is as small as possible.

source: Find the closest entries in three sorted arrays (EPI 14.6)
*/

const isNonOverlapping = (arrays) => arrays.every((_, i) => {
    if (i == arrays.length - 1) {
        return true
    } else {
        let [lastEntryOfCur, firstEntryOfNext] = [arrays[i][arrays[i].length-1], arrays[i+1][0]];
        return (lastEntryOfCur < firstEntryOfNext)
    }
}); 

const getIntervalSize = (ids) => {
    return Math.max(...ids) - Math.min(...ids);
}

// done when all entries have been visited.
const canAdvance = (indices) => {
    return indices.some((idx, i) => idx < arrays[i].length - 1);
};

// advance the first minimum entry
const advanceMin = (indices, arrays) => {
    let values = indices.map((idx, i) => arrays[i][idx]);
    let entries = indices.map((idx, i) => [id, arrays[i][idx]]);
    let minVal = Math.min(values);
    let isAdvanced = false;
    return entries.map(([idx, val]) => {
        if (val === minVal) {
            isAdvanced = true;
            return idx + 1;
        } else {
            return idx
        }
    })
}

// map condition to strategy
const handleDefault = (arrays) => {
    let triple = [0,0,0],
        minIntervalSize = getIntervalSize(triple),
        minIndices = triple;

    while (canAdvance(triple)) {

        // advance the min entry in current triple
        triple = advanceMin(triple, arrays);

        // update min-so-far
        let intervalSize = getIntervalSize(triple);
        if (getIntervalSize(triple) < minIntervalSize) {
            minIntervalSize = intervalSize;
            minIndices = triple;
        } 
    }

    return minIndices;
}

function closestItems(...arrays) {

    // sort arrays
    sortedArrays = arrays.sort((a,b) => a[0] - b[0]);

    if (isNonOverlapping(sortedArrays)) {
        // use default for now
        return handleDefault(sortedArrays);
    } else {
        return handleDefault(sortedArrays);
    }

}