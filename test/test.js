var test = require('tape');
var memo = require('../index');
var foo = function(x,y,z) { return (x*y) + z }
var bar = function(fn,y) { return fn(y)};
var foo_memoized = memo(foo);
var bar_memoized = memo(bar);
test('basic', function(t) {
	t.plan(2);
	t.equal(10,foo_memoized(2,3,4));
	t.equal(10,foo_memoized(2,3,4));
	t.end();
})
