let depth = "";

({
    apply: ($function, $this, $args) => {
		console.log(`${depth}${$function.name}(${$args.join(", ")})`);
        depth += ".";
        const res = Reflect.apply($function, $this, $args);
        depth = depth.substring(1);
        console.log(`${depth}${res}`);
		return res;
	},
})