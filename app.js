require("dotenv").config()

const express = require("express")
const path = require("path")

const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.use(session({ secret: "elephants", resave: false, saveUninitialized: false }))
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { displayDate, displayHour } = require("./utils/dates")
app.locals.displayDate = displayDate
app.locals.displayHour = displayHour

const { getUser } = require('./db/queries/usersQueries')
const { getUserCredentialByMail, getUserCredential } = require('./db/queries/userCredentialsQueries')
const { getMembershipStatus } = require('./db/queries/membershipStatusesQueries')

passport.use(
  new LocalStrategy(async (username, password, callback) => {
    try {
      const userCredential = await getUserCredentialByMail(username)

      if (!userCredential) {
        return callback(null, false, { message: "E-mail Incorrect" })
      }
      const match = await bcrypt.compare(password, userCredential.password)
      if (!match) {
        return callback(null, false, { message: "Mot de passe incorrect" })
      }
      return callback(null, userCredential)
    }
    catch (err) {
      console.error(err)
      return callback(err)
    }
  })
)

passport.serializeUser((userCredential, callback) => {
  callback(null, userCredential.id)
})

passport.deserializeUser(async (id, callback) => {
  try {
    const userCredential = await getUserCredential(id)
    callback(null, userCredential)
  }
  catch (err) {
    callback(err)
  }
})

app.use(async (req, res, next) => {
  res.locals.user = undefined
  if (req.user?.user_id) {
    const user = await getUser(req.user.user_id)
		const membershipStatus = await getMembershipStatus(user.membership_status_id)
    res.locals.user = {
			...user,
			mail: req.user.mail,
			membershipStatus,
		}
  }
  next()
})

const allRoutes = [
	{
		url: "/",
		file: "index",
		title: "Tous les messages",
		linkTitle: "Accueil",
	},
	{
		url: "/log-in",
		file: "log-in-form",
		title: "Connexion",
	},
	{
		url: "/sign-up",
		file: "sign-up-form",
		title: "Inscription",
	},
	{
		url: "/my-account",
		file: "my-account",
		title: "Mon compte",
	},
	{
		url: "/my-account/validate",
		file: "validate-my-account",
		title: "Valider mon compte",
	},
	{
		url: "/log-out",
		title: "Déconnexion",
	},
]

app.use((req, res, next) => {
	if (res.locals?.user) {
		res.locals.routes = allRoutes.filter((route) => !["/log-in", "/sign-up"].includes(route.url))
	}
	else {
		res.locals.routes = allRoutes.filter((route) => !["/log-out", "/my-account"].includes(route.url))
	}
	if (!res.locals.user || res.locals.user.membershipStatus.slug !== "unvalidated" ) {
		res.locals.routes = res.locals.routes.filter((route) => route.url !== "/my-account/validate")
	}
	next()
})

const adminRouter = require("./routes/adminRouter")
const accountRouter = require("./routes/accountRouter")
const messagesRouter = require("./routes/messagesRouter")
const rootRouter = require("./routes/rootRouter")

app.use("/admin", adminRouter)
app.use("/my-account", accountRouter)
app.use("/messages", messagesRouter)
app.use("/", rootRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))