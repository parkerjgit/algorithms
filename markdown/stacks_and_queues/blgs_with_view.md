## Buildings with a View

### Problem

Given a series of blgs lthat have windowns acing west. The blgs are in a 
straight line, and any blgs withichis to the east of a blgs of equal or 
greater height cannot view the sunset. Design a na algorithm that processes 
blgs in east-to-west order and returns the set of blgs which view the sunset. 
Each blg is specified by height.

source: EPI 8.5 (Compute Buildings with a sunset)

### Boardwork (Design)

![](../../images/blgs_with_view.jpg)

### Analysis

In-place solution overwrites input array front-to-back, using front of array as a stack.

Time: O(n)
Space: O(1)

### Codework (Test)

Javascript implementation of in-place solution.

```javascript
function blgsWithView(blgs) {

    // index of top of stack
    let top = 0;

    blgs.forEach( blg => {
        while( top > 0 && blg >= blgs[top] ) {
            // pop stack
            top--;
        }
        // push onto stack
        blgs[top] = blg;
        top++;
    })

    // don't slice for O(1) in-place
    return blgs.slice(0, top)
}
```
(from [blgs_with_view.js](../../javascript/stacks_and_queues/blgs_with_view.js))