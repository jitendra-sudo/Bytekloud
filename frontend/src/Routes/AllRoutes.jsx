import { Route, Routes } from "react-router-dom"
import Login from "../Components/Login"
import Register from "../Components/Register"
import Home from "../Pages/Home"
import Dashboard from "../Components/Dashboard"
import ProtectRoutes from "./ProtectRoutes"
import AddTask from "../Components/AddTask"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<ProtectRoutes><Home /></ProtectRoutes>} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/dashboard" element={<ProtectRoutes><Dashboard /></ProtectRoutes>} />
			<Route path="/add" element={<ProtectRoutes><AddTask/></ProtectRoutes>}/>
		</Routes>
	)
}

export default AllRoutes