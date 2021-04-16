#### Fuctional

**daily**

**warm-up**

1. implement pipe, compose, etc. etc.
2. implement function that returns the identity function for an input value
3. implement function that returns input function with args reversed
2. implement debounce, debounce leading, etc.
3. implement throttle function
5. implement memoization for single/multi params
1. implement map/filter/reduce

1. Write an identity function that takes an argument and returns that argument, e.g., `identity(3) // 3`
2. Write three binary functions, add , sub, and mul, that take two numbers and return their sum, difference, and product, e.g., `add(3, 4) // 7`
3. Write a function that takes an argument and returns a function that returns that argument, i.e., identity function factory, e.g., `identityf(1)() // 1`
4. Write a function curry that takes a binary function and an argument, and returns a function that can take a second argument, e.g., `curry(mul, 5)(6) // 30`
5. Write a function curryr that takes a binary function and a second argument, and returns a function that can take a first argument, e.g., `curryr(sub, 1)(7) // 6`
6. Write a function liftf that takes a binary function, and makes it callable with two invocations, e.g. `liftf(mul)(5)(6) // 30`
>7. Write a function twice that takes a binary function and returns a unary function that passes its argument to the binary function twice, e.g., `twice(mul)(11) // 121`
8. Write a function composeu that takes two unary functions and returns a unary function that calls them both, e.g. `composeu(double, square)(5) // 100`
9. Write a function composeb that takes two binary functions and returns a function that calls them both, e.g. `composeb(add, mul)(2, 3, 7) // 35`
10. Write a limit function that allows a function to be called a limited number of times before returning undefined, e.g. `let add_once = limit(add, 1)`
11. Write a from factory that produces a generator that will produce a series of values, e.g., `let next = from(0); next() // 0`
12. Write a to factory that takes a generator and an end value, and returns a generator that will produce numbers up to but not including that limit, e.g., `let next = to(from(2), 3); next() // 2; next() // undefined`
13. Write an element factory that takes an array and a generator and returns a generator that will produce elements from the array, e.g., `let next = element(["a", "b", "c", "d"], fromTo(1, 3)); next() // a`
14. Modify the element factory so that the generator argument is optional. If a generator is not provided, then each of the elements of the array will be produced, e.g., `let next = element(["a", "b", "c", "d"]); next() // a`
15. Write a collect factory that takes a generator and an array and produces a generator that will collect the results in the array, e.g., `let next = collect(fromTo(0, 2), array)`
16. Write a filter factory that takes a generator and a predicate and produces a generator that produces only the values approved by the predicate. `let next = filter(fromTo(0, 5), x=>x%2==0)`
17. Write a concat factory that takes two generators and produces a generator that combines the sequences, e.g., `let next = concat(fromTo(0, 3), fromTo(0,2))`
18. Write a repeat function that takes a generator and calls it until it returns undefined, e.g., `repeat(collect(fromTo(0, 4), array))`
19. Write a map function that takes an array and a unary function, and returns an array containing the result of passing each element to the unary function (use the repeat function), e.g., `map([2, 1, 0], inc) // [3, 2, 1]`
20. Write a reduce function that takes an array and a binary function, and returns a single value (use the repeat function), e.g., `reduce([2, 1, 0], add) // 3`
21. Make a symbol factory that makes a unique symbol generator, e.g., `let next = gensymf("G"); next() //'G1'; next() // 'G2'`
22. Write a symbol factory that takes a factory function and a seed, e.g., `let gensymf = gensymff(from, 1); let next = gensymf("G")`
23. Make a fibonacci factory that returns a generator that will produce the fibonacci sequence, e.g., `let next = fibonaccif(0, 1);`
24. Write a counter constructor that returns an object containing two functions that implement an up/down counter, hiding the counter, e.g., `let {up, down} = counter(10); up() // 11; down() // 10`
25. cont...

Most warm-up questions taken from: The Good Parts of Javascript and the Web, Frontend Masters Workshop, by Douglas Crawford, accessed on Lynda.com 6/30/2018

**problems**

1. Write a function that turns a fn into async fn that executes after some delay following burst (debounce). Why is this useful?
2. Write a function that turns a fn into async fn that executes immediately then prevents execution until some delay following burst (debounce leading). Why is this useful?
2. Write a function that turns a fn into fn that only fires at some max rate (throttle). Why is this useful?