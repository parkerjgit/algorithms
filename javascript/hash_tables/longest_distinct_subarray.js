/* Write a program which takes as input an array an and returns indices of longest distinct (no duplicates) subarray

source: EPI 12.8 ()
*/

// find longest distinct subarray
function longestDistinctSubarray(arr) {

    // sliding window representing current and longest subarrays
    let curWindow = {left: 0, right: 0};
    let longestWindow = curWindow;

    // set of all items included in current subarray
    let curItems = new Set([arr[0]]);

    // map items to index of last time item was seen
    let lastSeen = {[arr[0]]: 0};

    // compute length of subarray (right index is inclusive)
    const windowSize = (window) => window.right - window.left + 1;

    arr.forEach((item, i) => {

        curWindow.right++;
        
        // item already in subarray
        if (curItems.has(item)) {
            curWindow.left = lastSeen[item] + 1;
            lastSeen[item] = i;

        // item not yet in current subarray
        } else {
            curItems.add(item);
            if (windowSize(curWindow) > windowSize(longestWindow)) {
                longestWindow = curWindow;
            }
        }
    })

    return Object.values(longestWindow);

}

// todo: test