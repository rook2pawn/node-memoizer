exports = module.exports = Memoizer;
var EE = require('events').EventEmitter;
var Treelib = require('treelib');
var argfunctions = require('./argfunctions');
function Memoizer(fn) {
	var args = {};
	var tree = Treelib();
	var emitter = new EE;	
	emitter.on('done', function(pathargs,value){ 
		tree.path(pathargs).setValue(value);
	});
	var getLastArg = argfunctions.getLastArg;
	var doesObjectCallMethod = argfunctions.doesObjectCallMethod;
	var memo = function() {};
	var foo = function() {
		var args = [].slice.call(arguments,0);
		if (tree.getValue(args) === undefined) {
			args.forEach(function(val) {
				if (typeof val == 'function')
					val = val.toString();
			});
			if (doesObjectCallMethod(fn, getLastArg(fn), 'done')) {
				var x = memo.bind(fn);
				x.done = function() { 
					var args = [].slice.call(arguments[0],0);
					var pathargs = args.slice(0,args.length-1);;
					var value = arguments[arguments.length-1];
					emitter.emit('done',pathargs,value);
				};
				fn.apply(fn,args.concat(x));
			} else {
				tree.path(args).setValue(fn.apply(fn,arguments));
			}
		} else {
			// cached value is being used! hooray!
		}
		return tree.getValue(args);
	};
	foo.lastArg = function(fn) {
		return getLastArg(fn);
	};
	foo.doesObjectCallMethod = function(fn,objstr,methodstr) {
		return doesObjectCallMethod(fn,objstr,methodstr)
	};
	return foo;
};
