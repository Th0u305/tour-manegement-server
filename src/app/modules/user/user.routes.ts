import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

export const UserRoutes = Router()

UserRoutes.post("/register", validateRequest(createUserZodSchema), UserController.createUser)
UserRoutes.get("/", UserController.getAllUsers)