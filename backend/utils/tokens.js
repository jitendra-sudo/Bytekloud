import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccessToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY_ACCESS_TOKEN, { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY_TIME}` });
}

const VerifyToken = (payload) => {
	return jwt.verify(payload, process.env.JWT_SECRET_KEY_ACCESS_TOKEN);
}

export { generateAccessToken, VerifyToken };
