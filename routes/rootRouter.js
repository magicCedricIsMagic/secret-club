// routes/rootRouter.js
const { Router } = require("express")
const passport = require("passport")
const rootRouter = Router()
const CustomError = require("../utils/CustomError")

const globalController = require("../controllers/globalController.js")
const messagesController = require("../controllers/messagesController.js")
const usersController = require("../controllers/usersController.js")

rootRouter.get("/", messagesController.getMessagesView)

rootRouter.get("/log-in", globalController.getView)

rootRouter.get("/sign-up", globalController.getView)

rootRouter.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/sign-up",
		// failureMessage: true,
	})
)

rootRouter.post("/sign-up", async (req, res, next) => await usersController.createUser(req, res, next))

rootRouter.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
})

rootRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

rootRouter.use((err, req, res, next) => {
	globalController.getErrorView(err, req, res, next)
})

module.exports = rootRouter
