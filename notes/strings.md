## Strings

---

see markdown/strings/string.md

---



Timing the above gives less than dramatic results:

```py
def test(k):
    fns = [build_random_string,
           build_random_string2,
           build_random_string3]
    for fn in fns:
        start = time.clock()
        fn(k)
        end = time.clock()
        print(end-start)

test(10000000)
5.1062934900726304
1.3030373256644907
0.653888065033243
```

