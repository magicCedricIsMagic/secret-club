// routes/rootRouter.js
const { Router } = require("express")
const passport = require("passport")
const rootRouter = Router()
const CustomError = require("../utils/CustomError")

const globalController = require("../controllers/globalController.js")
const messagesController = require("../controllers/messagesController.js")
const usersController = require("../controllers/usersController.js")

const allRoutes = [
	{
		url: "/",
		file: "index",
		title: "Tous les messages",
		linkTitle: "Accueil",
	},
	{
		url: "/log-in",
		file: "log-in-form",
		title: "Connexion",
	},
	{
		url: "/sign-up",
		file: "sign-up-form",
		title: "Inscription",
	},
	{
		url: "/log-out",
		title: "Déconnexion",
	},
]
let routes = allRoutes

rootRouter.use((req, res, next) => {
	if (res.locals?.currentUser) {
		routes = allRoutes.filter((route) => !["/log-in", "/sign-up"].includes(route.url))
	}
	else {
		routes = allRoutes.filter((route) => route.url !== "/log-out")
	}
	next()
})

rootRouter.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
})

rootRouter.get("/", (req, res, next) => {
	messagesController.getMessagesView(req, res, next, { routes, route: routes[0] })
})

for (const route of routes) {
	rootRouter.get(route.url, (req, res, next) => {
		globalController.getView(req, res, next, { routes, route })
	})
}

rootRouter.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/sign-up",
		// failureMessage: true,
	})
)

rootRouter.post("/sign-up", async (req, res, next) => await usersController.createUser(req, res, next))


rootRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

rootRouter.use((err, req, res, next) => globalController.getErrorView(err, req, res, next, { routes }))

module.exports = rootRouter
