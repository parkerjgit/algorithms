"""
Test a string for well-formedness (EPI 8.3)

question:
xxx

source:
Aziz, Adnan, Tsung-Hsien Lee, and Amit Prakash., Elements of programming
interviews in Python: the insiders' guide (2017) 102.
"""


def validate_wellformedness(str_to_validate):

    bracket_stack = []
    open_brackets = {"[", "(", "{"}
    closed_brackets = {"]", ")", "}"}
    # open_to_close_map = dict(zip(open_brackets, closed_brackets))
    open_to_close_map = {
        "[": "]",
        "(": ")",
        "{": "}"
    }

    for c in str_to_validate:
        if c in open_brackets:
            bracket_stack.append(c)
        elif c in closed_brackets:
            if not bracket_stack or open_to_close_map[bracket_stack.pop()] != c:
                return False
        # else not a bracket, skip

    return not bracket_stack


def test_validate_wellformedness():
    assert validate_wellformedness('{[][a(b){cd}]e}') == True
    assert validate_wellformedness('{[][a(b){cd}]e}[') == False
    assert validate_wellformedness('{[][a(b){cd)]e}') == False
    assert validate_wellformedness('{[][a(b){cd}]e}]') == False
