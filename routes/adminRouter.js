// routes/adminRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const adminRouter = Router()

const globalController = require("../controllers/globalController.js")

adminRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

adminRouter.use((err, req, res, next) => globalController.getErrorView(err, req, res, next))

module.exports = adminRouter
