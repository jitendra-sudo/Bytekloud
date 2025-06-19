const options = (key) => {
	return {
		httpOnly: true,
		sameSite: "none",
		secure: true,
		maxAge: key === "logout" ? 0 : 24 * 60 * 60 * 1000
	}
}
export default options; 

