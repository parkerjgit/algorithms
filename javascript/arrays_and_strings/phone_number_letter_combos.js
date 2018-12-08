/*
Given a string containing digits from 2-9 inclusive, return all possible letter 
combinations that the number could represent. A mapping of digit to letters 
(just like on the telephone buttons) is given below. Note that 1 does not map 
to any letters.

E.G.

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

source: Letter Combinations of a Phone Number (leetcode)
https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
*/

let keyMap = ['','','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']

var letterCombinations = function(digits) {

    if (digits.length == 0)
        return ['']
    if (digits.length == 1){
        return keyMap[+digits].split('');
    }
    
    let result = [];
    let combos = letterCombinations(digits.slice(1));   // eg., ['ad','ae',...]
    
    keyMap[+digits[0]]          // eg., 'abc'
        .split('')              // eg., ['a','b','c']
        .forEach(letter => {
            result.push(...combos.map(combo => letter + combo))
    })
    
    return result;
}

function combine(arr1, arr2) {
    let result = [];
    arr1.forEach(a => {
        result.push(...arr2.map(b => a + b))
    })
    return result;
}

function letterCombinations2(digits) {
    
    let memo = new Map();

    function _combos(digits) {

        if (digits.length == 0)
            return []
        if (digits.length == 1)
            return keyMap[+digits].split('');
    
        // split input
        let mid = Math.floor(digits.length/2);
        let digits1 = digits.slice(0,mid);
        let digits2 = digits.slice(mid);
    
        // memoize function calls
        if (!memo.has(JSON.stringify(digits1))) 
            memo.set(digits1, letterCombinations(digits1))
        if (!memo.has(JSON.stringify(digits2)))
            memo.set(digits2, letterCombinations(digits2))
    
        // lookup
        let combos1 = memo.get(digits1)
        let combos2 = memo.get(digits2)
    
        // combine
        return combine(combos1, combos2);
    }

    return _combos(digits);
}

// test
describe('letterCombinations', function() {
    it('return all possible letter combinations that the number could represent', function() {
        expect(letterCombinations2('23')).toEqual(["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"])
    })
})