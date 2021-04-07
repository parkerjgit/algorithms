# Front-end 

## Notes

* adsf

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

# Networking

---
## Create valid HTML page that loads style sheet and executes some javascript

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="style.css">
    <script defer src="./index.js"></script>
  </head>
  <body>
    <div class="app"></div>
  </body>
</html>
```

---
## Get some data and display it in a list

```js
let api = `https://abc.com/api`;
let query = ({search}) => `?search=${search}`;
let config = {
  method: 'GET', // default
  headers: {
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include',
  redirect: 'follow',
  referrerPolicy: 'same-origin' // Don't send the Referer header (ie info about page making request) for cross-origin requests.
}
fetch(api + query({search:'cats'}), config)
  .then(res => res.json())
  .this(data => data.items)
  .this(items => {
    document.querySelect('.app').innerHTML = `<ul>${items.map(item=>`<li>${item.text}</li>`)}</ul>`
  })
  .then(err => console.error('Error:', err))
```

---
## Post some data

```js
let api = `https://abc.com/api`
let config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json' // required when POSTing JSON or you will get a 400 back from server.
  },
  body: JSON.stringify({username: 'john123'})
}
fetch(api, config)
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .then(err => console.error('Error:', err))
```

---
## Check if fetch was successful

The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.

```js
fetch(api, config)
  .then(res => {
    if (!res.ok) throw new Error("HTTP error, status:" + response.status) // (response.status !== 200) also works
    return res.json()
  })
  .then(data => console.log('Success:', data))
  .then(err => console.error('Error:', err))
```

---
## fetch some server-side paginated data

```js
async function fetchPage({page = 1, limit = PAGE_SIZE}) {
  try {
    let res = await fetch(api + query({page, limit}));
    let data = await res.json();

    // update state
    setState({
      movies: data.data,
      next: data.next,
      prev: data.prev
    })

  } catch(err) {
    console.log(err);
  }
}

function clickHandler(e) {
  e.preventDefault();

  let page = ({
    'prev': state.prev,
    'next': state.next
  })[e.target.className];

  (async () => {
    await fetchPage({page});
    render(state);
  })();
}

document.querySelector('.container').addEventListener('click', clickHandler)
```
(see components\vanillajs\movie_search\movieSearch.js)

---
## Abort a fetch

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

# Client-side caching

## Store something using cache API

The Cache API was created to enable service workers to cache network requests so that they can provide fast responses, regardless of network speed or availablity. However, the API can also be used as a general storage mechanism. The caches only store pairs of Request and Response objects, representing HTTP requests and responses, respectively. However, the requests and responses can contain any kind of data that can be transferred over HTTP.

```js
// 1. check if cache api supported
let isCacheSupported = 'caches' in window;

// 2. create a cache
caches.open('mycache').then(cache => ...);

// 3. add url to cache
caches.open('mycache')
  .then(cache => cache.add('/data.json'))
  .then(() => console.log('Sucess!'))

// 4. remove url from cache
caches.open('mycache')
  .then(cache => cache.delete('/data.json'))

```

https://web.dev/cache-api-quick-guide/

---
## Store something using IndexedDB
## Store something using **Web Storage** (e.g LocalStorage and SessionStorage)
## Set a cookie
## cache fetch responses using service worker

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