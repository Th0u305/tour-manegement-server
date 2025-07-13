import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoute = Router()

AuthRoute.post("/login", AuthController.credentialsLogin)

export default AuthRoute