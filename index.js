exports = module.exports = Memoizer;
var Treelib = require('treelib');

function Memoizer(fn) {
	var args = {};
	var tree = Treelib();
	var foo = function() {
		var args = [].slice.call(arguments,0);
		if (tree.getValue(args) === undefined) {
			args.forEach(function(val) {
				if (typeof val == 'function') {
					val = val.toString();
				}
			});
			tree.path(args).setValue(fn.apply(fn,arguments));
		} else {
			console.log("Using optimization!");
		}
		tree.show();
		return tree.getValue(args);
	};
	return foo;
};
var foo = function(x,y,z) { return (x*y) + z }
var bar = function(fn,y) { return fn(y)};
var foo_memoized = Memoizer(foo);
var bar_memoized = Memoizer(bar);
console.log(foo_memoized(2,3,4)); // 10, calculates it
console.log(foo_memoized(2,3,4)); // 10 instantly!
console.log(bar_memoized(function(val) { return val + 300 },7));
console.log(bar_memoized(function(val) { return val + 300 },7));

