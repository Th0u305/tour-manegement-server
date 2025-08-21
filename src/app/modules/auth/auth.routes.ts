import { Router } from "express";
import { AuthController } from "./auth.controller";
import checkAuth from "../../middleware/check.auth";
import { Role } from "../user/user.interface";
import googlePassportAuthenticate from "../../middleware/googlePassportAuthenticate";
import passport from "passport";
import { envVars } from "../../config/env";

const AuthRoute = Router()

AuthRoute.post("/login", AuthController.credentialsLogin)
AuthRoute.post("/refresh-token", AuthController.getNewAccessToken)
AuthRoute.post("/logout", AuthController.logout)
AuthRoute.post("/change-password", checkAuth(...Object.values(Role)) , AuthController.changePassword)
AuthRoute.post("/reset-password", checkAuth(...Object.values(Role)) , AuthController.resetPassword)
AuthRoute.post("/set-password", checkAuth(...Object.values(Role)) , AuthController.setPassword)
AuthRoute.post("/forgot-password", AuthController.forgotPassword)
AuthRoute.get("/google",googlePassportAuthenticate())
AuthRoute.get("/google/callback", passport.authenticate("google", {failureRedirect : `${envVars.FRONTEND_URL}?error=There some issues with your account. Please contact with our support team`}) , AuthController.googleCallbackController)

export default AuthRoute