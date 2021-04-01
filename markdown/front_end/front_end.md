# Front-end 

## Notes

* adsf

async
1. fetch some data, filter and sort, then fetch some related data for filtered set, immutably update local store, then update dom (with then and async/await);
2. implement pagination, depagination
3. implement filter and sort
1. promisify a delay

functional
2. implement a general promisify function
3. implement promise
4. implement debounce/throttle

css
6. display a responsive grid with xxx, flex, and css-grid
7. display a responsive layout with xxx, flex, and css-grid

dom manip
8. add set of common attributes to a set of existing dom nodes
9. find dom node by traversing dom with dft
10. cors

events

network requests

client-side storage

---
## Implement a function that takes a function that takes a callback and returns a function that returns a promise (promisify)

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
## asdf