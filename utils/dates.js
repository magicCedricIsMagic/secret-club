Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + (h * 60 * 60 * 1000))
	return this
}
Date.prototype.addMinutes = function (m) {
	return new Date(this.getTime() + (m * 60 * 1000))
}

function displayDate(date) {
	if (!date || !(date instanceof Date)) {
		return ""
	}
	const options = {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "Europe/Paris",
	}
	return date.toLocaleDateString("fr-FR", options)
}

function displayHour(date) {
	if (!date || !(date instanceof Date)) {
		return ""
	}
	const options = {
		hour: "numeric",
		minute: "numeric",
		timeZone: "Europe/Paris",
	}
	return date.toLocaleTimeString("fr-FR", options)
}

module.exports = { displayDate, displayHour }
