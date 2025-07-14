import { Router } from "express";
import { AuthController } from "./auth.controller";
import checkAuth from "../../middleware/check.auth";
import { Role } from "../user/user.interface";

const AuthRoute = Router()

AuthRoute.post("/login", AuthController.credentialsLogin)
AuthRoute.post("/refresh-token", AuthController.getNewAccessToken)
AuthRoute.post("/logout", AuthController.logout)
AuthRoute.post("/reset-password", checkAuth(...Object.values(Role)) , AuthController.resetPassword)

export default AuthRoute