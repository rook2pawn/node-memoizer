memoizer - f2 = memo(f); f2 is now fully memoized!
==================================================
From [Wikipedia] [wikipedia-memo]
	
In computing, memoization is an optimization technique used primarily to speed up computer programs by having function calls avoid repeating the calculation of results for previously-processed inputs.

example:

    var memo = require('memoizer');
    var f = function(x,y,z) { return ((x + 1) * y) + z };
    
    var f2 = memo(f);

    // now f2 is fully memoized!

    f2(2,3,4);
    
    >> 13

    f2(2,3,4);
    
    >> 13 // but instantly from cache!

[wikipedia-memo]: http://en.wikipedia.org/wiki/Memoization

Usage
=====

memo(your_function)
-------------------

memo takes a function, memoizes it, and the return value is a fully-memoized version of your function, bam!

Async memo(your_function,isAsync)
=================================
Simply use the callback before you pass it into memo

    var myfn = function(x,y,cb) {
      cb(x+y) 
    }; 

    var memo_myfn = memo(myfn,true)


.collapse
=========
For functions that take objects, provide a collapse function
by calling .collapse(argument_index, fn)

    var memo = require('memoizer');
    var f = function(obj) { return ((obj.x + 1) * obj.y) + obj.z };
    var f2 = memo(f);

    f2.collapse(0,function(obj) {
      return obj.x + ':' + obj.y + ':' + obj.z
    })
