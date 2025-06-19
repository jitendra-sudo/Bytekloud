import { createContext, useState } from 'react'
export const ContextAPI = createContext();
const ContextProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
	const [isAuth, setIsAuth] = useState(!localStorage.getItem("accessToken") ? false : true);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [updateTask, setUpdateTask] = useState(null);
	return (
		<ContextAPI.Provider value={{ isAuth, setIsAuth, accessToken, setAccessToken, user, setUser, updateTask, setUpdateTask }}>
			{children}
		</ContextAPI.Provider>
	)
}

export default ContextProvider;