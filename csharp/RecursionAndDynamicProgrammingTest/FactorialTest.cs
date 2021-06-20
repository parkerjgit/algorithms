using Microsoft.VisualStudio.TestTools.UnitTesting;
using RecursionAndDynamicProgramming;

namespace RecursionAndDynamicProgrammingTest
{
    [TestClass]
    public class FactorialTest
    {
        [TestMethod]
        public void TestTopDown()
        {
            var result = RecursionAndDynamicProgramming.Factorial.TopDown(9);
            Assert.AreEqual(result, 362880);
        }
    }
}