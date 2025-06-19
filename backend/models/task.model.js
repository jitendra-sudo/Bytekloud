import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
	task: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	priority : {
		type: String,
		required: true
	}
}, { timestamps: true });

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;