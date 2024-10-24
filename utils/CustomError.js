class CustomError extends Error {
	constructor(title, message, statusCode) {
		super(message)
		this.name = title || "Error"
		this.statusCode = statusCode || 404
	}
}

module.exports = CustomError
