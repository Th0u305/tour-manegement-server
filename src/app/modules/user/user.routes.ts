import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import checkAuth from "../../middleware/check.auth";
import { Role } from "./user.interface";
import checkUpdateAuth from "../../middleware/checkUpdateAuth";

export const UserRoutes = Router()

UserRoutes.post("/register", validateRequest(createUserZodSchema), UserController.createUser)
UserRoutes.get("/all-users", checkAuth("ADMIN", "SUPER_ADMIN"), UserController.getAllUsers)
UserRoutes.patch("/update-user/:id", validateRequest(updateUserZodSchema), checkUpdateAuth(), checkAuth(...Object.values(Role)), UserController.updateUser)