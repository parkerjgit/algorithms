using Microsoft.VisualStudio.TestTools.UnitTesting;
using HashTables;

namespace HashTablesTest
{
    [TestClass]
    public class TwoSumTest
    {
        [TestMethod]
        public void Test1()
        {
            int[] result = NSum.TwoSum(new int[] { 2, 4, 5, 6, 7, 8, 9 }, 16);

            Assert.AreEqual(4, result[0]);
            Assert.AreEqual(6, result[1]);
        }
    }

    [TestClass]
    public class ThreeSumTest
    {
        [TestMethod]
        public void Test1()
        {
            int[] result = NSum.ThreeSum(new int[] { 2, 4, 5, 6, 7, 8, 9 }, 24);

            Assert.AreEqual(4, result[0]);
            Assert.AreEqual(5, result[1]);
            Assert.AreEqual(6, result[2]);
        }
    }
}
