function  isDecomposable(dict, str) {
    let prefixes = new Set();

    function _isDecomposable(str) {

        // if string is a word, its decomposable.
        if (dict.hasOwnProperty(str)) 
            return true; 

        // try to split string into prefix and word:
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
        if (_isDecomposable(subStr)) {
            prefixes.add(subStr);
        }
    })

    // if string is decomposable, then the last
    // pass will have added it to the prefixes
    return prefixes.has(str);
}

//test
describe('isDecomposable', function() {
    beforeEach(function() {
        this.dictionary = {
            'a': null,
            'man': null,
            'plan': null,
            'canal': null,
            'panama': null,
        }
    })
    it('return true if string can be decomposed into words in dictionary', function() {
        expect(isDecomposable(this.dictionary, 'amanaplan')).toEqual(true);
        expect(isDecomposable(this.dictionary, 'amanapla')).toEqual(false);

    })
})