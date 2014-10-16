module.exports = {
	port: process.env.PORT || 8080,
	debug: (process.env.NODE_ENV && process.env.NODE_ENV.indexOf('prod') > -1) ? false : true
}