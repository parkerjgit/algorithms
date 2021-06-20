using System;

namespace Math
{
    public class Robot
    {
        public bool IsRobotBounded(string instructions)
        {
            int[,] DIRECTIONS = { { 0, 1 }, { 1, 0 }, { 0, -1 }, { -1, 0 } };
            int[] pos = { 0, 0 };
            int dir = 0;

            foreach (char instr in instructions)
            {
                switch (instr)
                {
                    case 'L':
                        dir = (dir + 3) % 4;
                        break;
                    case 'R':
                        dir = (dir + 1) % 4;
                        break;
                    case 'G':
                        pos[0] += DIRECTIONS[dir, 0];
                        pos[1] += DIRECTIONS[dir, 1];
                        break;
                }
            }

            // robot returns into initial position or robot doesn't face north
            return (pos[0] == 0 && pos[1] == 0) || (dir != 0);
        }
    }
}
