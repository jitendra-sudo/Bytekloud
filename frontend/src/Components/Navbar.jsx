import { useContext } from 'react'
import { ContextAPI } from '../Context/ContextProvider'
import { FaPlus, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { isAuth, setIsAuth, user, setUser, setAccessToken, setUpdateTask } = useContext(ContextAPI);
	const navigate = useNavigate();
	return (
		<nav className='flex justify-between items-center shadow-md p-4'>
			<Link to="/">
				<h1 className='text-5xl font-extrabold uppercase'>logo</h1>
			</Link>
			<div className='flex gap-4 items-center'>
				{isAuth &&
					<button
						className='flex items-center gap-2 px-5 py-2 rounded-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer'
						onClick={() => {navigate("/add");setUpdateTask(null)}}
					>
						<FaPlus size={20} />
						Add Task
					</button>
				}
				{isAuth &&
					<button
						className='flex items-center gap-2 px-5 py-2 rounded-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer'
					>
						<FaUser size={20} />
						{user?.name}
					</button>
				}
				{isAuth ?
					<button
						className='flex items-center gap-2 px-5 py-2 rounded-xs bg-red-500 text-white hover:bg-red-600 cursor-pointer'
						onClick={() => {
							localStorage.clear();
							setIsAuth(false);
							setUser(null);
							setAccessToken(null);
							navigate("/login");
						}}
					>
						Logout
					</button>
					:
					<button
						className='flex items-center gap-2 px-5 py-2 rounded-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer'
						onClick={() => navigate("/login")}
					>
						Login
					</button>
				}
				{!isAuth &&
					<button
						className='flex items-center gap-2 px-5 py-2 rounded-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer'
						onClick={() => navigate("/register")}
					>
						Singup
					</button>
				}
			</div>
		</nav>
	)
}

export default Navbar