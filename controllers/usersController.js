const bcrypt = require("bcryptjs")
const { addUser, updateUser, deleteUser } = require("../db/queries/usersQueries")
const {
	addUserCredential,
	updateUserMail,
	getUserCredentialByUserId,
} = require("../db/queries/userCredentialsQueries")

async function createUser(req, res, next) {
	bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
		try {
			const newUser = await addUser({
				surname: req.body.surname,
				name: req.body.name,
				color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // random color
				membership_status_id: 2, // TODO
			})
			const newUserCredential = await addUserCredential({
				mail: req.body.mail,
				password: hashedPassword,
				user_id: newUser.id,
			})
			req.login(newUserCredential, (err) => {
        if (err) { return next(err) }
        res.redirect("/")
      })

		}
		catch (err) {
			return next(err)
		}
	})
}

async function modifyUser(req, res, next) {
	try {
		console.log("res.locals.user", res.locals.user)
		await updateUser({
			id: res.locals.user.id,
			surname: req.body.surname,
			name: req.body.name,
			photo_url: req.body.photo,
			color: req.body.color,
			membership_status_id: res.locals.user.membership_status_id,
		})
		const userCredentials = await getUserCredentialByUserId(res.locals.user.id)
		console.log("res.userCredentials", userCredentials)
		await updateUserMail({
			id: userCredentials.id,
			mail: req.body.mail,
		})
		res.redirect("/my-account")
	}
	catch (err) {
		return next(err)
	}
}

async function removeUser(req, res, next) {
	try {
		req.logout((err) => { if (err) return next(err) })
		await deleteUser(res.locals.user.id)
		res.redirect("/")
	}
	catch (err) {
		return next(err)
	}
}

module.exports = {
	createUser,
	modifyUser,
	removeUser,
}
