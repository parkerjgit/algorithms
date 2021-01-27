## Convert a string to an integer

### Problem

Convert a string representation of an integer into an integer, for example:

"one" => 1
"twenty" => 20
"two hundred forty-six" => 246
"seven hundred eighty-three thousand nine hundred and nineteen" => 783919

Notes:

The minimum number supported is "zero". The maximum number, supported is 1 million (inclusively). The "and" in e.g. "one hundred and twenty-four" is optional.

source: parseInt() reloaded (codewars)
https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/solutions/javascript

### Boardwork (Design)

![](../../images/xxx.jpg)

### Analysis

Time: O(x)
Space: O(x)

### Codework (Test)

Javascript implementation.

```javascript
function parseInt(str) {

    // 1. split by spaces and hyphens
    return str.split(/ |-/)
        .filter(w => !['and'].includes(w))
        .reduce(function(result, word) {

        // 2. if cardinal, e.g., "one", "two", then add to result
        if (CARDINAL[word]) {
            result += CARDINAL[word];
        }

        // 3. if multiplier, e.g., "hundred", then multiply result (plus some magic)
        if (MULTIPLIER[word]) {
            result += MULTIPLIER[word] * (result % MULTIPLIER[word]) - (result % MULTIPLIER[word]);
        }

        return result;
    }, 0);
}
```
(from [convert_string_to_in.js](../../javascript/arrays_and_strings/convert_string_to_int.js))