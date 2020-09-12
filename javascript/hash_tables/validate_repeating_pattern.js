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
const validateRepeatingPattern = (words, pattern) => {

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