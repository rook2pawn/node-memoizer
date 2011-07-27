memoizer - f2 = memo(f); f2 is now fully memoized!
==================================================
From [Wikipedia] [wikipedia-memo]
<pre>
	In computing, memoization is an optimization technique used primarily to speed up computer programs by having function calls avoid repeating the calculation of results for previously-processed inputs.
</pre> 

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
