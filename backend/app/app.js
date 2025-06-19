import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoutes from "../routes/user.route.js";
import taskRoutes from "../routes/task.route.js";


const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.get("/health-check", (req, res) => res.status(200).send("Server is live..."));
app.use(userRoutes);
app.use(taskRoutes);

export default app;
