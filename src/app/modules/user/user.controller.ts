import { Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


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

const updateUser = catchAsync(async (req: Request , res: Response)=>{

    const userId = req.params.id
    const verifiedToken = req.user
    const payload = req.body
    const result = await UserServices.updateUser(userId,payload,verifiedToken as JwtPayload)

    sendResponse(res,{
        success : true,
        statusCode : httpStatus.CREATED,
        message : "user updated successfully",
        data : result,
    })
})

const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})

export const UserController = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
}
