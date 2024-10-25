// routes/adminRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const adminRouter = Router()

const usersController = require("../controllers/usersController.js")

/* adminRouter.get("/:id", (req, res, next) => {
	usersController.getMyAccountView(req, res, next)
}) */

adminRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

adminRouter.use((err, req, res, next) => usersController.getErrorView(err, req, res, next))

module.exports = adminRouter
