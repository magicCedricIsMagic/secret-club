// const CustomError = require("../utils/CustomError")
// const dbUsers = require("../db/queries/usersQueries")

function getView (req, res, next) {
	const route = res.locals.routes.find(route => route.url === req.originalUrl)
	res.render(route.file, {
		title: route.title,
		route,
	})
}

function getErrorView (err, req, res, next) {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
	})
}


module.exports = {
	getView,
	getErrorView,
}
