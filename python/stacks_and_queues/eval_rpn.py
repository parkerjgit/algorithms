"""
Evaluate RPN Expressions (EPI 8.2)

question:
Write a program that takes an arithmetical expression in RPN (of the form 'A,B,op', where op is
arithmetic operator +, -, x, or /) and returns the number that the expression evaluates to,
e.g., '34+2x1+' evaluates to 15

source:
Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash., Elements of programming
interviews in Python: the insiders' guide (2017) 264.
"""


def eval_rpn(expression):

    def eval_rpn_tokens(tokens):

        print(tokens)

        ops = {'+': lambda x, y: x + y,
               '-': lambda x, y: x - y,
               '*': lambda x, y: x * y,
               '/': lambda x, y: x / y}

        # base case
        if len(tokens) == 1: return float(tokens[0])
        if len(tokens) == 2: raise ValueError("input must be a valid RPN expression")

        # recurse
        x = eval_rpn_tokens(tokens[:-2])
        y = float(tokens[-2])

        return ops[tokens[-1]](x, y)

    return eval_rpn_tokens(expression.split(','))

if __name__ == '__main__':

    print(eval_rpn('3,4,+,2,*,1,+'))