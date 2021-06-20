using System;
namespace Arrays
{
    public class MinCostOfDeletingRepeating
    {
        public static int Solve(string s, int[] cost)
        {
            int result = 0;
            bool isRepeating = false;
            int max = cost[0];          // max of repeating
            int sum = cost[0];          // cumulative sum of repeating run

            for (int i = 1; i <= s.Length; i++)
            {
                if (i < s.Length && s[i] == s[i - 1])
                {
                    sum += cost[i];
                    isRepeating = true;
                    max = Math.Max(max, cost[i]);
                }
                else
                {
                    if (isRepeating)
                    {
                        // end run
                        result += (sum - max);
                    }

                    if (i < s.Length)
                    {
                        // reset
                        max = cost[i];
                        sum = max;
                        isRepeating = false;
                    }
                }
            }
            return result;
        }
    }
}
