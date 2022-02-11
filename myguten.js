//Columns
function setBlockColumnsClassName(className, blockName) {
	return blockName === "core/columns"
		? "wp-block-columns container"
		: className;
}

function setBtnClassName(className, blockName) {
	return blockName === "yohdev/button" ? "btn" : className;
}

// Adding the filter
wp.hooks.addFilter(setBlockColumnsClassName, setBtnClassName);
