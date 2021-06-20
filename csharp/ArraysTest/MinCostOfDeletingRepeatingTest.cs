using Microsoft.VisualStudio.TestTools.UnitTesting;
using Arrays;

namespace ArraysTest
{
    [TestClass]
    public class MinCostOfDeletingRepeatingTest
    {
        [TestMethod]
        public void TestMinCostOfDeletingRepeating()
        {
            int result = MinCostOfDeletingRepeating.Solve("abaac", new int[] { 1, 2, 3, 4, 5 });
            Assert.AreEqual(result, 3);
        }
    }
}