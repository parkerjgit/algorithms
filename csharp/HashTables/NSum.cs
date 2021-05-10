using System;
using System.Collections.Generic;

namespace HashTables
{
    public static class NSum
    {
        public static int[] TwoSum(int[] nums, int target)
        {
            var dict = new Dictionary<int, int>();

            for (int i = 0; i < nums.Length; i++)
            {
                if (dict.ContainsKey(target - nums[i])) // checks if compliment is in dict
                {
                    return new int[] { dict[target - nums[i]], i };
                }
                else if (!dict.ContainsKey(nums[i])) // handles duplicates in array
                {
                    dict.Add(nums[i], i);
                }
            }

            return null;
        }

        public static int[] ThreeSum(int[] nums, int target)
        {
            for (int i = 0; i < nums.Length; i++)
            {
                var dict = new Dictionary<int, int>();

                for (int j = i; j < nums.Length; j++)
                {
                    var complement = target - nums[i] - nums[j];

                    if (dict.ContainsKey(complement))
                    {
                        return new int[] { i, dict[complement], j };
                    }
                    else if (!dict.ContainsKey(complement))
                    {
                        dict.Add(nums[j], j);
                    }
                }
            }

            return null;
        }
    }
}
