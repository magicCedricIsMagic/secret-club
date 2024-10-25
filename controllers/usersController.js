// const CustomError = require("../utils/CustomError")
// const dbUsers = require("../db/queries/usersQueries")

function getView (req, res, next, params) {
	res.render(params.route.file, {
		title: params.route.title,
	})
}

function getErrorView (err, req, res, next, params) {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
	})
}

module.exports = {
	getView,
	getErrorView,
}
