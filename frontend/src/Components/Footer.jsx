import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link to="/" className="text-2xl font-extrabold uppercase">Logo</Link>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex space-x-6 text-sm mb-4 md:mb-0">
          <Link to="#" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-gray-300 transition">Dashboard</Link>
          <Link to="/add" className="hover:text-gray-300 transition">Add Task</Link>
        </div>

        <div className="flex space-x-4">
          <Link to="#" className="hover:text-blue-500 transition">Instagram</Link>
          <Link to="#" className="hover:text-blue-400 transition">Facebook</Link>
          <Link to="#" className="hover:text-pink-500 transition">Linkedin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
