import { useContext } from "react"
import { Link } from "react-router-dom"
import { ContextAPI } from "../Context/ContextProvider"

const Home = () => {
	const { isAuth } = useContext(ContextAPI);
	return (
		<div className="flex items-center justify-center h-[500px]">
			<Link to={"/dashboard"}>
				<button className="cursor-pointer bg-green-500 font-bold text-xl border-2 border-black rounded px-6 py-2">
					{isAuth ? "Dashboard" : "Login to Dashboard"}
				</button>
			</Link>
		</div>
	)
}

export default Home