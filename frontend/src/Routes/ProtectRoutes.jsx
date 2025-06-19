import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ContextAPI } from '../Context/ContextProvider'

const ProtectRoutes = ({ children }) => {
	const { isAuth } = useContext(ContextAPI);
	return isAuth ? children : <Navigate to="/login" />
}

export default ProtectRoutes