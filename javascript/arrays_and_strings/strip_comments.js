/*
Complete the solution so that it strips all text that follows any of a set of comment markers passed in. Any whitespace at the end of the line should also be stripped out.

Example:

Given an input string of:

apples, pears # and bananas
grapes
bananas !apples

The output expected would be:

apples, pears
grapes
bananas

source: Strip Comments (codewars) - https://www.codewars.com/kata/51c8e37cee245da6b40000bd
*/

function stripComments(input, markers) {

  const processOneLine = (str) => {

    let markerIndices = markers
      .map(marker => str.indexOf(marker))
      .filter(idx => idx > 0);

    return str
      .slice(0, Math.min(...markerIndices))   // we only care about the first marker encountered
      .trimRight();
  };

  return input
    .split('\n')
    .map(line => processOneLine(line))
    .join('\n');
};

/**
 * TEST
 */

describe('stripComments', () => {
  it('can stip out in-line comments delimitted by one or more markers', () => {
    expect(stripComments("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])).toEqual("apples, pears\ngrapes\nbananas");
    expect(stripComments("a #b\nc\nd $e f g", ["#", "$"])).toEqual("a\nc\nd");
  })
})
