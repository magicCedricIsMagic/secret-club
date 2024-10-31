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
			const newMessage = await dbMessages.addMessage({
				text: req.body.text,
				user_id: res.locals.user.id,
			})
			console.log(newMessage)
			res.redirect("/")
		}
		catch (err) {
			return next(err)
		}
	}
}

module.exports = {
	getMessagesView,
	createMessage,
}
