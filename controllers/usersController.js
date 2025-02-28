const bcrypt = require("bcryptjs")
const usersQueries = require("../db/queries/usersQueries")
const membershipStatusesQueries = require("../db/queries/membershipStatusesQueries")
const {
	addUserCredential,
	updateUserMail,
	getUserCredentialByUserId,
} = require("../db/queries/userCredentialsQueries")
const { sendMemberPasswordMail } = require('./mailerController')

async function createUser(req, res, next) {
	bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
		try {
			const membershipStatuses = await membershipStatusesQueries.getAllMembershipStatuses()
			const newUser = await usersQueries.addUser({
				surname: req.body.surname,
				name: req.body.name,
				color: "#" + ("000000" + Math.random().toString(16).slice(2, 8)).slice(-6), // random color
				membership_status_id: (membershipStatuses.find(mS => mS.slug === "unvalidated")).id,
			})
			const newUserCredential = await addUserCredential({
				mail: req.body.mail,
				password: hashedPassword,
				user_id: newUser.id,
			})

			req.login(newUserCredential, async (err) => {
				if (err) {
					return next(err)
				}
				await sendMemberPasswordMail(req, res, next, {
					user: {
						...newUser,
						mail: newUserCredential.mail
					}
				})
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
		await usersQueries.updateUser({
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

async function validateUser(req, res, next) {
	if (req.body.secret_validation_code === process.env.SECRET_PASSWORD) {
		try {
			const membershipStatuses = await membershipStatusesQueries.getAllMembershipStatuses()
			await usersQueries.updateUser({
				...res.locals.user,
				membership_status_id: (membershipStatuses.find(mS => mS.slug === "member")).id,
			})
			res.redirect("/")
		}
		catch (err) {
			return next(err)
		}
	}
	else {
		res.redirect("/my-account/validate")
	}
}

async function removeUser(req, res, next) {
	try {
		req.logout((err) => { if (err) return next(err) })
		await usersQueries.deleteUser(res.locals.user.id)
		res.redirect("/")
	}
	catch (err) {
		return next(err)
	}
}

module.exports = {
	createUser,
	modifyUser,
	validateUser,
	removeUser,
}
