import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

const App = () => {
  return (
	<div>
		<Navbar />
		<AllRoutes />
		<Footer />
	</div>
  )
}

export default App