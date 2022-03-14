({
  apply: ($function, $this, $args) => {
    console.log(`Calling: ${$function.name}(${$args.join(", ")})`);
    return Reflect.apply($function, $this, $args);
  },
  get: ($object, $key) => {
    console.log(`Getting: ${$object}[${$key}]`);
    return Reflect.get($object, $key);
  },
  set: ($object, $key, $value) => {
    console.log(`Setting: ${$object}[${$key}] = ${$value}`);
    return Reflect.set($object, $key, $value);
  },
  read: ($value, $variable) => {
    console.log(`Reading: ${$variable} // evaluates to ${$value}`);
    return $value;
  },
  write: ($value, $variable) => {
    console.log(`Writing: ${$variable} = ${$value}`);
    return $value;
  },
  unary: ($op, $arg) => {
    console.log(`Unary: ${$op} ${$arg}`);
    switch ($op) {
      case "-":
        return -$arg;
      case "+":
        return +$arg;
      case "!":
        return !$arg;
      case "~":
        return ~$arg;
      case "void":
        return void $arg;
      case "typeof":
        return typeof $arg;
    }
  },
  binary: ($op, $left, $right) => {
    console.log(`Binary: ${$left} ${$op} ${$right}`);
    switch ($op) {
      case "+":
        return $left + $right;
      case "-":
        return $left - $right;
      case "*":
        return $left * $right;
      case "**":
        return $left ** $right;
      case "/":
        return $left / $right;
      case "%":
        return $left % $right;
      case "&":
        return $left & $right;
      case "|":
        return $left | $right;
      case "^":
        return $left ^ $right;
      case "<<":
        return $left << $right;
      case ">>":
        return $left >> $right;
      case ">>>":
        return $left >>> $right;
      case "==":
        return $left == $right;
      case "!=":
        return $left != $right;
      case "===":
        return $left === $right;
      case "!==":
        return $left !== $right;
      case ">":
        return $left > $right;
      case ">=":
        return $left >= $right;
      case "<":
        return $left < $right;
      case "<=":
        return $left <= $right;
      case "in":
        return $left in $right;
      case "instanceof":
        return $left instanceof $right;
      case "&&":
        return $left && $right;
      case "||":
        return $left || $right;
      case "??":
        return $left ?? $right;
    }
  },
  primitive: ($value) => {
    console.log(`Primitive: ${$value}`);
    return $value;
  },  
});
