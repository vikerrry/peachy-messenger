var translition = {
	"messenger" : {"ru": "Мессенджер", "en": "Messenger"},
	"join_us" : {"ru": "Присоединяйтесь!", "en": "Join Us!"},
	"sign_in" : {"ru": "Войдите", "en": "Sign In"},
	"description" : {"ru": "Новая эра мессенджеров - приложений для мгновенного обмена сообщениями.", "en": "New era of messengers - instant messaging applications."},
	"or" : {"ru": "или", "en": "or"},
	"sign_in_title" : {"ru": "Вход", "en": "Sign In"},
	"join_us_title" : {"ru": "Регистрация", "en": "Registration"},
}

var page_translate = {
	"#description": "description",
	"#or": "or",
	"#join_us": "join_us",
	"#sign_in": "sign_in",
}

var available_langs = ["ru", "en"]

function parseLocation() {
	let res = {}
	let z = location.search.substr(1).split("&");
	for (let x in z) {
		u = z[x].split('=');
		res[u[0]] = u[1]
	}
	return res
}

var app = {"title" : "Peachy", "title_sub" : "messenger", "lang" : "en", "query": parseLocation()};

function translatePage() {
	for (let x in page_translate) {
		document.querySelector(x).innerText = translition[page_translate[x]][app.lang];
	}
}

function updatePageContext() {
	translatePage();
	document.title = app.title + " - " + translition[app.title_sub][app.lang];
}

function ready() {
	if (typeof app.query.lang !== "undefined") {
		document.cookie = "lang=" + app.query.lang
	}
	console.log(document.cookie)
	if (document.cookie == "") {
		showCookieAgreement();
	} else {
		let new_lang = getCookie("lang")
		if (available_langs.includes(new_lang)) {
			app.lang = new_lang
		} else {
			app.lang = "ru"
		}
	}
	updatePageContext();
}

function joinUs() {
	hideWelcome()
	app.title_sub = "join_us_title"
	updatePageContext()
}

function signIn() {
	hideWelcome()
	app.title_sub = "sign_in_title"
	updatePageContext()
}

function hideWelcome() {
	document.querySelector("#welcome_landing").style.display = "none";
}

function getCookie(name) 
{
	var cookiestring = RegExp(name+"=[^;]+").exec(document.cookie);
	return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function showCookieAgreement() {
	document.querySelector("#cookie-agreement").style.display = "block";
}

function cookieAgree() {
	document.cookie = "cookie_agree=1";
	document.querySelector("#cookie-agreement").style.display = "none";
}

document.addEventListener("DOMContentLoaded", ready);