// routes/messagesRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")
const messagesRouter = Router()
const messagesController = require("../controllers/messagesController.js")
const globalController = require("../controllers/globalController.js")

messagesRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

messagesRouter.post("/add", messagesController.createMessage)

messagesRouter.post("/:id/delete", (req, res, next) => {
	const messageId = req.params?.id
	if (res.locals.user?.membershipStatus.slug === "admin" && messageId) {
		messagesController.deleteMessage(req, res, next, messageId)
		res.redirect("/")	
	}
	else {
		throw new CustomError(
			"Non autorisé", 
			"Vous n'êtes pas autorisé à supprimer ce message.", 
			400
		)
	}
})

messagesRouter.use((err, req, res, next) => globalController.getErrorView(err, req, res, next))

module.exports = messagesRouter
