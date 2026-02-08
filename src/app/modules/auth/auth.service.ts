
import httpStatus from "http-status";
import { prisma } from "../../../../lib/prisma.js";
import AppError from "../../errorsHelpers.ts/AppError.js";
import { hashPassword, verifyPassword } from "./auth.password.js";
import { type User } from "../../../../prisma/generated/prisma/client.js";
import { createTokens } from "../../utils/manageTokens.js";

export interface LoginInput {
    email: string;
    password: string;
}
const register = async (payload: User) => {
    const existing = await prisma.user.findUnique({ where: { email: payload.email as string } });
    if (existing) throw new AppError(httpStatus.FORBIDDEN, "Already existed!");

    const passwordHash = await hashPassword(payload.password);

    const user = await prisma.user.create({
        data: { ...payload, password: passwordHash },
        select: { id: true, email: true, phone: true, globalRole: true, isBlocked: true, isActive: true, name: true, memberships: true },
    });

    if (!user) throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user");
    const mosqueInfo = await prisma.mosqueMembership.findFirst({
        where: { userId: user.id }, select: { mosqueId: true, mosqueRole: true },
    });
    const tokens = createTokens(user, mosqueInfo ? { mosqueId: mosqueInfo.mosqueId, mosqueRole: mosqueInfo.mosqueRole } : undefined);

    return { user, tokens };
};

const login = async (payload: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
        select: { id: true, email: true, phone: true, globalRole: true, isBlocked: true, name: true, password: true },
    });

    if (!user) throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    if (user.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "User is blocked");

    const ok = await verifyPassword(payload.password, user?.password);
    if (!ok) throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");

    const tokens = createTokens(user);

    // hide passwordHash in response
    const { password, ...safeUser } = user;

    return { user: safeUser, tokens };
};

// const refresh = async (refreshToken: string) => {
//     const accessToken = await createNewAccessTokenWithRefreshToken(refreshToken);
//     return { accessToken };
// };

// const logout = async (userId?: string) => {
//     // OPTIONAL: logout-all support (invalidate refresh tokens)
//     if (userId) {
//         await prisma.user.update({
//             where: { id: userId },
//             data: { tokenVersion: { increment: 1 } },
//         });
//     }
//     return true;
// };

// export const AuthServices = { register, login, refresh, logout };
export const AuthServices = { register, login };
