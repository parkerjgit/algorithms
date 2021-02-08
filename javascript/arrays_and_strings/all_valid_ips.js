/*
xxx

source: EPI 6.10 (Compute all valid IP Addresses)
*/

function validIPAddressess(inputStr) {

    // number of possible period places, e.g.:
    // 
    // 1 . 9 . 2 . 1 . 6 . 8 . 1 . 1
    //   0   1   2   3   4   5   6   (n = 7)
    let n = inputStr.length - 1;

    const _getValids = (i, rem) => {

        // IP must have exactly 4 parts
        if (n - 1 < rem) {
            console.log('n', n);
            console.log('rem', rem);
            return null;
        }

        // IP part must be <= 255
        if (rem === 0 && inputStr.slice(i + 1) > 255) {
            console.log('rem', rem);
            return null;
        }

        // last part
        if (rem === 0) {
            return []
        }

        // else keep going
        return [...Array(n - rem - i + 1).keys()].map(j => {
            console.log('j',j);
            let validPartials = _getValids(j, rem - 1)
            console.log('validPartials', validPartials);
            return Array.isArray(validPartials)
                ? validPartials.filter(x => x != null).map(partial => [j].concat(partial))
                : null;
        })
    }

    const _decode = (loc, str) => {
        if (!loc.length) {
            return str;
        }

        return str.slice(0, loc[0] + 1) + '.' + _decode(loc.slice(1), str.slice(loc[0] + 1))
    }

    return _getValids(0, 3).map(valid => _decode(valid, inputStr))
}

// describe('validIPAddressess', () => {
//     it('return list of valid IPs', () => {
//         expect(validIPAddressess('19216811')).toEqual([]);
//     })
// })