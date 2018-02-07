using Microsoft.VisualStudio.TestTools.UnitTesting;
using Arrays;

namespace ArraysTest
{
    [TestClass]
    public class AnagramTest
    {
        [TestMethod]
        public void TestIsAnagram()
        {
            bool result = Anagrams.IsAnagram("abc", "bcaj");
            Assert.IsTrue(result);
        }
    }
}
