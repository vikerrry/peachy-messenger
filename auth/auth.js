const utils = require('./../utils')

const main_data_dir = '/var/peachy'

utils.createIfNoExists(main_data_dir)

const auth_data_dir = main_data_dir + '/users/'
const salt_file = main_data_dir + '/salt'

utils.createIfNoExists(auth_data_dir)

if (!utils.exists(salt_file)) {
	console.log("Salt file (" + salt_file + ") isn't exists")
	process.exit(1);
}

const password_salt = utils.readFileAsString(salt_file)

console.log(password_salt)

module.exports = {
	register: function (name, last_name, nick, password) {
		response.end("Not yet implemented")
	},
	auth: function (nick, password) {
		response.end("Not yet implemented")
	}
};
