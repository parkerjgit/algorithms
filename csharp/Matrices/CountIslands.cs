using System;

namespace Matrices
{
    /*
        Methods for solving, and related to, the following problem:

        Given an m x n 2D binary grid grid which represents a map of '1's (land)
        and '0's (water), return the number of islands. An island is surrounded
        by water and is formed by connecting adjacent lands horizontally or
        vertically. You may assume all four edges of the grid are all surrounded
        by water.

        Source: Number of Islands (lc 200) - https://leetcode.com/problems/number-of-islands/
    */
    public static class CountIslands
    {
        public static int SolveDFT(char[][] grid)
        {
            int m = grid.Length;
            int n = grid[0].Length;
            int count = 0;

            for (int r = 0; r < m; r++)
            {
                for (int c = 0; c < n; c++)
                {
                    if (grid[r][c].Equals('1'))
                    {
                        count++;
                        Fill(r, c, grid);
                    }
                }
            }

            return count;
        }

        public static void Fill(int row, int col, char[][] grid)
        {
            int m = grid.Length;
            int n = grid[0].Length;

            // out of bounds
            if (row < 0 || row >= m || col < 0 || col >= n)
            {
                return;
            }

            // already filled
            if (grid[row][col].Equals('0'))
            {
                return;
            }

            // fill this cell
            grid[row][col] = '0';

            int[][] DELTA = {
                new int[] {0, 1},
                new int[] {0, -1},
                new int[] {1, 0},
                new int[] {-1, 0}
            };

            // fill neighbors
            foreach (int[] d in DELTA)
            {
                Fill(row + d[0], col + d[1], grid);
            }
        }
    }
}
