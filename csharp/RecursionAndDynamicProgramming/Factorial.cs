using System;

namespace RecursionAndDynamicProgramming
{
    public class Factorial
    {
        public static int TopDown (int n)
        {
            int[] memo = new int[n+1]; // prefill w/ zeros
            memo[0] = 1;

            int GetFactorial(int m) {

                // memoize if not already
                if (memo[m] == 0)
                {
                    memo[m] = m * GetFactorial(m-1);
                };

                return memo[m];
            }

            return GetFactorial(n);
        }
    }
}
