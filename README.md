[![Build Status](https://travis-ci.org/rook2pawn/node-memoizer.svg?branch=master)](https://travis-ci.org/rook2pawn/node-memoizer)

var f2 = memo(f)
================

f2 is now memoized.


async
=====

Simply add a cb to your function to be memoized as the last argument, then

    var f2 = memo(f,true)


.collapse
=========
For functions that take objects, provide a collapse function
by calling .collapse(argument_index, fn)

    f2.collapse(0,function(obj) {
      return Object.keys(obj).join(':')
    })


LICENSE
=======

MIT
