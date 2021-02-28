/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
  let prev = Number.NEGATIVE_INFINITY;
  
  const inorder = (root) => {
      if (!root)
          return true;
          
      if (!inorder(root.left))
          return false;

      // visit node
      if (root.val <= prev) {
          return false;
      } else {
          prev = root.val;
      }

      return inorder(root.right)

  }
  
  return inorder(root);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
  let prev = Number.NEGATIVE_INFINITY,
      isValid = true;
  
  const inorder = (root) => {
      if (root && isValid) {
          inorder(root.left);
          
          if (root.val <= prev) {
              isValid = false;
          } else {
              prev = root.val;
          }
          
          inorder(root.right);
      }
  }
  
  inorder(root);
  return isValid;
};