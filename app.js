require("dotenv").config()

const express = require("express")
const path = require("path")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true })) /* Pour pouvoir décoder texte envoyé via POST */
app.use(express.json()) /* Pour pouvoir décoder json envoyé via POST */

const { displayDate, displayHour } = require("./utils/dates")
app.locals.displayDate = displayDate
app.locals.displayHour = displayHour

const adminRouter = require("./routes/adminRouter")
const accountRouter = require("./routes/accountRouter")
const messagesRouter = require("./routes/messagesRouter")
const rootRouter = require("./routes/rootRouter")

app.use("/admin", adminRouter)
app.use("/my-account", accountRouter)
app.use("/messages", messagesRouter)
app.use("/", rootRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Écoutons sur le port ${PORT} !`))