({
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
  unary: (op, arg) => {
    switch (op) {
      case "-":
        return -arg;
      case "+":
        return +arg;
      case "!":
        return !arg;
      case "~":
        return ~arg;
      case "void":
        return void arg;
      case "typeof":
        return typeof arg;
    }
  },
  binary: (op, left, right) => {
    switch (op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "**":
        return left ** right;
      case "/":
        return left / right;
      case "%":
        return left % right;
      case "&":
        return left & right;
      case "|":
        return left | right;
      case "^":
        return left ^ right;
      case "<<":
        return left << right;
      case ">>":
        return left >> right;
      case ">>>":
        return left >>> right;
      case "==":
        return left == right;
      case "!=":
        return left != right;
      case "===":
        return left === right;
      case "!==":
        return left !== right;
      case ">":
        return left > right;
      case ">=":
        return left >= right;
      case "<":
        return left < right;
      case "<=":
        return left <= right;
      case "in":
        return left in right;
      case "instanceof":
        return left instanceof right;
      case "&&":
        return left && right;
      case "||":
        return left || right;
      case "??":
        return left ?? right;
    }
  },
  primitive: ($value) => {
    return $value;
  },
});
