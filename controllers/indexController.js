const getView = (req, res, next, params) => {
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
	})
}

const getErrorView = (err, req, res, next, params) => {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
		links: params.routes,
	})
}

module.exports = {
	getView,
	getErrorView,
}
