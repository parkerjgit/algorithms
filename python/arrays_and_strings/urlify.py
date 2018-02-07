"""
question:
Write a  method  to replace  all  spaces  in  a string with '%2e:  You  may assume  that  the  string
has sufficient space at  the  end  to hold  the  additional characters,  and  that  you are given  the  "true"
length of  the  string. (Note:  if  implementing  in  Java, please use a character array so  that  you can
perform this operation  in  place.)

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 194.
"""

def urlify(str):
    """
    Solution 1: Brute Force
    Convert List to Character Array, step thru, if space, set value to '%" and insert '2' and '0' after.
    Time: O(n^2). worst case Quadradic Runtime  b/c having to shift array elements over every time we insert.
    Space: O(n). Linear space complexity b/c temp array needed as strings are immutable in python.
    """
    char_arr = list(str.rstrip())
    for i in range(len(char_arr)):
        if char_arr[i] == ' ':
            char_arr[i] = '%'
            char_arr.insert(i+1,'2')
            char_arr.insert(i+2,'0')
    return ''.join(char_arr)

def urlify2(str):
    """
    Solution 2: Better
    Step thru string, building new string as you go. If char is space, append '%20' else append char.
    Time: O(n). Linear Runtime b/c append is constant time op.
    Space: O(n). Linear Aux Space.
    """
    char_arr = []
    for c in str.rstrip():
        if c == ' ':
            char_arr.append('%20')
        else:
            char_arr.append(c)
    return ''.join(char_arr)

def urlify3(str, true_length):
    """
    Solution 3: CtCI Solution
    Convert to Char array, and modify back-to-front by moving each character at i-(2*x) to i, where x is
    spaces in "true" string. Do this until all spaces are handled then stop.
    Back-to-front is common approach in string manipulation if we have an extra buffer at the end, because don't
    have to worry about overwriting (McDowell 194) so can do modification in-place to improve space complexity.
    Time: O(n). Conversion to array and inplace modification are both done in linear time: n + n(worst) -> O(n)
    Space: O(n). Still requires Linear aux space unless we are passed/return a char array, in which case O(1)
    """
    char_arr = list(str)
    spaces_remain = str.rstrip().count(' ')
    i = len(str)-1
    while spaces_remain > 0:
        if char_arr[i-2*spaces_remain] == ' ':
            char_arr[i] = '0'
            char_arr[i-1] = '2'
            char_arr[i-2] = '%'
            i -= 3
            spaces_remain -= 1
        else:
            char_arr[i] = char_arr[i-2*spaces_remain]
            i -= 1
    return ''.join(char_arr)

def urlify4(str):
    """
    Using Python Libraries
    """
    return str.rstrip().replace(' ', '%20')

"""
Test
"""
def test_urlify():
    assert urlify('Mr John Smith    ') == 'Mr%20John%20Smith'
def test_urlify2():
    assert urlify2('Mr John Smith    ') == 'Mr%20John%20Smith'
def test_urlify3():
    assert urlify3('Mr John Smith    ', 13) == 'Mr%20John%20Smith'
def test_urlify4():
    assert urlify4('Mr John Smith    ') == 'Mr%20John%20Smith'