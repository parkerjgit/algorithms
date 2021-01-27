// debounce -> turn fn into async fn that executes after some delay.
// for Grouping a sudden burst of events (like keystrokes) into a single one.
// see https://css-tricks.com/debouncing-throttling-explained-examples/
const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            return fn(...args);
        }, delay)
    }
}
const handler = (evt) => {
    // ...
};
const debouceLeading = (fn, delay) => {
    let timer,
        ready = true;
    return (...args) => {
        if (ready) {
            ready = false;
            timer = setTimeout(() => {
                ready = true;
            }, delay)
            return fn(...args);
        } else {
            clearTimeout(timer); 
        }
    }
}
const debouncedHandler = debounce(handler, 300);
node.addEventListener("click", debouncedHandler);

// throttle -> turn fn into fn that only fires at rate of once per some delay.
// for  Guaranteeing a constant flow of executions every X milliseconds. Like 
// checking every 200ms your scroll position to trigger a CSS animation.
// see https://css-tricks.com/debouncing-throttling-explained-examples/
function throttle(fn, delay) {
    let lastCall = 0;
    return (...args) => {
        let now = (new Date).getTime();
        let elapsed = now - lastCall;
        if (elapsed >= delay) {
            lastCall = now;
            return fn(...args);
        }  
    }
}
const handler = (evt) => {
    // ...
}
const throttledHandler = throttle(handler, 200);
window.addEventListener("resize", throttledHandler);

// implement fibonaci sequence with reduce
const fib = (n) => {
    return [...Array(n).keys()].slice(1)
        .reduce(([minus2, minus1], next) => [
            minus1,
            minus2 + minus1,
        ], [0,1])[1]
}
  
// console.log(fib(5))


const flatten = array => array.reduce((a, b) => {
return (Array.isArray(b)) 
    ? a.concat(flatten(b))
    : a.concat(b)
}, [])

// const arr = [[1,[2,[3]]],4,[5,[6,[7]]]]
// const flattenedArray = flatten(arr)

// console.log(flattenedArray) // [1, 2, 3, 4]

// console.log(`
// reverse Arguments
// `)

const reverseArgs = (fn) => {
return (...args) => {
    return fn(...args.reverse())
}
}

// let f1 = (a,b) => a/b;
// let f2 = reverseArgs(f1);

// console.log(f1(10,5));
// console.log(f2(10,5));

function every(arr, fn) {
	return reduce(arr, true, function(a, b) {
		return a && fn(b);
	})
}

function any(arr, fn) {
	return reduce(arr, false, function(a, b) {
		return a || fn(b);
	})
}

const compose = (...args) => (x) => {
    return args.reduce((acc, cur) => {
        return cur(acc);
    }, x)
}