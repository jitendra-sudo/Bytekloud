import taskModel from "../models/task.model.js";
import userModel from "../models/user.model.js";
import { handleError, handleSuccess } from "../utils/responseHandler.js";

const addTasks = async (req, res) => {
	const { task, description, priority } = req.body;
	const { _id } = req.user;
	try {
		if (!task || !description || !priority) return handleError(res, 401, "❌ all fileds are required!!!!");

		const user = await userModel.findById(_id).select("-password");

		if (!user) return handleError(res, 401, "❌ User not found, Please Login")

		const newTask = new taskModel({ task, description, priority, user: _id });

		await newTask.save();

		return handleSuccess(res, 201, `✅ task added!!`);
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`)
	}
}

const getAllTask = async (req, res) => {
	const { _id } = req.user;
	try {
		const user = await userModel.findById(_id).select("-password");
		if (!user) return handleError(res, 401, "❌ User not found, Please Login")
		// const getAllTasks = await taskModel.find();
		return handleSuccess(res, 200, "", { tasks: await taskModel.find() });
	} catch (error) {
		return handleError(res, 500, `⚠️ Error: ${error.message}`)

	}
}

const editTask = async (req, res) => {
	const { _id } = req.user;
	const { taskId, task, description, priority } = req.body;
	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) return handleError(res, 401, "❌ User not found, Please Login")

		const exitingTask = await taskModel.findById(taskId);
		if (!exitingTask) return handleError(res, 401, "❌ task not found")
		if (task) exitingTask.task = task
		if (description) exitingTask.description = description
		if (priority) exitingTask.priority = priority

		await exitingTask.save()

		return handleSuccess(res, 200, `✅ task edited!!`);
	} catch (error) {

		return handleError(res, 500, `⚠️ Error: ${error.message}`)
	}
}

const deteleTask = async (req, res) => {
	const { _id } = req.user;
	const { taskId } = req.params;
	try {
		const user = await userModel.findById(_id).select("-password");

		if (!user) return handleError(res, 401, "❌ User not found, Please Login")
		const exitingTask = await taskModel.findById(taskId);
		if (!exitingTask) return handleError(res, 401, "❌ task not found")

		await taskModel.findByIdAndDelete(taskId);

		return handleSuccess(res, 200, `✅ task deleted!!`);
	} catch (error) {

		return handleError(res, 500, `⚠️ Error: ${error.message}`)
	}
}

export { addTasks, getAllTask, editTask, deteleTask };
