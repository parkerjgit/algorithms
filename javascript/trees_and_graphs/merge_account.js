/*

source: Accounts Merge (leetcode 721) - https://leetcode.com/problems/accounts-merge
*/

// union-find solution based heavily on: https://www.youtube.com/watch?v=E8EKDyGtRN0
var accountsMerge = function (accounts) {
  const parents = {}; // email -> parent (root b/c collapsed)
  const names = {}; // email -> name

  const find = (x) => {

      // collapse
      if (parents[x] !== x) {
          parents[x] = find(parents[x]);
      }

      // collapsed, so returning root
      return parents[x];
  };

  const union = (x, y) => {
      parents[find(y)] = find(x);
  };

  // initialize nodes
  for (let [name, ...emails] of accounts) {
      for (let email of emails) {
          parents[email] = email; // no-op if email already initialized
          names[email] = name;
      }
  }

  // build graph, ie perform unions
  for (let [_, firstEmail, ...restOfEmails] of accounts) {
    for (let email of restOfEmails) {
        union(firstEmail, email);
    }
  }

  
  let allEmails = {}; // root -> all emails (including root)
  for (let email of Object.keys(parents)) {
      let root = find(email);
      if (root in allEmails) {
          allEmails[root].push(email);
      } else {
          allEmails[root] = [email];
      }
  }

  let result = [];
  for (let [root, emails] of Object.entries(allEmails)) {
    result.push([names[root], ...emails.sort()])
  }
  return result;
};