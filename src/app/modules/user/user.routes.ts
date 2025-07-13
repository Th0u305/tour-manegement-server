import { Router } from "express";
import { UserController } from "./user.controller";

export const UserRoutes = Router()

UserRoutes.post("/register", UserController.createUser)
UserRoutes.get("/", UserController.getAllUsers)