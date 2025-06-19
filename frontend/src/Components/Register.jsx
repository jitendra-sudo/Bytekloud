import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post("http://localhost:3000/reg", { name, email, password })
			const data = res.data;
			if (res.status === 201) {
				setMessage(data.message || "Registration successful");
				setEmail("");
				setPassword("");
				setName("");
			}
			setTimeout(() => {
				setMessage("");
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			setError(error.response.data.message);
			setTimeout(() => {
				setError("");
			}, 2000);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form onSubmit={handleRegister} className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

				<div className="mb-4">
					<label className="block mb-1 text-gray-600">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

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
					className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
				>
					{loading ? "Registering..." : "Register"}
				</button>
				{error && <p className="mt-4 bg-red-300 p-2 rounded-md text-black">{error}</p>}
				{message && <p className="mt-4 bg-green-300 p-2 rounded-md text-black">{message}</p>}
				<p className="mt-4">already have an account? <Link to="/login" className="text-blue-500 font-bold">Login</Link></p>
			</form>
		</div>
	);
};

export default Register;
