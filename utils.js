const fs = require('fs')

module.exports = {
	createIfNoExists: function (path) {
		if (!fs.existsSync(path)) {
			console.log(path)
			fs.mkdirSync(path)
		}
	},
	exists: function (path) {
		return fs.existsSync(path)
	},
	readFileAsString: function (path) {
		return fs.readFileSync(path, "utf-8")
	}
};
