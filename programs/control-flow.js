// The Computer Language Shootout
// http://shootout.alioth.debian.org/
// contributed by Isaac Gouy

function ack(m, n) {
  if (m == 0) {
    return n + 1;
  }

  if (n == 0) {
    return ack(m - 1, 1);
  }

  return ack(m - 1, ack(m, n - 1));
}

function fib(n) {
  if (n < 2) {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}

function tak(x, y, z) {
  if (y >= x) {
    return z;
  }
  return tak(tak(x - 1, y, z), tak(y - 1, z, x), tak(z - 1, x, y));
}

function main() {
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 0; i < 10; i++) {
    for (let i = 3; i <= 4; i++) {
      a = a + ack(3, i);
      b = b + fib(17 + i);
      c = c + tak(3 * i + 3, 2 * i + 2, i + 1);
    }
  }
  return a + b + c;
}

main();
