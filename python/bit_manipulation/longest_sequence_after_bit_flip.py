"""
question:
You have an integer and you can flip exactly one bit from a O to a 1. Write code to
find the length of the longest sequence of 1 s you could create.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions
and Solutions 6th Edition (2015) 194.
"""

def get_binary_sequences(number):
    """ compress binary representation of number into [1's, 0's, 1's, ...] sequence array """

    ones_count = 0
    sequences = []

    while number != 0:

        # check bit value
        bit = number & 1

        if bit == 0 and ones_count > 0:
            # end of a one's run
            sequences.append(ones_count)
            sequences.append(0)
            ones_count = 0
        elif bit == 0 and ones_count == 0:
            # leading one or consecutive zero
            sequences.append(0)
        else:
            # one's run in prog...
            ones_count += 1

        # get next bit
        number >> 1

    # append final sequence
    sequences.append(ones_count)

    return sequences

def get_max_window(arr):
    """ get max sum of sliding window of three consecutive items """

    max = 0
    i = 1
    while i < len(arr) - 1:

        # calc sum of items in window
        window_sum = sum(arr[i-1] + arr[i] + arr[i+1])

        # update max sum
        if window_sum > max: max = window_sum

    return max

def most_consecutive_ones(number):
    """ most consecutive ones in binary representation of an integer number after flipping a single bit """

    return get_max_window(get_binary_sequences(number)) + 1