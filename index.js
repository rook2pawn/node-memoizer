var Treelib = require('treelib');
function Memoizer(fn,isAsync) {
  var collapsefns = []
  var tree = Treelib();
	var f = function() {
    var lastKnownValue = undefined;
    var args = [].slice.call(arguments,0);
    var mapped = args.map(function(val,idx) {
      if (collapsefns[idx] !== undefined)
        return collapsefns[idx](val)
      else 
        return val
    })
    var cb = function(val) {
      lastKnownValue = val
      tree.path(mapped).setValue(lastKnownValue);
    }
    if (isAsync) {
      if (tree.getValue(mapped) === undefined) {
        args.push(cb)
        fn.apply(fn,args)
      } else {
        return tree.getValue(mapped);
      }
    } else {
      if (tree.getValue(mapped) === undefined) {
        lastKnownValue = fn.apply(fn,args);
        tree.path(mapped).setValue(lastKnownValue);
      }
      return tree.getValue(mapped);
    }
  }
  f.collapse = function(idx,fn) {
    collapsefns[idx] = fn
  }
  return f
}
module.exports = exports = Memoizer;
