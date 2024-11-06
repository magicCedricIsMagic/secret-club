const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // use SSL
	auth: {
		user: process.env.MAIL_ADDRESS,
		pass: process.env.MAIL_PASSWORD,
	},
})

async function sendMail({ from = { name, mail }, to = [], subject, text, html }) {
	try {
		const mailInfos = await transporter.sendMail({
			from: `"${from.name}" <${from.mail}>`, // sender address
			to: to.join(", "), // list of receivers
			subject,
			text,
			html
		})

		console.log("Message sent: %s", mailInfos.messageId)
	}
	catch (err) {
		console.error(err)
	}
}

async function sendMemberPasswordMail(req, res, next, { user }) {
	await sendMail({
		from: {
			name: "L'Admin Secret du Secret Club",
			mail: "cedrictravailletresdur@gmail.com"
		},
		to: [user.mail],
		subject: "Bienvenue au Secret Club",
		html: `
			<p>Cher ${user.surname} ${user.name},</p>
			<p>Merci d'entrer ce mot de passe secret&nbsp;: <strong>${process.env.SECRET_PASSWORD}</strong></p>
			<a href="${req.protocol}://${req.headers.host}/my-account/validate">Ici</a>
		`
	})
}

module.exports = {
	sendMemberPasswordMail,
}