import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";


const createUser = catchAsync( async (req: Request , res: Response )=>{

    const result = await UserServices.createUser(req.body)
        sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "user created successfully",
        data : result,
    })
})

const getAllUsers = catchAsync(async (req: Request , res: Response)=>{

    const result = await UserServices.getAllUsers()

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : "user retrieved successfully",
        data : result.data,
        meta : result.meta
    })
})

export const UserController = {
    createUser,
    getAllUsers
}
