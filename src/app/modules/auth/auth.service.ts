import AppError from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"
import { createUserToken } from "../../utils/user.token";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";


const credentialsLogin = async (payload:Partial<IUser>) => {
    
    const { email, password } = payload

    const isUserExist = await User.findOne({email})

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User already Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string , isUserExist.password as string)

      if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect password")
    }

    const userToken = createUserToken(isUserExist)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass , ...rest} = isUserExist

    return{
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    }   
}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) =>{

    const user = await User.findById(decodedToken._id)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user?.password as string)

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old password does not match");
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user?.save()
}


export const AuthServices = {
    credentialsLogin,
    resetPassword
}