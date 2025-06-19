const handleSuccess = (res, status, message, data = {}) => {
	return res.status(status).json({
		success: true,
		message: message,
		...data
	});
}

const handleError = (res, status, message, data = {}) => {
	return res.status(status).json({
		success: false,
		message: message,
		...data
	});
}

export { handleSuccess, handleError };
