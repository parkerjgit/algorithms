/* Write a program which takes as input an array an dfinds the distance between a scloset pair of equal entries.

source: EPI 12.5 Find the nearest repeated entries in an array
*/

// Find the distance between nearest repeated entries in an array
function closestRepeated(words) {
    
    // map: word -> id of last occurance
    const wordMap = new Map();
    let closest = Infinity;
    
    // single pass updating closest so far
    words.forEach((word, i) => {
        if (wordMap.has(word)) {
            iLast = wordMap.get(word);
            closest = Math.min(closest, i - iLast);  
        } 
        wordMap.set(word, i);
    });

    // return closest or -1 if none repeated
    return (closest !== Infinity) ? closest : -1;
}

// test
describe('closestRepeated', ()=>{
    it('Find the distance between nearest repeated entries in an array', ()=>{
        expect(closestRepeated(['dog','cat','frog','cat','dog','lizard','cat'])).toEqual(2);
        expect(closestRepeated(['lizard','cat','frog','bug','dog','lizard','cat'])).toEqual(5);
    })
    it('Returns -1 if no entries repeap', ()=>{
        expect(closestRepeated(['dog','cat','frog'])).toEqual(-1);
    })
})