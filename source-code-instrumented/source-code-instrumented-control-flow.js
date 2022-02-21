// ANALYSIS

const advice = ({
	apply: (f, t, xs) => {
		return Reflect.apply(f, t, xs);
	},
	get: (o, k) => {
		return Reflect.get(o, k);
	},
	set: (o, k, v) => {
		return Reflect.set(o, k, v);
	},
	read: (vl, _vr) => {
		return vl;
	},
	write: (vl, _vr) => {
		return vl;
	},
});

// INSTRUMENTED SOURCE CODE

function ack(m, n) {
  if (m == 0) {
    return n + 1;
  }

  if (n == 0) {
    return advice.apply(ack, this, [m - 1, 1]);
  }

  return advice.apply(ack, this, [m - 1, advice.apply(ack, this, [m, n - 1])]);
}

function fib(n) {
  if (n < 2) {
    return 1;
  }
  return advice.apply(fib, this, [n - 2]) + advice.apply(fib, this, [n - 1]);
}

function tak(x, y, z) {
  if (y >= x) {
    return z;
  }
  return advice.apply(tak, this, [
    advice.apply(tak, this, [x - 1, y, z]),
    advice.apply(tak, this, [y - 1, z, x]),
    advice.apply(tak, this, [z - 1, x, y]),
  ]);
}

function main() {
  let a = 0;
  let b = 0;
  let c = 0;
  for (let i = 0; i < 10; i++) {
    for (let i = 3; i <= 4; i++) {
      a = a + advice.apply(ack, this, [3, i]);
      b = b + advice.apply(fib, this, [17 + i]);
      c = c + advice.apply(tak, this, [3 * i + 3, 2 * i + 2, i + 1]);
    }
  }
  return a + b + c;
}

main();
