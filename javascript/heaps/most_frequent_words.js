// min heap class
function MyMinHeap(
    compareFuction = (a, b) => a > b,
    maxHeap = Number.MAX_SAFE_INTEGER
) {
    this.content = [];
    this.compareFuction = compareFuction;
    this.maxHeap = maxHeap;
}
MyMinHeap.prototype = {
    _leftChildId: (i) => (2 * i) + 1,
    _rightChiledId: (i) => (2 * i) + 2,
    _parentId: (i) => Math.floor((i - 1) / 2),
    _swap(a, b) {
        let temp = this.content[a];
        this.content[a] = this.content[b];
        this.content[b] = temp;
    },
    _float(i) {
        let pi = this._parentId(i)
        if (i > 0 && this.compareFuction(this.content[pi], this.content[i])) {
            this._swap(i, pi);
            this._float(pi);
        }
    },
    _sink(i) {
        let li = this._leftChildId(i);
        let ri = this._rightChiledId(i);
        if (li < this.content.length && this.compareFuction(this.content[i], this.content[li])) {
            this._swap(i, li);
            this._sink(li);
            this._sink(i);
        } else if (ri < this.content.length && this.compareFuction(this.content[i], this.content[ri])) {
            this._swap(i, ri);
            this._sink(ri);
            this._sink(i);
        }
    },
    push(item) {
        this.content.push(item);
        this._float(this.content.length - 1);

        // pop if max heap exceeded.
        if (this.content.length > this.maxHeap) {
            return this.pop();
        }
    },
    pop() {
        let temp = this.content[0];
        let lastItem = this.content.pop();
        if (this.content.length) {
            this.content[0] = lastItem;
            this._sink(0);
        }
        return temp;
    },
    peek() {
        return this.content[0];
    },
    reheapify() {
        for (let i = 0; i < this.content.length; i++) {
            this._float(i);
            this._sink(i);
        }
    },
    size() {
        return this.content.length;
    }
}

function topThreeWords(text) {

    const NUM_TOP = 3;

    let words = text.split(/\s+/);
    let wordCounts = new Map();
    let wordsInHeap = new Set();
    let topWords = new MyMinHeap( (a, b) => wordCounts.get(a) > wordCounts.get(b), NUM_TOP );

    const updateWordCounts = (w) => {
        if (wordCounts.has(w)) {
            wordCounts.set(w, wordCounts.get(w) + 1);
        } else {
            wordCounts.set(w, 1);
        }
    }

    words
        .map(w => {
            return w
                .toLowerCase()
                .replace(/'\B|[^a-z'? ]/g,"")
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
            })
        .forEach(w => {
            if (!wordsInHeap.has(w)) {
                updateWordCounts(w);
                // peek first
                if (topWords.size() < NUM_TOP || wordCounts.get(w) > wordCounts.get(topWords.peek())) {
                    wordsInHeap.add(w);
                    wordsInHeap.delete(topWords.push(w)); // delete is noop if max heap size not exceeded.
                }
            } else {
                updateWordCounts(w);
                topWords.reheapify(); // if you count first, then iterate throiugh keys, you don't have to heapify! also no need for wordsInHeap set!
            }
        })

    return [...Array(NUM_TOP)]
        .map(_ => topWords.pop())
        .filter(x => x)
        .reverse();
}

// test
describe('topThreeWords', function () {
    it('correctly returns most frequently occuring words', function () {
        expect(topThreeWords(`a a a  b  c c  d d d d  e e e e e`)).toEqual(['e','d','a'])
        expect(topThreeWords(`a a c b b`)).toEqual(['a','b','c'])
        expect(topThreeWords(`e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e`)).toEqual(['e','ddd','aa'])
        expect(topThreeWords(`  //wont won't won't `)).toEqual(["won't", "wont"])
        expect(topThreeWords(`  , e   .. `)).toEqual(["e"])
        expect(topThreeWords(`  ...  `)).toEqual([])
        expect(topThreeWords(`  '  `)).toEqual([])
        expect(topThreeWords(`In a village of La Mancha, the name of which I have no desire to call to
        mind, there lived not long since one of those gentlemen that keep a lance
        in the lance-rack, an old buckler, a lean hack, and a greyhound for
        coursing. An olla of rather more beef than mutton, a salad on most
        nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
        on Sundays, made away with three-quarters of his income.`)).toEqual(['a', 'of', 'on'])
        // expect(topThreeWords(`A poster yelled against the rat into a cat`)).toEqual(['a', 'poster', 'yelled'])
    })
});
