var translation = {
	"messenger":		{"ru": "Мессенджер", "en": "Messenger"},
	"join_us":			{"ru": "Присоединяйтесь", "en": "Join Us!"},
	"sign_in":			{"ru": "Авторизируйтесь", "en": "Sign In"},
	"description":		{"ru": "Новая эра мессенджеров - приложений для мгновенного обмена сообщениями.", "en": "New era of messengers - instant messaging applications."},
	"or":				{"ru": "или", "en": "or"},
	"sign_in_title":	{"ru": "Вход", "en": "Sign In"},
	"join_us_title":	{"ru": "Регистрация", "en": "Registration"},
	"sign_last_name":	{"ru": "Фамилия", "en": "Last name"},
	"sign_name":		{"ru": "Имя", "en": "Name"},
	"sign_nick":		{"ru": "Никнейм", "en": "Nickname"},
	"sign_password":	{"ru": "Пароль", "en": "Password"},
	"sign_signup":		{"ru": "Зарегистрироваться", "en": "Sign Up"},
	"back":				{"ru": "Назад", "en": "Back"},
	"to_main":			{"ru": "На главную страницу", "en": "To main page"},
	"pass_desc":		{"ru": "от 8 символов, среди которых хотя бы одна цифра и символ из набора #, $, %, !",
						 "en": "8 characters minimum with 1 digit and char from set: #, $, %, !"},
	"nick_desc":		{"ru": "от 3 символов: заглавные и строчные буквы английского алфавита, цифры, подчеркивания",
						 "en": "3 characters minimum: digits, capital and lowercase letters, underlines"},
	"signup_desc":		{"ru": "Нажимая \"зарегистрироваться\" вы принимаете условия",
						 "en": "By pressing \"sign up\" you accept conditions of"},
	"signup_agree":		{"ru": "пользовательского соглашения",
						 "en": "terms of use"},
}

var page_translate = {
	"#description":			"description",
	"#or":					"or",
	"#join_us_btn":			"join_us",
	"#sign_in_btn":			"sign_in",
	"#signup-last-name":	"sign_last_name",
	"#signup-name":			"sign_name",
	"#signup-nick":			"sign_nick",
	"#signup-password":		"sign_password",
	"#signup-signup":		"sign_signup",
	"#signup-main":			"to_main",
	"#signup-pass_desc":	"pass_desc",
	"#signup-nick_desc":	"nick_desc",
	"#signup-desc":			"signup_desc",
	"#signup-desc_agree":	"signup_agree",
}

var available_langs = ["ru", "en"]

var default_language = "ru"

function translate(name, lang) {
	return translation[name][lang] || "Еще не переведено"
}

function translatePage() {
	for (let x in page_translate) {
		document.querySelector(x).innerText = translate(page_translate[x], app.lang);
	}
}

function setLanguage() {
	if (typeof app.query.lang !== "undefined") {
		document.cookie = "lang=" + app.query.lang
	}
	let new_lang = getCookie("lang")
	if (available_langs.includes(new_lang)) {
		app.lang = new_lang
	} else {
		app.lang = default_language
	}
}

function setLang(lang) {
	app.query.lang = lang
	setLanguage()
	translatePage()
}