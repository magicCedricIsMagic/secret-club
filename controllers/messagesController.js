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

async function createMessage(req, res, next) {
	if (res.locals.user) {
		try {
			await dbMessages.addMessage({
				text: req.body.text,
				user_id: res.locals.user.id,
			})
			res.redirect("/")
		}
		catch (err) {
			return next(err)
		}
	}
}

async function deleteMessage(req, res, next, messageId) {
	try {
		await dbMessages.deleteMessage(messageId)
	}
	catch (err) {
		return next(err)
	}
}

module.exports = {
	getMessagesView,
	createMessage,
	deleteMessage,
}
