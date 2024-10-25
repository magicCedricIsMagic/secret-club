// routes/messagesRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")
const messagesRouter = Router()
const messagesController = require("../controllers/messagesController.js")

/* messagesRouter.get("/add", (req, res, next) => {
	messagesController.getAddMessageView(req, res, next)
}) */

messagesRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

messagesRouter.use((err, req, res, next) => messagesController.getErrorView(err, req, res, next))

module.exports = messagesRouter
