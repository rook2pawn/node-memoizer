var Treelib = require('treelib');
function Memoizer(fn) {
  var tree = Treelib();
  return function() {
    var lastKnownValue = undefined;
    var args = Array.from(arguments);
    if (tree.getListValue(args) === undefined) {
      lastKnownValue = fn.apply({}, args);
      tree.pathListAndSetValue(args,lastKnownValue);
    }
    return tree.getListValue(args);
  }
}
module.exports = exports = Memoizer;
