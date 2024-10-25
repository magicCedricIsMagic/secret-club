// routes/accountRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const accountRouter = Router()

const usersController = require("../controllers/usersController.js")

/* accountRouter.get("/:id", (req, res, next) => {
	usersController.getMyAccountView(req, res, next)
}) */

accountRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

accountRouter.use((err, req, res, next) => usersController.getErrorView(err, req, res, next))

module.exports = accountRouter
