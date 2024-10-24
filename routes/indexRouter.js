// routes/indexRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const indexRouter = Router()

const indexController = require("../controllers/indexController.js")

const routes = [
	{
		url: "/",
		file: "index",
		title: "Allo le monde\u00a0?",
		linkTitle: "Maison",
	},
	{
		url: "/coucou",
		file: "coucou",
		title: "Coucou",
	},
	{
		url: "/odin",
		title: "Odin",
	},
]

indexRouter.get("/", (req, res, next) => {
	indexController.getView(req, res, next, { routes, route: routes[0] })
})

indexRouter.get("/coucou", (req, res, next) => {
	indexController.getView(req, res, next, { routes, route: routes[1] })
})

indexRouter.get("/odin", (req, res) => {
  res.redirect("https://www.theodinproject.com/lessons/nodejs-views#assignment")
})

indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

indexRouter.use((err, req, res, next) => indexController.getErrorView(err, req, res, next, { routes }))

module.exports = indexRouter
