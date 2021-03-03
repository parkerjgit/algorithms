/* Write a program which takes as input an array of words, and a pattern encoded as characters in string,
   and check to see whether encoded pattern matches repeating pattern of words in the array.

source: unknown
*/

/**
 *
 * @param {Array<string>} words
 * @param {string} pattern
 *
 * Returns:
 * * true if pattern match, false otherwise
 *
 * Requires:
 * * Patterns are syncronized, eg. first word corresponds to first char.
 *
 * Notes:
 * * Patterns are not nec. complete, eg. isMatch(['red', 'blue'], 'aba') is a match
 * * Periodicity of word array and pattern is not nec. 1, eg. "aaa" is a valid pattern.
 * * Empty patterns only match empty word arrays
 *
 */
const validateRepeatingPattern1 = (words, pattern) => {

    const decoding = new Map();
    const wordsSeen = new Set();

    const getPeriodicity = (pattern) => {
        // TODO: implement. For now require periodicty to be 1.
        return true;
    }

    // Empty pattern only matches no words
    if (!pattern.length) {
        return !words.length;
    }

    if (getPeriodicity(pattern) > 1) {
        return false;
    }

    const _isMatch = (words, patternMarker) => {

        if (!words.length) {
            // no words left, so pattern matches!
            return true;
        }

        let curWord = words[0];
        let curChar = pattern[patternMarker];

        // mismatch case 1: char already maps to a diff word
        if (decoding.has(curChar) && decoding.get(curChar) !== curWord) {
            return false;
        }

        // masmatch case 2: diff char already maps to this word
        if (!decoding.has(curChar) && wordsSeen.has(curWord)) {
            return false;
        }

        // Add new char-to-word mapping
        decoding.set(curChar, curWord);

        // Go to next word
        return _isMatch(words.slice(1), (patternMarker + 1) % pattern.length);
    }

    return _isMatch(words, 0);

}

function validateRepeatingPattern(words, codes) {

    const encode = new Map();
    const decode = new Map();

    for (let i = 0; i < Math.max(words.length, codes.length); i++) {

        let [word, code] = [words[i % words.length], codes[i % codes.length]]

        // invalid cases
        const invalidates = [
            () => !encode.has(word) && decode.has(code),            // 1st occur of word, but not 1st occur of code    [red, blu] -> [a, a]
            () => !decode.has(code) && encode.has(word),            // 1st occur of code, but not 1st occur of word    [red, red] -> [a, b]
            // () => encode.has(word) && encode.get(word) !== code, // 2nd occur of word, but doesn't match encoding   [red, red] -> [a, b] (dup)
            // () => decode.has(code) && decode.get(code) !== word  // 2nd occur of code, but doesn't match decoding   [red, blu] -> [a, a] (dup)
        ];

        // invalid if any evaluates to true
        if (invalidates.some(f => f())) {
            return false;
        }

        // add new encoding
        encode.set(word, code);
        decode.set(code, word);
    }

    return true;
}

describe('validateRepeatingPattern', () => {
    it('validates a repeating pattern successfully', () => {
        expect(validateRepeatingPattern(['red', 'blue', 'red'], 'aba')).toEqual(true);
        expect(validateRepeatingPattern(['red', 'blue', 'red'], 'ab')).toEqual(true);
        expect(validateRepeatingPattern(['red', 'blue'], 'aba')).toEqual(true);
        expect(validateRepeatingPattern(['red', 'blue', 'green'], 'aba')).toEqual(false);
        expect(validateRepeatingPattern(['red', 'red', 'blue'], 'aba')).toEqual(false);
        expect(validateRepeatingPattern([], '')).toEqual(true);
    })
})
