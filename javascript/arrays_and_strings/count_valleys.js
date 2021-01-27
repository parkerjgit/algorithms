/* An avid hiker keeps meticulous records of their hikes. During the last hike that took exactly *steps* steps, 
for every step it was noted if it was an uphill or a downhill step. Hikes always start and end at sea level, 
and each step up or down represents a  unit change in altitude. We define the following terms: A valley is a 
sequence of consecutive steps below sea level, starting with a step down from sea level and ending with a step up to 
sea level. Given the sequence of up and down steps during a hike, find and print the number of valleys walked through.

source: Counting Valleys Problem, Hackerrank - https://www.hackerrank.com/challenges/counting-valleys/problem
*/

/**
 * Count Valleys
 * 
 * @param {string} steps - a string of U's and D's 
 * 
 * Returns: 
 * * Integer number of valleys, where valley is defined as going below and coming back up to sea level.
 * 
 * Requires:
 * * Input is a valid string (only U's and D's)
 */
function countValleys(steps) {
    let [level, valleyCount] = [0,0];

    for (let step of steps) {
        level += (step.toLowerCase() === 'd') ? -1 : 1;

        // if coming up to sea level, then found a valley!
        if (step.toLowerCase() === 'u' && level === 0) {
            valleyCount++;
        }
    }

    return valleyCount;
}

// TODO: test