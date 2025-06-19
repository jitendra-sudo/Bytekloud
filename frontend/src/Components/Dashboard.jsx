import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../Context/ContextProvider";
import TaskCard from "./TaskCard";
import { PiSpinner } from "react-icons/pi";

const Dashboard = () => {
	const { accessToken } = useContext(ContextAPI);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [deleteId, setDeleteId] = useState(null);
	const fetchData = async () => {
		setLoading(true)
		try {
			const res = await axios.get("http://localhost:3000/all", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			setData(res.data.tasks);
		} catch (error) {
			setError(error.response?.data?.message || "Something went wrong");
			setTimeout(() => setError(""), 2000);
		} finally {
			setLoading(false)
		}
	};

	const onDelete = async (taskId) => {
		setDeleteId(taskId);
		try {
			const res = await axios.delete(`http://localhost:3000/delete/${taskId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
			if (res.status === 200) {
				setMessage(res.data.message)
				setData((prev) => prev.filter(task => task._id !== taskId));
			}
			setTimeout(() => {
				setMessage("")
			}, 2000);
		} catch (error) {
			setError(error?.response?.data?.message || "something went wrong!!!")
		} finally {
			setDeleteId(null);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<h1 className="text-3xl font-bold text-center mb-6 text-blue-700 capitalize">{message ? message : "My Tasks"}</h1>
			{loading && <p className="min-h-screen text-center mt-10 text-blue-600 text-lg flex items-center gap-1 justify-center"><PiSpinner /> Loading...</p>}
			{error && <p className="text-center mt-10 text-red-500">{error}</p>}
			{!loading && !error && data.length === 0 && <p className="text-center text-gray-500">No tasks found. Start by adding one.</p>}
			{!loading && !error && data.length > 0 &&
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{data && data.map((task) => (
						<TaskCard {...task} key={task._id} isDeleting={deleteId === task._id} onDelete={onDelete} />
					))}
				</div>
			}
		</div>
	);
};

export default Dashboard;
