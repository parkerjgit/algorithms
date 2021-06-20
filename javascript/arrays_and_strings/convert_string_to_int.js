/*
Convert a string into an integer. The strings simply represent the numbers in words. Examples:

"one" => 1
"twenty" => 20
"two hundred forty-six" => 246
"seven hundred eighty-three thousand nine hundred and nineteen" => 783919

Notes:

The minimum number is "zero" (inclusively)
The maximum number, which must be supported is 1 million (inclusively)
The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others it's not
All tested numbers are valid, you don't need to validate them

source: parseInt() reloaded (codewars)
https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/solutions/javascript
*/

const CARDINAL = {
    zero:  0,    ten:       10,
    one:   1,    eleven:    11,
    two:   2,    twelve:    12,    twenty:  20,
    three: 3,    thirteen:  13,    thirty:  30,
    four:  4,    fourteen:  14,    forty:   40,
    five:  5,    fifteen:   15,    fifty:   50,
    six:   6,    sixteen:   16,    sixty:   60,
    seven: 7,    seventeen: 17,    seventy: 70,
    eight: 8,    eighteen:  18,    eighty:  80,
    nine:  9,    nineteen:  19,    ninety:  90
};

const MULTIPLIER = {
    hundred:    100, 
    thousand:   1000, 
    million:    1000000 
};

// method 1 (prefered): left-to-right

function parseInt(str) {

    // 1. split by spaces/hyphens and ignore 'and'
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

// method 2: right-to-left (needs refactor!)
  
const parseSimple = (string) => {
    if (string == '') {
        return 0;
    } else if (string.includes('-')) {
        return string.split('-')
            .map(word => CARDINAL[word])
            .reduce((sum,part) => sum + part, 0);
    } else {
        return CARDINAL[string]
    }
}

const parseCompound = (parts) => {
    return parseSimple(parts[0]) * MULTIPLIER[parts[1]]
}

function parsePrefix(string) {

    let words = string.split(' ').filter(w => !['and'].includes(w));
    let parts = [];
    let idx = words.length - 1;

    while (idx >= 0) {
        if (Object.keys(MULTIPLIER).includes(words[idx])) {
            parts.push(parseCompound(words.slice(idx-1,idx+1)))
            idx -= 2;
        } else {
            parts.push(parseSimple(words[idx]))
            idx -= 1;
        } 
    }

    return parts.reduce((sum, part) => sum + part, 0);
}

function parseInt(string) {
    
    let rest =  string;
    let millions = '',
        thousands = '',
        hundreds = '',
        ones = '';

    [millions, rest] = rest.includes('million') ? rest.split('million') : [millions, rest];
    [thousands, rest] = rest.includes('thousand') ? rest.split('thousand') : [thousands, rest];
    [hundreds, rest] = rest.includes('hundred') ? rest.split('hundred')  : [hundreds, rest];
    ones = rest;

    return [millions, thousands, hundreds, ones]
        .map(prefix => parsePrefix(prefix))
        .reduce((sum, part, i) => {
            return sum + (part * (MULTIPLIER[['million', 'thousand', 'hundred'][i]] || 1))
        }, 0)
                    
}