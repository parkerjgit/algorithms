/*
A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words such that:

The first word in the sequence is beginWord.
The last word in the sequence is endWord.
Only one letter is different between each adjacent pair of words in the sequence.
Every word in the sequence is in wordList.
Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

Constraints:

1 <= beginWord.length <= 10
endWord.length == beginWord.length
1 <= wordList.length <= 5000
wordList[i].length == beginWord.length
beginWord, endWord, and wordList[i] consist of lowercase English letters.
beginWord != endWord
All the strings in wordList are unique.

source: Word Ladder (leetcode #127) - https://leetcode.com/problems/word-ladder
*/

const isAdjacent = (a, b) => {
    if (a.length !== b.length) return false;
    if (a == b) return false;
    
    let cnt = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            cnt += 1;
            if (cnt > 1) break;
        }
    }

    return (cnt === 1);
};

const getAdjacencies = (word, wordList) => {
    return wordList.filter(candidate => isAdjacent(word, candidate));
};

const buildAdjacencyGraph = (wordList) => {
    return wordList.reduce((graph, word) => {
        graph[word] = getAdjacencies(word, wordList);
        return graph;
    }, {})
};

/**
 * @param {string} start
 * @param {string} end
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(start, end, wordList) {
    
    if(!wordList.includes(start)) wordList.push(start);
    if(!wordList.includes(end)) return 0;
    
    let adjacencyGraph = buildAdjacencyGraph(wordList);
    let distances = {[end]: 1};

    const getDistances = (word) => {
        
        let q = [word];
        
        while(q.length && typeof distances[start] === 'undefined') {
            
            let cur = q.pop();

            // 1. get adjacencies for current word
            let adjacencies = adjacencyGraph[cur].filter(adj => typeof distances[adj] === 'undefined');

            if (adjacencies.length) {

                // 2. update distances for all adjacencies (that haven't already been visited)
                adjacencies.forEach(adj => {
                    if (typeof distances[adj] === 'undefined') {
                        distances[adj] = distances[cur] + 1;
                    }
                })

                // 3. Recurse on all adjacencies after all have been updated (breadth-first)
                adjacencies.forEach(adj => {
                    q.unshift(adj);
                })
            }
        }
    }

    // preprocess distances back to front
    getDistances(end);

    return distances[start] || 0;
};