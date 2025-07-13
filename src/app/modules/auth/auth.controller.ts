import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus  from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync( async ( req: Request, res: Response, next : NextFunction)=>{

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "User logged in successfully",
        data : loginInfo
    })
})

export const AuthController = {
    credentialsLogin
}