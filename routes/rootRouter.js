// routes/rootRouter.js
const { Router } = require("express")
const passport = require("passport")
const rootRouter = Router()
const CustomError = require("../utils/CustomError")
const { body, validationResult  } = require("express-validator")
const userCredentialsQueries = require("../db/queries/userCredentialsQueries")

const globalController = require("../controllers/globalController.js")
const messagesController = require("../controllers/messagesController.js")
const usersController = require("../controllers/usersController.js")

rootRouter.get("/", messagesController.getMessagesView)

rootRouter.get("/log-in", globalController.getView)

rootRouter.get("/sign-up", globalController.getView)

rootRouter.post(
	"/log-in",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/log-in",
		// failureMessage: true,
	})
)

const passwordMinLength = 8
rootRouter.post(
	"/sign-up",
	body("mail")
		.custom(async (value) => {
			const foundMail = await userCredentialsQueries.getUserCredentialByMail(value)
			if (foundMail) throw new Error(/* "Cette adresse e-mail est déjà utilisée" */)
		})
		.withMessage("Cette adresse e-mail est déjà utilisée"),
	body("password")
		.isLength({ min: passwordMinLength })
		.withMessage(`Votre mot de passe doit contenir au moins ${passwordMinLength} caractères`),
	body("password")
		.matches(/[a-z]/)
		.withMessage(`Votre mot de passe doit contenir une minuscule`),
	body("password")
		.matches(/[A-Z]/)
		.withMessage(`Votre mot de passe doit contenir une majuscule`),
	body("password")
		.matches(/\d/)
		.withMessage(`Votre mot de passe doit contenir un chiffre`),
	body("password")
		.matches(/[^a-zA-Z\d]/)
		.withMessage(`Votre mot de passe doit contenir un symbole`),
  body("password_confirm")
		.custom((value, { req }) => value === req.body.password)
		.withMessage("Les mots de passes ne sont pas identiques"),
	async (req, res, next) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return globalController.getFormErrorView(req, res, next, {
				errors: errors.array(),
        previousForm: {
					name: req.body.name,
          surname: req.body.surname,
          mail: req.body.mail,
        }
			})
		}
		else {
			return await usersController.createUser(req, res, next)
		}
	}
)

rootRouter.get("/log-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
		res.redirect("/")
	})
})

rootRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

rootRouter.use((err, req, res, next) => {
	globalController.getErrorView(err, req, res, next)
})

module.exports = rootRouter
