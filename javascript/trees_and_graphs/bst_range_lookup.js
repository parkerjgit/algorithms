/*
Give BST and interval, return keys that are contained by interval

source: The range lookup problem (EPI 14.10)
*/

function solution1(bst, [lowerBound, upperBound]) {

    let res = [];

    const _dft = (tree) => {

        if (!tree) {
            return undefined;
        }

        if (tree.data < lowerBound) {

            // prune left
            _dft(tree.right);

        } else if (tree.data > upperBound) {

            // prune right
            _dft(tree.left);

        } else { // tree is in interval

            // pre-order traversal
            _dft(tree.left);
            res.push(tree.data);
            _dft(tree.right);
        }
    }

    _dft(bst);

    return res;
}

// TEST

function BST(data=null) {
    this.data = data;
  }

BST.prototype.add = function(itemValue) {

    // no nodes
    if (!this.data) {
      this.data = itemValue;

    } else if (itemValue < this.data) { // go left
      if (this.left) {
        this.left.add(itemValue);
      } else {
        this.left = new BST(itemValue);
      }

    } else { // go right
      if (this.right) {
        this.right.add(itemValue);
      } else {
        this.right = new BST(itemValue);
      }
    }
  }

const problems = [{
    problem: 'Get BST keys that are contained by an interval',
    solutions: [{
        description: 'modified pre-order traversal with tree pruning',
        function: solution1
    }],
    tests: [
        {
            expectation: 'returns correct keys when root is inside the interval',
            setup() {
                this.bst = new BST(11);
                [5,7,8,9,10,12,13,14,15,16,20,22,24].forEach(val => this.bst.add(val));
            },
            teardown() {},
            params() { return [this.bst, [9,15]] },
            expected_output: [9,10,11,12,13,14,15]
        }
    ]
}]

problems.forEach(({problem, solutions, tests}) => {
    describe(`Problem: ${problem}`, function() {
        solutions.forEach((solution, i) => {
            tests.forEach(test => {
                test.setup();
                it(`Solution ${i+1} ${test.expectation} using ${solution.description}`, function() {
                    expect(solution.function(...test.params())).toEqual(test.expected_output)
                })
            })
        })
    })
})
