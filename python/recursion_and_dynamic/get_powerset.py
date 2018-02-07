"""
question:
Write a method to return all subsets of a set.

source:
McDowell, Gayle Laakmann., Cracking the Coding Interview: 189 Programming Questions and Solutions 6th Edition (2015) 348.
"""

def get_powerset(S):
    """ get all subsets of set S """



def get_powerset2(S):
    """ see combinatoric solution on pg 349 """

    subsets = []

    # 2^n = 2**n = 1 << n
    n = len(S)
    max = 1 << n

    # generate all 2^n subsets