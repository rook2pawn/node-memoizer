var test = require('tape');

test('memo output is consistent', function(t) {
  t.plan(2);  
  var memo = require('../index');
  var foo = function(x,y,z) { 
    return (x*y) + z;
  }
  var foo_memo = memo(foo);
  var bar = function(fn,y) { 
    return fn(y)
  };  
  var bar_memo = memo(bar);  
	t.equal(10,foo_memo(2,3,4));
	t.equal(10,foo_memo(2,3,4));
	t.end();
})
test('memo calculates only once', function(t) {
  t.plan(2);
  var memo = require('../index');
  var foo = function(x,y,z) {
    t.pass('only happens once'); 
    return (x*y) + z;
  }
  var foo_memo = memo(foo);
  foo_memo(2,3,4);
  foo_memo(2,3,4);
  foo_memo(2,3,4);
  t.pass('end');    
})
