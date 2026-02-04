import httpStatus from "http-status-codes";
import { generateToken, verifyToken } from "./jwt.js";
import config from "../../config/index.js";
import type { JwtPayload } from "jsonwebtoken";
import AppError from "../errorsHelpers.ts/AppError.js";
import type { User } from "../../../prisma/generated/prisma/client.js";

export const createTokens = (user: User) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwtSecret,
    config.jwtExpires,
  );
  const refreshToken = generateToken(
    jwtPayload,
    config.jwtRefreshSecret,
    config.jwtRefreshExpires,
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string,
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    config.jwtRefreshSecret,
  ) as JwtPayload;

  const existingUser = await User.findOne({
    email: verifiedRefreshToken.email,
  });
  if (!existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email don't exists.");
  }
  if (existingUser.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked");
  }
  const jwtPayload = {
    userId: existingUser._id,
    email: existingUser.email,
    role: existingUser.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwtSecret,
    config.jwtExpires,
  );
  return accessToken;
};
