import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addTasks, deteleTask, editTask, getAllTask } from "../controllers/task.controller.js";

const taskRoutes = Router();

taskRoutes.post("/add", authMiddleware, addTasks);
taskRoutes.get("/all", authMiddleware, getAllTask);
taskRoutes.put("/edit", authMiddleware, editTask);
taskRoutes.delete("/delete/:taskId", authMiddleware, deteleTask);

export default taskRoutes;
