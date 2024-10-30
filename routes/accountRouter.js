// routes/accountRouter.js
const { Router } = require("express")

const CustomError = require("../utils/CustomError")
const accountRouter = Router()
const globalController = require("../controllers/globalController.js")
// const usersController = require("../controllers/usersController.js")

accountRouter.use((req, res, next) => {
	if (!res.locals.user) {
		res.redirect("/log-in")
	}
	else next()
})

accountRouter.get("/", globalController.getView)

accountRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

accountRouter.use((err, req, res, next) => globalController.getErrorView(err, req, res, next))

module.exports = accountRouter