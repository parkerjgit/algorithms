/*
normalize file path names

source: amazon interview
*/

function normalizePath(path) {
    let stack = [];
    let parts = path.split('/');
    parts.forEach(part => {
        if (part === '..') {
            stack.pop();
        } else if (part !== '.') {
            stack.push(part)
        }
    })
    return '/' + stack.join('/')
}

// immutable
function normalizePath2(path) {

    const ops = (stack, part) => ({
            "..": stack.slice(0,-1),    // '..' -> pop
            "." : stack                 // '.'  -> noop
        })[part] || [...stack, part]    // 'js' -> push

    return '/' + path
        .split('/')
        .reduce(ops, [])
        .join('/');
}

// test
describe('normalizePath', function() {
    it('normalized a path string', function() {
        expect(normalizePath('/../tmp/./js/bin/../../index.html')).toEqual('/tmp/index.html')
    })
})