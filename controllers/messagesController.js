// const CustomError = require("../utils/CustomError")
const dbMessages = require("../db/queries/messagesQueries")
const dbUsers = require("../db/queries/usersQueries")

function getView (req, res, next, params) {
	res.render(params.fileName)
}

function getErrorView (err, req, res, next, params) {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		error: err,
	})
}

async function getMessagesView (req, res, next, params) {
	let messages = await dbMessages.getAllMessages()
	for (const message of messages) {
		message.user = await dbUsers.getUser(message.user_id)
	}
	res.render("index", {
		title: "Tous les messages",
		messages,
	})
}

module.exports = {
	getView,
	getErrorView,
	getMessagesView,
}
