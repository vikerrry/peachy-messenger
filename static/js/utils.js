let password_regex = new RegExp(".*?(([0-9]+?.*?[\!\%\$\#]+?)|([\!\%\$\#]+?.*?[0-9]+?)+?).*", "gi")

function parseQuery(url) {
	let res = {}
	let z = url.substr(url.indexOf("?")).substr(1)
	if (z.indexOf("#") != -1) {
		z = z.substr(0, z.indexOf("#"))
	}
	z = z.split("&")
	for (let x in z) {
		u = z[x].split('=');
		res[u[0]] = u[1]
	}
	return res
}

function getCookie(name) {
	var cookiestring = RegExp(name+"=[^;]+").exec(document.cookie);
	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function deepCopy(obj) {
	return JSON.parse(JSON.stringify(obj));
}

function isNickValid(nick) {
	return RegExp("[A-z0-9\_]{3,}").exec(nick)
}

function isPasswordValid(pass) {
	return pass.match(password_regex) && pass.length > 7
}

function checkInput(ev, validator) {
	if (validator(ev.value)) {
		ev.classList.remove("input_fail");
		ev.classList.add("input_ok");
	} else {
		ev.classList.remove("input_ok");
		ev.classList.add("input_fail");
	}
}
