const dbMessages = require("../db/queries/messagesQueries")
const dbUsers = require("../db/queries/usersQueries")

async function getMessagesView (req, res, next, params) {
	let messages = await dbMessages.getAllMessages()
	for (const message of messages) {
		message.user = await dbUsers.getUser(message.user_id)
	}

	res.render("index", {
		title: params.route.title,
		messages,
		route: params.route,
		routes: params.routes,
	})
}

module.exports = {
	getMessagesView,
}
