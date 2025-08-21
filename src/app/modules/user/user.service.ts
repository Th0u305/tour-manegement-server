import AppError from "../../errorHelper/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) =>{

    const { email, password , ...rest } = payload

    const isUserExist = await User.findOne({email})

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string , Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = {provider: "credentials", providerId : email as string}

    const user = await User.create({
        email,
        password : hashedPassword,
        auths : [authProvider],
        ...rest
    })
    return user
}

const getAllUsers = async () =>{
    const users = await User.find({})
    const totalUsers = await User.countDocuments()
    return {
        data : users,
        meta : {
            total : totalUsers
        }
    }
}

const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) =>{

    const isUserExists = await User.findById(userId)

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }
    
    if (payload.role) {
        if (decodedToken.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
        if (payload.role === Role.SUPER_ADMIN || payload.role === Role.ADMIN && decodedToken.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }
    if (payload.isVerified || payload.isActive || !payload.isDeleted) {
        if (decodedToken.role !== Role.SUPER_ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized")
        }
    }
    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password, Number(envVars.BCRYPT_SALT_ROUND))
    }
    const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators : true})

    return newUpdateUser
}

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
        data: user
    }
};


export const UserServices = {
    createUser,
    getAllUsers,
    updateUser,
    getMe
}