exports = module.exports = Memoizer;
var EE = require('events').EventEmitter;
var Treelib = require('treelib');
function Memoizer(fn) {
  var args = {};
  var tree = Treelib();
  var lastKnownValue = undefined;
  var countCache = 0;
  var foo = function() {
    var args = [].slice.call(arguments,0);
    if (tree.getValue(args) === undefined) {
      lastKnownValue = fn.apply(fn,arguments);
      tree.path(args).setValue(lastKnownValue);
      tree.show()
    } else {
      countCache++;
    }
		return tree.getValue(args);
	};
  foo.update = function(args, val) {
      tree.path(args).setValue(val);
      return foo;
  };
	return foo;
};
