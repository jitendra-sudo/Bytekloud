import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";

const AddTask = () => {
	const { accessToken, updateTask, setUpdateTask } = useContext(ContextAPI);
	const [task, setTask] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault();

		try {
			const newTask = {
				task,
				description,
				priority,
				taskId: updateTask ? updateTask._id : undefined
			};
			let res;
			if (!updateTask) {
				res = await axios.post("https://bytekloud.onrender.com/add", newTask, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
				if (res.status === 201) {
					setMessage(res.data.message || "Task added successfully");
				}
			} else {
				res = await axios.put("https://bytekloud.onrender.com/edit", newTask, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
				if (res.status === 200) {
					setMessage(res.data.message || "Task updated")
				}
			}
			setTask("");
			setDescription("");
			setPriority("Low");
			setTimeout(() => {
				setMessage("");
				setUpdateTask(null)
				navigate("/dashboard");
			}, 2000);
		} catch (error) {
			setError(error.response.data.message || "something went wrong!!!");
			setTimeout(() => {
				setError("")
			}, 2000);
		} finally {
			setLoading(false)
		}
	};

	useEffect(() => {
		if (updateTask) {
			setTask(updateTask.task)
			setDescription(updateTask.description)
			setPriority(updateTask.priority)
		} else {
			setTask("")
			setDescription("")
			setPriority("")
		}
	}, [updateTask])

	return (
		<div className="my-8 flex items-center justify-center">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
				style={{ boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}
			>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-2xl font-bold text-center">{updateTask ? "Update Task" : "Add Task"}</h2>
					{error && <div className="capitalize rounded-md px-2 py-1 bg-red-300 flex items-center gap-1 font-bold">{error}</div>}
					{loading && <div className="capitalize rounded-md px-2 py-1 bg-yellow-300 flex items-center gap-1 font-bold"><PiSpinner />Adding...</div>}
					{message && <div className="capitalize rounded-md px-2 py-1 bg-green-300 flex items-center gap-1 font-bold">{message}</div>}
				</div>

				<div className="mb-4">
					<label className="block mb-1 text-gray-600">Task Name</label>
					<input
						type="text"
						value={task}
						onChange={(e) => setTask(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block mb-1 text-gray-600">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						rows="4"
						required
					></textarea>
				</div>

				<div className="mb-6">
					<label className="block mb-1 text-gray-600">Priority</label>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>	<option value="">select</option>
						<option value="Low">Low</option>
						<option value="High">High</option>
					</select>
				</div>

				<button
					type="submit"
					className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
				>
					{"Submit"}
				</button>
				<button
					type="button"
					onClick={() => { setUpdateTask(null); navigate("/dashboard") }}
					className="cursor-pointer mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default AddTask;
