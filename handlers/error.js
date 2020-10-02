function errorHandler(error, req, res, next) {
	// Takes error message & status
	return res.status(error.status || 500).json({
		// Formats as JSON message for legibility
		error: {
			message: error.message || "Sorry, an unidentified error occurred!",
			status: error.status,
		},
	});
}

module.exports = errorHandler;
