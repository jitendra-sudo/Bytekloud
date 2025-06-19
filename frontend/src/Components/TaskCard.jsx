import { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { PiSpinner } from "react-icons/pi";
import { ContextAPI } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
const TaskCard = ({ _id, task, description, priority, createdAt, isDeleting, onDelete }) => {
	const { setUpdateTask } = useContext(ContextAPI);
	const navigate = useNavigate();

	const formattedDate = new Date(createdAt).toLocaleDateString();

	return (
		<div className="bg-white p-4 rounded-lg shadow-md mb-4">
			<div className="flex justify-between items-center mb-2">
				<h3 className="text-xl font-semibold">{task}</h3>
				<span
					className={`text-sm px-2 py-1 rounded-full ${priority === "High" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
						}`}
				>
					{priority}
				</span>
			</div>

			<p className="text-gray-700 mb-2">{description}</p>

			<p className="text-sm text-gray-400 mb-4">Created on: {formattedDate}</p>

			<div className="flex space-x-4">
				<button
					onClick={() => {setUpdateTask({ _id, task, description, priority }); navigate("/add")}}
					className="cursor-pointer flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md"
				>
					<MdEdit />Edit
				</button>
				<button
					onClick={() => onDelete(_id)}
					className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
				>
					<MdDelete /> {isDeleting ? <PiSpinner size={20} className="animate-spin" /> : "Delete"}
				</button>

			</div>
		</div>
	);
};

export default TaskCard;
