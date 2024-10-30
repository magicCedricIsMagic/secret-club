// const CustomError = require("../utils/CustomError")
// const dbUsers = require("../db/queries/usersQueries")

function getView (req, res, next, params) {
	res.render(params.route.file, {
		title: params.route.title,
		route: params.route,
		routes: params.routes,
	})
}

function getErrorView (err, req, res, next, params) {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
		routes: params.routes,
	})
}


module.exports = {
	getView,
	getErrorView,
}
