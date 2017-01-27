var Treelib = require('treelib');
function Memoizer(fn) {
  var tree = Treelib();
  return function() {
    var lastKnownValue = undefined;
    var args = Array.from(arguments);
    if (tree.getValue(args) === undefined) {
      lastKnownValue = fn.apply(fn,args);
      tree.path(args).setValue(lastKnownValue);
    }
    return tree.getValue(args);
  }
}
module.exports = exports = Memoizer;
