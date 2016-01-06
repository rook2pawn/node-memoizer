exports = module.exports = Memoizer;
var Treelib = require('treelib');
function Memoizer(fn,isAsync) {
  var args = {};
  var tree = Treelib();
  var lastKnownValue = undefined;
  var foo = function() {
    var args = [].slice.call(arguments,0);
    var cb = function(val) {
      lastKnownValue = val
      args.pop()
      tree.path(args).setValue(lastKnownValue);
    }
    if (isAsync) {
      if (tree.getValue(args) === undefined) {
        args.push(cb)
        fn.apply(fn,args)
      } else {
        return tree.getValue(args);
      }
    } else {
      if (tree.getValue(args) === undefined) {
        lastKnownValue = fn.apply(fn,args);
        tree.path(args).setValue(lastKnownValue);
      }
      return tree.getValue(args);
    }
	};
  foo.update = function(args, val) {
    tree.path(args).setValue(val);
    return foo;
  };
	return foo;
};
