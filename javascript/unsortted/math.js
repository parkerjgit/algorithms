
// enumerate primes

const elimimateMultiples = (i, isPrime) => {
    for (let j = i; j < isPrime.length; j += i) {
        isPrime[j] = 0;
    }
}
const enumPrimes = (n) => {
    let isPrime = Array(n).fill(1);
    let primes = [1];
    [...Array(n).keys()].slice(2).forEach(i => {
        if(isPrime[i] === 1) {
            elimimateMultiples(i, isPrime);
            primes.push(i)
        } 
    })
    return primes;
}

console.log(enumPrimes(100))

// gcf

// Recursive
function gcf(a, b) {
    if (b) {
        return gcf(b, a % b);
    } else {
        return Math.abs(a);
    }
}

// Iterative
function gcf(a,b) {

    a = Math.abs(a);
    b = Math.abs(b);

    if (b > a)
      [a,b] = [b,a];

    while (true) {
        if (b == 0) return a;
        a %= b;

        if (a == 0) return b;
        b %= a;
    }
}

function lcm(a,b) {
  return (a*b)/gcf(a,b);
}

//convert to roman
for(let numeral in roman) {
    
}


function convertToRoman(num) {
    var roman = { // numeral -> value
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var res = '';
    // num: 6541
    // digits: 6,5,4,1
    roman.entries(([numeral, value]) => {
        let digit = Math.floor(num / value);
        num -= digit * value;
        res += numeral.repeat(digit)
    })
}