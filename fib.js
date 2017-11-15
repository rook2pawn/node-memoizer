var memo = require('./index');

const fib = (n) => {
  return n < 2 ? n : fib(n-1) + fib (n-2)
};

const fibNumber = 15;

const memoFib = memo(fib);

memo(fibNumber);
