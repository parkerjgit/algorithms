# Bit Manipulation

---

1. Bitwise left shift `<< x` is equiv to mult by 2^x, ie 2^n = 1 << n.
2. Arithmetical right shift `>> x` is equiv to **floor** div by 2^x
3. XOR-ing a number with itself is 0
3. The complement operator (~) JUST FLIPS BITS. It does NOT give the two's complement! Two's complement, is equiv to flipping the bits, AND adding 1.
4. Use two's complement `~i + 1` to negate an integer.
5. Use Bitwise NOT `~` to index array back-to-front.
4. Leave a bit unchanged with `& 1` or `| 0` or `^ 0`
5. Turn a bit *on* with `| 1` (and leave rest unchanged with `| 0`)
6. Clear/Turn a bit *off* with `& 0` (and leave rest unchanged with `& 1`)
7. Flip a bit with `^ 1` (and leave rest unchanged with `^ 0`)
8. Check state of a bit with `& 1` (by turning rest of bits off with `& 0`)
9. Slide bit into place n with `<< n-1`. Use to set a bit mask
10. Create n ones's (for mask) with `(1 << n) - 1`
10. Update a bit by clearing with `& 0`, then setting to v with `| v`
10. Check if number is even/odd with `& 1` (odd iff the last bit is 1)
11. Swap a bit with three XORs (advanced)
12. Filter a Collection with a bit mask by incrementally shifting and testing last bit with `>> 1` and `& 1`
13. Clear lowest set bit with `x & (x-1)`
14. Isolate lowest set bit with `x & ~(x-1)` (The complement operator (~) JUST FLIPS BITS. It does NOT give the two's complement!)
15. Add bit to LSB of binary number with `x = x*2 + newbit`
16. Add bit to MSB of binary number with `x = x + newbit*(2**d)`, where d is 2's position of MSB.


---

## Char Sets

1. Diff btw ascii and unicode

ASCII defines 128 characters, which map to the numbers 0–127. Unicode defines 2^21 characters, which map to numbers 0–2^21 (though not all numbers are currently assigned, and some are reserved).

Unicode is a superset of ASCII, and the numbers 0–127 have the same meaning in ASCII as they have in Unicode. Unicode doesn't contain every character from every language, but it does contains a huge amount of characters.

ASCII uses 7 bits to represent a character (8th bit used for parity), e.g. 1000001 = A. By using 7 bits, we can represent a maximum of 2^7 (128) characters. 

ASCII Extended uses the 8th bit (the bit used for parity) to encode more characters to support their language (to support "é", in French, for example). Just using one extra bit doubled the size of the original ASCII table to map up to 256 characters (2^8 = 256 characters). And not 2^7 as before (128).

Because Unicode characters don't generally fit into one 8-bit byte, have to store Unicode characters in byte sequences, such as UTF-32 and UTF-16.

https://stackoverflow.com/questions/19212306/whats-the-difference-between-ascii-and-unicode
http://net-informations.com/q/faq/encoding.html
http://kunststube.net/encoding/
https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/

Questions:

How many bits does ascii/unicode use?
How many characters can ascii/unicode represent?

## Bitwise Logic

### 1. Bitwise left shift `<< x` is equiv to mult by 2^x, ie 2^n = 1 << n. 

Recall, that for a base 10, every time we move a decimal place to the left we multiply by 10, so if we move x digits, we multiply by 10^x.

```
    0    0    1    0        # 10
    10^3 10^2 10^1 10^0

    1    0    0    0        # << 2 = 10 x 10^2 = 1000
    10^3 10^2 10^1 10^0
```

This is generalizable for base b: Left shifting x digits to the left is equivalent to multiplying by b^x, and left shifting x bits, is equivalent to multiplying by 2^x.

```
    0b0010              # 0010 = 2
    0b0011              # 0011 = 3

    0b0010 << 1         # 0100 = 4
    0b0011 << 1         # 0110 = 6

    0b0010 << 2         # 1000 = 8
    0b0011 << 2         # 1100 = 12
```

### 2. Bitwise right shift `>> x` is equiv to **floor** div by 2^x

By the same logic as left shift, we can expect right shifting y bits to be equivalent to division by 2^x, except we also note that this operation rounds off the y right most bits resulting in a floor division.

```
    0b1001              # 1001 = 9
    0b1000              # 1000 = 8

    0b1001 >> 1         # 0100 = 4
    0b1000 >> 1         # 0100 = 4

    0b1001 >> 2         # 0010 = 2
    0b1000 >> 2         # 0010 = 2

    0b1001 >> 3         # 0001 = 1
    0b1000 >> 3         # 0001 = 1
```

### 3. Logical AND `&` is <= input

```
     00101011
 AND 10001101
     -------- 
     00001001
```

### 4. Logical OR `|` is >= input

```
     00101011
  OR 10001101
     -------- 
     10101111
```

### 5. XOR-ing a number with itself is 0

```
a = 0b0110          # 0110
a = a ^ a           # 0000
```

### The bitwise NOT (or complement) `~` JUST FLIPS BITS. It does NOT give the two's complement! 

The bitwise NOT, also called the *complement*, is the result of flipping the bits. For signed integers, the left-most bit of the integer bit representation is reserved for sign, so the integer range of a 4 bit number is -8 to 7, while the range of 4 bit unsigned number is 0 to 15. 

```
 x     Signed     One's     Two's     bin(x)

-8      1000      xxxx      xxxx      xxx
-7      xxxx      xxxx      1001
-6      xxxx      xxxx      1010
-5      xxxx      xxxx      1011
-4      xxxx      xxxx      1100
-3      xxxx      xxxx      1101
-2      xxxx      xxxx      1110
-1      xxxx      xxxx      1111
-0      -
 0      0000
 1      0001
 2      0010
 3      0011
 4      0100
 5      0101
 6      0110
 7      0111

```

https://www.youtube.com/watch?v=4qH4unVtJkE
https://stackoverflow.com/questions/7278779/bit-wise-operation-unary-invert

[Signed Magnitude vs One's Complement vs Two's Complement](https://www.youtube.com/watch?v=Z3mswCN2FJs)

### Use two's complement `~i + 1` to negate an integer.

Two's complement, is equiv to flipping the bits, AND adding 1. It is how Python implements (ie. stores) negative numbers, but it is not how python represents them in binary. -5 is implemented (ie stored as) `1011` (for 4-bit number), but it is represented as `-0b101`. This is confusing but makes some sense because the two's complement representation of the 32-bit signed integer -5, would be `11111111111111111111111111111011`. It is more convenient to use `-0b101`.

### Use Bitwise NOT `~` to index array back-to-front.

`~i` essentially calculates `-i - 1`.

```
i  ~i  
0  -1
1  -2
2  -3
3  -4 
```

Since, we can index from back-to-front of a python array using negative indices, starting at -1 (ie. ~0 is last element), we can use `~i` instead of `range(-1,-len(a),-1)` or indexing with `-i-1`. This is expecially clean/useful for iterating from front-to-back and back-to-front at same time.

```py
a = range(8)
for i in range(len(a)//2):
  print((a[i],a[~i]))

---
(0,7)
(1,6)
(2,5)
(3,4)
```

### Leave a bit unchanged with `& 1` or `| 0` or `^ 0`

Observe that `x & 1`, `x | 0` as well as `x ^ 0` simply equals x:

```
x  y   x & y       x  y   x | y         x  y   x ^ y
0  1   0           0  0   0             0  0   0
1  1   1           1  0   1             1  0   1
```

This is useful for creating bit masks that isolate specific bits by leaving rest of bits unchanged.

### Turn a bit *on* with `| 1` (and leave rest unchanged with `| 0`)

```py
#        v
#        010
#     OR 100 (mask)
#    -------
#        110

a =    0b010
mask = 0b100        # mask 3rd bit
a = a | mask        # turn 3rd bit on ('| 0' leaves rest of bits unchanged)
```

### Turn a bit *off* with `& 0` (and leave rest unchanged with `& 1`)

```py
#        v
#        101
#    AND 011 (mask)
#    -------
#        001

a =    0b101
mask = 0b011        # mask 3rd bit
a = a & mask        # turn 3rd bit off ('& 1' leaves rest of bits unchanged)
```

### Flip a bit with `^ 1` (and leave rest unchanged with `^ 0`)

```py
#        v
#        110
#    XOR 100 (mask)
#    -------
#        010

a =    0b110
mask = 0b100        # mask 3rd bit
a = a ^ mask        # flip 3rd bit ('^ 0' leaves rest of bits unchanged)
```

### Check state of a bit with `& 1` (by turning rest of bits off with `& 0`) 

We know that `x & 1` simply x unchanged. Put another way, the state of a bit x is `x & 1`. For multiple bits, we can infer the state of bit by turning rest of bits off and observing that state of bit is 1 only if result is > 0.

```py
mask = 0b100 
if 0b110 & mask > 0:
    print('third bit is on')
```

### Slide bit into place n with `<< n-1`. Use to set a bit mask.

```py
a = 0b101 
mask = (0b1 << 9)   # mask 10th bit 
a = a ^ mask        # toggle 10th bit
```

### Create n ones's (for mask) with `(1 << n) - 1`

### Update a bit by clearing with `& 0`, then setting to v with `| v`

...

### Check if number is odd with `& 1` (odd iff the last bit is 1)

An integer is odd iff the last bit is 1:

```
    00101011        01100010
&   00000001    &   00000001
    --------        --------
    00000001        00000000
```

So check if number is even:

```py
def is_even(x):
    return not (x & 1)
def is_odd(x):
    return (x & 1)
```

### Swap a bit with three XORs

```
              a     b     a     b
  a  |  b  | a^b | a^b | a^b |
  0     0     0     0     0     0
  0     1     1     0     1     0
  1     0     1     1     0     1
  1     1     0     1     1     1

```

```
a = a^b
b = a^b
a = a^b
```

### Filter a Collection with a bit mask by incrementally shifting and testing last bit with `>> 1` and `& 1`

```
                                i
                                v
  set:    {  'a',  'b',  'c',  'd'  }
  msk:        0     1     0     1
  subset: {        'b',        'd'  }

  i = len(set) - 1
  subset = set()
  while msk > 0:
    if msk & 1: subset.add(set(i))
    msk >> 1
    i -= 1

```

does this work with an unordered set???

### reference

http://www.catonmat.net/blog/low-level-bit-hacks-you-absolutely-must-know/

### See also

https://wiki.python.org/moin/BitManipulation
https://graphics.stanford.edu/~seander/bithacks.html

