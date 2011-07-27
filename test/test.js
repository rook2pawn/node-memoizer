var memo = require('../index');
var foo = function(x,y,z) { return (x*y) + z }
var bar = function(fn,y) { return fn(y)};
var foo_memoized = Memoizer(foo);
var bar_memoized = Memoizer(bar);

console.log(foo_memoized(2,3,4)); // 10, calculates it
console.log(foo_memoized(2,3,4)); // 10 instantly!
console.log(bar_memoized(function(val) { return val + 300 },7));
console.log(bar_memoized(function(val) { return val + 300 },7));

