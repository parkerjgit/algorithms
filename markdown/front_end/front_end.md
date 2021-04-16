# Front-end 

## Notes

see [](refresh\topics\frontend_web_development\_frontend_system_design.md) for notes and more questions. Below is a selection of high frequence interview questions.

## Warm-up

networking
1. fetch some data, filter and sort, then fetch some related data for filtered set, immutably update local store, then update dom (with then and async/await);
2. implement pagination, depagination
3. implement filter and sort
4. check if fetch was successful

promises
1. promisify a delay
2. implement a general promisify function
3. implement promise

client-side caching
1. Store something using cache API
2. Store something using IndexedDB
3. Store something using **Web Storage** (e.g LocalStorage and SessionStorage)
4. Set a cookie
5. cache fetch responses using service worker

functional constructs
4. implement debounce/throttle

css
6. display a responsive grid with xxx, flex, and css-grid
7. display a responsive layout with xxx, flex, and css-grid

dom manip
8. add set of common attributes to a set of existing dom nodes
9. find dom node by traversing dom with dft
10. cors

events
1. handle click events for list of items behaivor delegation
2. 

network requests

client-side storage

# Promises

## Promisify a delay

```js
function delay(time) {
  return new Promise(resolve => {
    SetTimeout(() => {
      resolve();
    }, time)
  }
}
delay(3000).then(() => ... )
```

---
## Implement a function that takes a callback function and returns a function that returns a promise (implement Promisify)

```js
function promisify(fn) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          resolve(results); // return resolve(results.length === 1 ? results[0] : results)
        }
      }

      fn.call(this, ...args, callback);
    })
  }
}

const promisifiedFn = promisify(fn);
promisifiedFn(...).then(res => ..., err => ...);
```


---
## Implement Promise API

## Misc.

## implement debounce/throttle

```js
function debounce(fn, delay, leading) {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    if (leading && !timer) {
      fn(...args);
    }

    setTimeout(() => {
      if (leading) {
        timer = null;
      } else {
        fn(...args);
      }
    }, delay)
  }
}

function throttle(fn, delay, leading) {
  let timer:
  return (...args) => {
    if (timer) {
      return;
    } 

    if (leading & !timer) {
      fn(...args);
    }

    setTimeout(() => {
      if (!leading) {
        fn(...args);
      }
      timer = null;
    }, delay)
  }
}
```

## implement pipe/compose
## implement a memoization function for single/multi params.