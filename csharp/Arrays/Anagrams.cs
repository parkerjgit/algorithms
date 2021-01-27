using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arrays
{
    /*
        Methods for solving, and related to, the following problem: 

        Given two strings, write a function to check if strings are anagrams of each other. 
        Anagrams are a strings that contains the same characters in different order.
        Source: Ctci
    */
    public static class Anagrams
    {
        /* 
            Checks if two strings are anagrams of each other by counting frequency of each character
            in first string and decrementing the count for each character in second string. If count 
            of any character is zero before decrement, then characters do not occur with same frequency 
            in the two strings, i.e. they are not anagrams. 

            Params: Two strings.
            Returns: True if strings are anagrams of each other.

            Time Complexity: ~2n -> O(n), where n is length of one string, and strings are equal length.  
            Space Complexity: ~26 -> O(1), where 26 corresponds to number of letters in the alphabet.
        */
        public static bool IsAnagram(string s1, string s2)
        {
            // anagrams are equal in length
            if (s1.Length != s2.Length)
            {
                return false;
            }

            // initialize char frequencies to 0
            Dictionary<char, int> char_counts = new Dictionary<char, int>();
            foreach (char c in Enumerable.Range('a', 26).Select(i => (char)i))
            {
                char_counts[c] = 0;
            }

            // increment char counts for s1
            foreach (char c in s1)
            {
                char_counts[Char.ToLower(c)]++;
            }

            // decrement char conts for s2 if anagram still possibility
            foreach (char c in s2)
            {
                if (char_counts[Char.ToLower(c)] <= 0)
                {
                    // char does not occur with same frequency in s2 and s1
                    return false;
                }
                else
                {
                    char_counts[Char.ToLower(c)]--;
                }
            }

            return true;
        }
    }
}
