exports.getLastArg = function(fn) {
	var fnstr = fn.toString();
	var args = fnstr.match(/function\s*\((.+?)\)\s*{/);
	if (args === null) {
		args = fnstr.match(/function\s*[a-zA-Z_$][0-9a-zA-Z_$]*\s*\((.+?)\)\s*{/);
	}
	if (args !== null) {
		var argstr = args[1];
		var lastArg = argstr.slice(argstr.lastIndexOf(',')+1).trim();
		if (lastArg !== null) 
			return lastArg;
	} else {
		return undefined;
	}
};
exports.doesObjectCallMethod = function(fn,objstr,methodstr) {
	var fnstr = fn.toString();
	// we check here because there objstr is usually
	// set from getLastArg which may return undefined
	// on a function () with no params
	if (objstr === undefined) { return false; }
	var index = fnstr.indexOf(objstr + '.' + methodstr);
	if (index > 0) {
		return true;
	}
	return false;
};
