import userModel from "../models/user.model.js";
import options from "../utils/options.js";
import { handleError, handleSuccess } from "../utils/ResponseHandler.js";
import { generateAccessToken } from "../utils/tokens.js";
import bcrypt from "bcrypt";

const userRegistration = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		if (!name || !email || !password) return handleError(res, 400, "❌ all fileds are required!!!!");

		const user = await userModel.findOne({ email }).select("-password");

		if (user) return handleError(res, 409, "❌ User already exist, Please Login")

		const hashPass = await bcrypt.hash(password, 10);

		const newUser = new userModel({ name, email, password: hashPass });

		await newUser.save();

		return handleSuccess(res, 201, `✅ Registration Successful`);
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`)
	}
}

const userLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) return handleError(res, 400, `❌ all fileds are required!!!!`);

		const user = await userModel.findOne({ email })

		if (!user) return handleError(res, 404, "❌ User not found, Please register first!!!");

		const checkPass = await bcrypt.compare(password, user.password);

		if (!checkPass) return handleError(res, 404, "❌ Invalid credentials!");

		const accessToken = generateAccessToken({ _id: user._id });

		res.cookie(accessToken, options());

		return handleSuccess(res, 200, `✅Login Successful`, {
			accessToken,
			user: {
				name: user.name,
				email: user.email,
				_id: user._id
			}
		});
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`)
	}
}


const getUser = async (req, res) => {
	const { _id } = req.params;
	try {
		const user = await userModel.findById(_id).select("-password");
		if (!user) return handleError(res, 404, `❌ User not found!`);

		return handleSuccess(res, 200, "", {
			data: {
				_id: user._id,
				email: user.email,
				name: user.name,
			}
		});
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`);
	}
}

const getAllUsers = async (req, res) => {
	try {
		const users = await userModel.find().select("-password");
		return handleSuccess(res, 200, "", {
			user: users
		});
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`);
	}
}

export { userRegistration, userLogin, getUser, getAllUsers };
