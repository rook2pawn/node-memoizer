exports = module.exports = Memoizer;
var Treelib = require('treelib');

function Memoizer(fn) {
	var args = {};
	var tree = Treelib();
	var foo = function() {
		var args = [].slice.call(arguments,0);
		if (tree.getValue(args) === undefined) {
			args.forEach(function(val) {
				if (typeof val == 'function')
					val = val.toString();
			});
			tree.path(args).setValue(fn.apply(fn,arguments));
		} else {
			// cached value is being used! hooray!
		}
		return tree.getValue(args);
	};
	return foo;
};
