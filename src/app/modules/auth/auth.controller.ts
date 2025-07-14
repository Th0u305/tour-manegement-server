import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus  from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { createNewAccessTokenWithRefreshToken } from "../../utils/user.token";
import { setAuthCookie } from "../../utils/setCookie";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync( async ( req: Request, res: Response, next : NextFunction)=>{

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    await setAuthCookie(res, loginInfo)

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "User logged in successfully",
        data : loginInfo
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync( async ( req: Request, res: Response, next : NextFunction)=>{

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token received from cookies")
    }

    const tokenInfo =  await createNewAccessTokenWithRefreshToken(refreshToken)

    await setAuthCookie(res, tokenInfo)

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "New access token retrieved successfully successfully",
        data : tokenInfo
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logout = catchAsync( async ( req: Request, res: Response, next : NextFunction)=>{

    res.clearCookie("accessToken", {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    })

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "User logged out successfully",
        data : null
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resetPassword = catchAsync( async ( req: Request, res: Response, next : NextFunction)=>{

    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword
    const decodedToken = req.user

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken)

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "Password changed successfully",
        data : null
    })
})

export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword
}