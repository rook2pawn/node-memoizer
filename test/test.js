var memo = require('../index');
var foo = function(x,y,z) { return (x*y) + z }
var bar = function(fn,y) { return fn(y)};
var foo_memoized = memo(foo);
var bar_memoized = memo(bar);
exports.testStoreAndFetch = function(test) {
	test.expect(4);
	test.equal(10,foo_memoized(2,3,4));
	test.equal(10,foo_memoized(2,3,4));
	test.equal(307,bar_memoized(function(val) { return val + 300 },7));
	test.equal(307,bar_memoized(function(val) { return val + 300 },7));
	test.done();
};

var x = function(a,b,c,memo){
	var value = 42;
	memo.done(arguments,value);
};
var y = memo(x);
exports.testAsynchronousStoreAndFetch = function(test) {
	test.expect(3);
	test.equal(42,y('aay','beee','seee'));
	setTimeout(function() {
		test.equal(42,y('aay','beee','seee'));
		test.notEqual(43,y('aay','beee','seee'));
		test.done();
	},250);
}	
