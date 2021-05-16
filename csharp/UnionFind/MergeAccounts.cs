using System;
using System.Collections.Generic;
using System.Linq;

namespace UnionFind
{
    public class Solution
    {
        public IList<IList<string>> MergeAccounts(IList<IList<string>> accounts)
        {
            var parents = new Dictionary<string, string>();
            var names = new Dictionary<string, string>();

            string Find(string id)
            {
                if (parents[id] != id)
                {
                    parents[id] = Find(parents[id]);
                }

                return parents[id];
            }

            void Union(string a, string b)
            {
                string rootA = Find(a);
                string rootB = Find(b);

                parents[rootB] = rootA;
            }

            // initialize nodes
            foreach (IList<string> account in accounts)
            {
                string name = account[0];
                for (int i = 1; i < account.Count; i++)
                {
                    string email = account[i];
                    parents[email] = email;
                    names[email] = name;
                }
            }

            // build graph
            foreach (IList<string> account in accounts)
            {
                string firstEmail = account[1];
                for (int i = 2; i < account.Count; i++)
                {
                    string nextEmail = account[i];
                    Union(firstEmail, nextEmail);
                }
            }

            // map primary email to all emails belonging to same person (including primary)
            var allEmails = new Dictionary<string, List<string>>();
            foreach (string email in parents.Keys.ToList())
            {
                string primaryEmail = Find(email);

                if (!allEmails.ContainsKey(primaryEmail))
                {
                    allEmails[primaryEmail] = new List<string>();
                }

                allEmails[primaryEmail].Add(email);
            }

            // format output
            IList<IList<string>> result = new List<IList<string>>();
            foreach (KeyValuePair<string, List<string>> entry in allEmails)
            {
                string root = entry.Key;
                List<string> emails = entry.Value;

                emails.Sort(StringComparer.Ordinal);
                emails.Insert(0, names[root]);
                result.Add(emails);
            }

            return result;
        }
    }
}
