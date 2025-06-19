import { Router } from "express";
import { getUser, userLogin, userRegistration } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/reg", userRegistration);
userRoutes.post("/login", userLogin);
userRoutes.get("/profile", authMiddleware, getUser);

export default userRoutes;

