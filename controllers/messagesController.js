const dbMessages = require("../db/queries/messagesQueries")
const dbUsers = require("../db/queries/usersQueries")

async function getMessagesView (req, res, next) {
	const route = res.locals.routes.find(route => route.url === req.originalUrl)
	let messages = await dbMessages.getAllMessages()
	for (const message of messages) {
		message.user = await dbUsers.getUser(message.user_id)
	}
	res.render("index", {
		title: route.title,
		messages,
		route,
	})
}

module.exports = {
	getMessagesView,
}
