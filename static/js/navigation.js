
var to_hide = ["#welcome_landing", "#join_us", "#sign_in", "#page404"];

function openWelcome() {
	app.sub_title = "messenger"
	document.querySelector("#welcome_landing").style.display = "block"
}

function openLogin() {
	app.sub_title = "sign_in_title"
	document.querySelector("#sign_in").style.display = "block"
}

function openJoinUs() {
	app.sub_title = "join_us_title"
	document.querySelector("#join_us").style.display = "block"
}

var pageNavigation = {
	"welcome": {"back" : openWelcome, "open": openWelcome},
	"sign_in": {"back": openLogin, "open": openLogin},
	"join_us": {"back": openJoinUs, "open": openJoinUs}
};

function showCurrentPage(method = "open") {
	if (!app.query["do"]) {
		app.query["do"] = "welcome"
	}
	
	for (let i in to_hide) {
		try {
			document.querySelector(to_hide[i]).style.display = "none"
		} catch (e) {
			console.warn("Can't find " + to_hide[i])
		}
	}

	if (!pageNavigation[app.query["do"]]) {
		show404()
		return
	}
	if (document.cookie == "") {
		return
	}
	pageNavigation[app.query["do"]][method]()
	showTitle()
}

function showTitle() {
	document.title = app.title + " - " + translate(app.sub_title, app.lang)
}

function show404() {
	document.querySelector("#page404").style.display = "block"
}

function setState() {
	history.replaceState(deepCopy(app), document.title, location.href)
}

function openPage(url) {
	app.query = parseQuery(url)
	showCurrentPage()
	history.pushState(deepCopy(app), document.title, url)
}

window.onpopstate = function (event) {
    if (event.state) {
    	app = event.state
		app.query = parseQuery(event.currentTarget.location.href)
		showCurrentPage()
    }
};