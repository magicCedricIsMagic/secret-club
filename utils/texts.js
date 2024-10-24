const sanitize = (string) => string.replace(/(<([^>]+)>)/gi, "")

module.exports = { sanitize }
