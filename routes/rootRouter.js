// routes/rootRouter.js
const { Router } = require("express")
const CustomError = require("../utils/CustomError")

const rootRouter = Router()

const messagesController = require("../controllers/messagesController.js")
const usersController = require("../controllers/usersController.js")

rootRouter.get("/", (req, res, next) => {
	messagesController.getMessagesView(req, res, next)
})

rootRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

rootRouter.use((err, req, res, next) => usersController.getErrorView(err, req, res, next))

module.exports = rootRouter
