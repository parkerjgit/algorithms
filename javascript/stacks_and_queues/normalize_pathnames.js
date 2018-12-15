/*
normalize file path names

source: amazon interview
*/

function normalizePath(path) {
    let stack = [];
    let parts = path.split('/');
    parts.forEach(part => {
        if (part === '..' && stack.length) {
            stack.pop();
        } else if (part !== '.') {
            stack.push(part)
        }
    })
    return '/' + stack.join('/')
}

// test
describe('normalizePath', function() {
    it('normalized a path string', function() {
        expect(normalizePath('/../tmp/./js/bin/../../index.html')).toEqual('/tmp/index.html')
    })
})