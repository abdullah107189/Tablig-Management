import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import AppError from "../errorsHelpers.ts/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import config from "../../config/index.js";
export const checkAuth =
  (...authRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
          throw new AppError(403, "No Token Received");
        }
        const verifiedToken = verifyToken(
          accessToken,
          config.jwtSecret,
        ) as JwtPayload;
        if (!verifiedToken) {
          throw new AppError(403, "You are not authorized");
        }

        const existingUser = await User.findOne({
          email: verifiedToken.email,
        });
        if (!existingUser) {
          throw new AppError(httpStatus.BAD_REQUEST, "Email don't exists.");
        }
        if (existingUser.isBlocked) {
          throw new AppError(httpStatus.BAD_REQUEST, "You are Blocked");
        }

        if (!authRoles.includes(verifiedToken.role)) {
          throw new AppError(403, "You are not permitted to view this role!!!");
        }
        req.user = verifiedToken;
        next();
      } catch (error) {
        next(error);
      }
    };
