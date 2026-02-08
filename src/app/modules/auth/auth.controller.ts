// ==============================
// 14) src/modules/auth/auth.controller.ts
// ==============================
import httpStatus from "http-status";
import type { Request, Response } from "express";
import { AuthServices } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import { sendResponse } from "../../utils/sendResponse.js";

const register = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthServices.register(req.body);
    setAuthCookie(res, result.tokens);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        data: result.user,
        message: "User created successfully",
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.login(req.body);
    setAuthCookie(res, result.tokens);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        data: result.user,
        message: "Login successful",
    });
});

// const refresh = catchAsync(async (req: Request, res: Response) => {
//     const refreshToken = (req.cookies?.refreshToken as string | undefined) || req.body?.refreshToken;
//     if (!refreshToken) throw new AppError(httpStatus.UNAUTHORIZED, "No refresh token");

//     const { accessToken } = await AuthServices.refresh(refreshToken);

//     // update only access cookie
//     res.cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: false, // set true in prod via config if you want
//         sameSite: "lax",
//         path: "/",
//     });

//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         data: { accessToken },
//         message: "Access token refreshed",
//     });
// });

// const logout = catchAsync(async (req: Request, res: Response) => {
//     // Optional: invalidate refresh across devices if logged-in
//     // await AuthServices.logout(req.user?.sub);
//     clearAuthCookie(res);

//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: "Logged out",
//     });
// });

// export const AuthControllers = { register, login, refresh, logout };
export const AuthControllers = { register, login };
