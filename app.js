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

const indexRouter = require("./routes/indexRouter")

app.use("/", indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Écoutons sur le port ${PORT} !`))