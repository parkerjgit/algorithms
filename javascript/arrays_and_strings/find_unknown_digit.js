/*
You are helping an archaeologist decipher some runes. He knows that this ancient society used a Base 10 system, 
and that they never start a number with a leading zero. He's figured out most of the digits as well as a few operators, 
but he needs your help to figure out the rest. The professor will give you a simple math expression, of the form:

[number][op][number]=[number]

He has converted all of the runes he knows into digits. The only operators he knows are addition (+),subtraction(-), and 
multiplication (*), so those are the only ones that will appear. Each number will be in the range from -1000000 to 1000000, 
and will consist of only the digits 0-9, possibly a leading -, and maybe a few ?s. If there are ?s in an expression, they 
represent a digit rune that the professor doesn't know (never an operator, and never a leading -). All of the ?s in an 
expression will represent the same digit (0-9), and it won't be one of the other given digits in the expression. No number 
will begin with a 0 unless the number itself is 0, therefore 00 would not be a valid number. Given an expression, figure out 
the value of the rune represented by the question mark. If more than one digit works, give the lowest one. If no digit works, 
well, that's bad news for the professor - it means that he's got some of his runes wrong. output -1 in that case. Complete 
the method to solve the expression to find the value of the unknown rune. The method takes a string as a paramater repressenting 
the expression and will return an int value representing the unknown rune or -1 if no such rune exists.

source: Find the unknown digit (codewars) - https://www.codewars.com/kata/546d15cebed2e10334000ed9/solutions/javascript/me/best_practice
*/

const OPS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b
}

const parseExpression = (exp) => {
    let [leftSide, result] = exp.split('=');
    let op = leftSide.includes('+') ? '+' :
             leftSide.includes('*') ? '*' :
             leftSide.includes('-') ? '-' :
             '';

    let opIdx = leftSide.slice(1).indexOf(op) + 1;
    let operands = [leftSide.slice(0, opIdx), leftSide.slice(opIdx + 1)]
    return [[result, ...operands], op]
}

function solveExpression(exp) {

    let [numbers, op] = parseExpression(exp);
    let unknown = -1;

    // initialize candidates 0-9
    let candidates = [...Array(10).keys()];

    // exclude from candidates any digits that already occur in expression
    let exclude = new Set(exp.split('')
        .filter(c => !['+', '*', '-', '=', '?'].includes(c))
        .map(n => Number(n)));

    // exclude from candidates 0 if any number starts with ??
    if (numbers.some(num => (num.startsWith('?') && num.length > 1) || (num.startsWith('-') && num[1] == '?'))) {
        exclude.add(0)
    }

    // try each remaining
    candidates
        .filter(candidate => !exclude.has(candidate))
        .some(digit => {
            let [result, ...operands] = numbers.map(num => Number(num.replace(/\?/g, digit)));
            if (OPS[op](...operands) == result) {
                unknown = digit;
                return true;
            }
        })

    return unknown;
}