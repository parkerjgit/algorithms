## Javascript

* testem is the test runner. Install globally w/ `npm install testem -g`
* jasmine is the test framwork. Tests are written in the same file as function under test.
* To run tests, run `testem` from inside top-level javascript folder (to run all tests) or from inside subfolder (to run subset of tests) and then browse to http://localhost:7357/

### Troubleshooting

* If terminal flashes some text or does nothing, kill port 7357 and try again:
```
netstat -aon | findstr 7357
taskkill /pid <pid-that-corresponds-to-port> /f
```