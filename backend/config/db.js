import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DBNAME}`);
		console.log(`✅ [Database Connected]: Connected to MongoDB Database ${process.env.DBNAME}, HOST: ${connectionInstance.connection.host}`);
	} catch (error) {
		console.error(`❌ [Database Connection Error]: Failed to connect to the database. Error: ${error.message}`);
		throw new Error(`❌ Database connection failed!`);
	}
};

export default connectDB;

