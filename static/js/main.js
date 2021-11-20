var app = {"title" : "Peachy", "sub_title" : "messenger", "lang" : "en", "ready": false, "currentPage": "welcome"};

/*
*/

function ready() {
	app.query = parseQuery(location.href);
	setLanguage()
	if (document.cookie == "") {
		showCookieAgreement()
	}
	showCurrentPage()
	translatePage()
	setState()
}


function showCookieAgreement() {
	document.querySelector("#cookie-agreement").style.display = "block";
}

document.addEventListener("DOMContentLoaded", ready);