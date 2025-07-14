import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelper/AppError";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes"
import { User } from "../modules/user/user.model";

const checkUpdateAuth = () => async (req: Request, res: Response, next: NextFunction) => {

  try {

    const accessToken = req.headers.authorization;
    const paramsId = req.params.id
    
    if (!accessToken) {
      throw new AppError(403, "No token Received");
    }
    
    
    const verifiedToken = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload;
    const isUserExist = await User.findOne({_id : verifiedToken._id})

    if (paramsId) {
        if (verifiedToken._id !== paramsId || isUserExist?._id.toString() !== paramsId) {

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

        throw new AppError(httpStatus.BAD_REQUEST, "You're not authorized")
      }
    }

    next();

  } catch (error) {
    next(error);
  }
};
export default checkUpdateAuth;
