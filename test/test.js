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

test('async',function(t) {
  t.plan(5)
  var count = 0
  var foo = function(x,y,z,cb) { 
    count++
    setTimeout(function() {
      var a = (x*y) + z
      cb((x*y) + z)
    },20)
  }
  var foo_memoized = memo(foo,true);
  foo_memoized(2,3,4);
  t.equals(count,1)
  setTimeout(function() {
    var x = foo_memoized(2,3,4);
    t.equals(count,1)
    t.equals(x,10)
    setTimeout(function() {
      var x = foo_memoized(2,3,4);
      t.equals(count,1)
      t.equals(x,10)
    },100)
  },100)

})
