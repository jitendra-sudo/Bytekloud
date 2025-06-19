import dotenv from "dotenv";
import app from "./app/app.js";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
	.then(() => {
		console.log(`🚀 [Startup Success]: Database connected successfully! Server is starting...`);
		app.listen(PORT || 3000, () => {
			console.log(`🌐 [Server Running]: Application is live on http://${process.env.HOST}:${PORT}`);
		});
	})
	.catch((error) => {
		console.error(`❌ [Startup Error]: Unable to start the server due to database connection issues. Error: ${error.message}`);
	});
