// promise chian
Promise.resolve(1)
    .then(result => result + 1)
    .then(result => result + 2)
    .then(result => {
        console.log(result);
    })

// equiv promise chain with async/await
(function() {
    (async () => {
        let r0 = 1;
        let r1 = await ((res) => res + 1)(r0);
        let r2 = await ((res) => res + 2)(r1);
        console.log(r2);
    })();
})();