import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContextAPI } from "../Context/ContextProvider";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setIsAuth, setUser } = useContext(ContextAPI);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:3000/login", { email, password })
			const data = res.data;
			if (res.status === 200) {
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("user", JSON.stringify(data.user));
				setIsAuth(true);
				setUser(data.user);
				setEmail("");
				setPassword("");
				setMessage(data.message || "Login successful");
			}
			setTimeout(() => {
				navigate("/");
				setMessage("");
			}, 1000);
		} catch (error) {
			setError(error.response.data.message);
			console.error(error);
			setTimeout(() => {
				setError("");
			}, 2000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

				<div className="mb-4">
					<label className="block mb-1 text-gray-600">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div className="mb-6">
					<label className="block mb-1 text-gray-600">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
				>
					{loading ? "Logging in..." : "Login"}
				</button>

				{message && <p className="bg-green-300 p-2 rounded-md mt-4 text-black">{message}</p>}
				{error && <p className="bg-red-300 p-2 rounded-md mt-4 text-black">{error}</p>}
				<p className="mt-4">don't have an account? <Link to="/register" className="text-blue-500 font-bold">Register</Link></p>
			</form>
		</div>
	);
};

export default Login;
