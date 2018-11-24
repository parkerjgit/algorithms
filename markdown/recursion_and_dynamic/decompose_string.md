## Decompose String into words, i.e., the bedbathandbeyond problem.

### Problem

Given a dictionary, i.e., a set of strings, and a name, design and efficient algorithm 
that checks whether the name is the conscatenation of a sequence of dictionary works. 
If such a consatenation exists, return it . A dictionary word may appear more than once 
in the sequence.

source: EPI 16.7

### Boardwork (Design)

![](../../images/decomposestring-2.jpg)

### Analysis

Time: O(n^2) (Worst-case if no substring are prefixes)
Space: O(n^2) (Worst-case if all substrings are prefixes)

### Codework (Test)

Javascript implementation.

```javascript
function  isDecomposable(dict, str) {

    const prefixes = new Set();
    const _isPrefix = (str) => {

        // check if string is a word
        if (dict.hasOwnProperty(str)) 
            return true; 

        // try to split string into prefix + word:
        //          i
        // prefix | word
        for (let i = str.length - 1; i > 0; i--) {          
            if (prefixes.has(str.slice(0, i)) &&
                dict.hasOwnProperty(str.slice(i))) {
                    return true;
                } 
        }
        return false;
    }

    // pre-process string left to right
    [...Array(str.length).keys()].forEach(i => {
        let subStr = str.slice(0,i+1);
        if (_isPrefix(subStr)) {
            prefixes.add(subStr);
        }
    })

    // if string is decomposable, then the last
    // pass will have added it to the prefixes
    return prefixes.has(str);
}
```
(see [decomposestring.js](../../javascript/recursion_and_dynamic/decompose_string.js))

<script src="https://raw.githubusercontent.com/parkerjgit/algorithms/master/javascript/recursion_and_dynamic/decompose_string.js"></script>