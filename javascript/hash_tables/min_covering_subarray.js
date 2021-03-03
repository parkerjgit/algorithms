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


// function minCoveringSubarr(arr, set) {

//     const isSetCovered = (left, right) {...}

//     if (!isSetCovered(0, arr.length))
//       return -1

//     let sub = {left: 0, right: 1};                                      // current subarray
//     let minSub = {left: 0, right: arr.length};                          // min subarray so far

//     while (sub.right < arr.length) {

//       if (isSetCovered(sub.left, sub.right)) {                          // set is covered!
//         minSub = (sub.right - sub.left < minSub.right - minSub.left)
//           ? {...sub}
//           : minSub;
//         sub.left++;

//       } else {                                                          // set not covered
//         sub.right++
//       }
//     }

//     return [minSub.left, minSub.right];
//   }


function minCoveringSubarr2(arr, targetSet) {

    // return true if target set is covered by input array
    const isFullArrCovering = () => {
      let tempSet = new Set([...targetSet]);
      for (let i = 0; i < arr.length; i++) {
        tempSet.delete(arr[i]); // noop if not in set
        if (tempSet.size === 0) {
          return true;
        }
      }
      return false;
    };

    if (!isFullArrCovering()) {
        return -1;
    }

    // constructor for an indexed subarr that counts its elements and keeps track of missing items from target set
    function SetCoveringSubArray(arr, targetSet) {
        return {
            left: 0,
            right: 0,
            _arr: arr, // ref
            _counts: new Map(), // todo: only need to count items in set, so why not init counts to zero and do nothing for items not in counts!
            _missing: new Set([...targetSet]),
            expand() {
                let itemToAdd = this._arr[this.right];
                this._counts.set(itemToAdd, (this._counts.has(itemToAdd) ? this._counts.get(itemToAdd) + 1 : 1));
                if (this._counts.get(itemToAdd) === 1) { // added an item that was missing, its no longer missing
                    this._missing.delete(itemToAdd);
                }
                this.right++;
            },
            shrink() {
                let itemToRemove = this._arr[this.left];
                this._counts.set(itemToRemove, this._counts.get(itemToRemove) - 1)
                if (this._counts.get(itemToRemove) === 0) { // removed last one, its now missing again
                    this._missing.add(itemToRemove);
                }
                this.left++;
            },
            isCovering() {
                return this._missing.size === 0;
            },
            size() {
                return this.right - this.left;
            }
        }
    }

    let sub = new SetCoveringSubArray(arr, targetSet);                  // current subarray
    let minSub = {left: 0, right: arr.length};                          // min subarray so far

    while (sub.right < arr.length) {
      if (sub.isCovering()) {                                           // set is covered!
        minSub = (sub.size() < minSub.right - minSub.left)
            ? {left: sub.left, right: sub.right}
            : minSub;
        sub.shrink();
      } else {                                                          // set not covered
        sub.expand();
      }
    }

    return [minSub.left, minSub.right];
}

function minCoveringSubarr3(arr, targetSet) {

    // return true if target set is covered by input array
    const isFullArrCovering = () => {
      let tempSet = new Set([...targetSet]);
      for (let i = 0; i < arr.length; i++) {
        tempSet.delete(arr[i]); // noop if not in set
        if (tempSet.size === 0) {
          return true;
        }
      }
      return false;
    };

    if (!isFullArrCovering()) {
        return -1;
    }

    const counts = new Map([...targetSet].map(word => [word, 0]));
    const missing = new Set([...targetSet]);
    const isCovering = () => missing.size === 0;

    let sub = {left: 0, right: 0};                  // current subarray
    let minSub = {left: 0, right: arr.length};      // min subarray so far

    const expand = () => {
        let itemToAdd = arr[sub.right++];

        // increment count for added item
        counts.set(itemToAdd, counts.get(itemToAdd) + 1);

        // if added an item that was missing, its no longer missing
        if (counts.get(itemToAdd) === 1) {
            missing.delete(itemToAdd);
        }

        // sub.right++;
    }

    const shrink = () => {
        let itemToRemove = arr[sub.left++];

        // decrement count for removed item
        counts.set(itemToRemove, counts.get(itemToRemove) - 1)

        // if removed last item, its now missing again
        if (counts.get(itemToRemove) === 0) {
            missing.add(itemToRemove);
        }

        // sub.left++;
    }

    while (sub.right < arr.length) {
      if (isCovering()) {
        minSub = (sub.right - sub.left < minSub.right - minSub.left)
            ? {left: sub.left, right: sub.right}
            : minSub;
        shrink(); // left++
      } else {
        expand(); // right++
      }
    }

    return [minSub.left, minSub.right];
}

// test tbd...
describe('minCoveringSubarr', ()=>{
    it('finds min covering subarray', ()=>{
        let arr = ['apple', 'banana', 'apple', 'apple', 'dog', 'dog', 'apple', 'dog', 'banana', 'dog', 'apple', 'cat', 'dog'];
        let set = new Set(['banana', 'cat'])
        expect(minCoveringSubarr3(arr, set)).toEqual([8,12]);
    })
})
