function cookieAgree() {
	document.cookie = "cookie_agree=1";
	document.querySelector("#cookie-agreement").style.display = "none";
	openPage(location.href)
}

function mainPage() {
	openPage("/")
}

function joinUsBtn() {
	openPage("/?do=join_us")
}

function signInBtn() {
	openPage("/?do=sign_in")
}