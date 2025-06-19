import mongoose from "mongoose";
const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
			lowercase: true
		},
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true,
		}
	}, { timestamps: true }
)

const userModel = mongoose.model("User", userSchema)

export default userModel;

