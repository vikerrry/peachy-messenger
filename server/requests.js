const url = require("url")
const staticController = require("./static_controller")
const querystring = require('querystring');

let compile = (reg) => { return new RegExp(reg, 'gi'); }

let RouteRules = [
	[compile("^\\/$"), staticController.requestFile],
	[compile("^/static/.*"), staticController.requestFile]
];

function route(path, query, data, response) {
	let found = false;
	for (let x in RouteRules) {
		if (path.match(RouteRules[x][0])) {
			found = true;
			RouteRules[x][1](path, query, data, response);
			break;
		}
	}
	if (!found) {
		response.statusCode = 404;
		response.end("");
	}
}

module.exports = {
  processRequest: function (request, response) {
  	const request_url = url.parse(request.url)
  	const query = querystring.parse(request_url.query)
  	route(request_url.path, query, "", response)
  },
};
