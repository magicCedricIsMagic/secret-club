const bcrypt = require("bcryptjs")
const { addUser } = require("../db/queries/usersQueries")
const { addUserCredential } = require("../db/queries/userCredentialsQueries")

async function createUser(req, res, next) {
	bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
		try {
			const newUser = await addUser({
				surname: req.body.surname,
				name: req.body.name,
				membership_status_id: 2, // TODO
			})
			await addUserCredential({
				mail: req.body.mail,
				password: hashedPassword,
				user_id: newUser.id,
			})
			res.redirect("/")
		}
		catch (err) {
			return next(err)
		}
	})
}

module.exports = {
	createUser,
}
