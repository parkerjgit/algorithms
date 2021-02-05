/**
 * Test Collatz Conjecture
 * 
 * source: Test Collatze Conjecture (EPI 12.11) 
 */

function* range(start, stop, step = 1) {
    for (let i = start; i < stop; i += step) {
        yield i;
    }
}

function union(setA, setB) {
    let res = new Set(setA)
    for (let elem of setB) {
        res.add(elem)
    }
    return res;
}

function testCollatzeConjecture(n) {

    // max time (ms) allowed for series to resolve to 1
    const MAX_TIME_TO_RESOLVE = 0;

    // trivial for 1 and 2
    const confirmed = new Set([1, 2]);

    let isDisproved = false;

    // helper to get next item in sequence
    const nextCollatz = (x => {
        return (x % 2 == 0)
            ? x / 2         // even 
            : x * 3 + 1;    // odd
    })

    // prove for all numbers upto and including n
    for (let m of range(1, n)) {

        let unconfirmed = new Set();    // all items in sequence
        let item = m;                   // current item in sequence
        let isConfirmed = false;
        

        // infinite series disproves conjecture1
        let timer = setTimeout(() => {
            console.log('hey')
            isDisproved = true;
        }, MAX_TIME_TO_RESOLVE);


        while (!isConfirmed && !isDisproved) {

            // proved for m (and all items in the sequence)
            if (confirmed.has(item)) {
                union(confirmed, unconfirmed);
                clearTimeout(timer);
                isConfirmed = true;
            }

            // loop disproves conjecture!
            if (unconfirmed.has(item)) {
                isDisproved = true;
            }

            unconfirmed.add(item);
            item = nextCollatz(item);
        }

        // stop if disproved
        if (isDisproved) {
            break;
        }
    }

    // return true if conjecture has not been disproved
    return !isDisproved;
}

// TEST

describe('testCollatzeConjecture(n)', () => {
    [10, 1000000].forEach(n => {
        it(`proves collatz conjecture thru ${n}`, () => {
            expect(testCollatzeConjecture(n)).toEqual(true);
        })
    })
})