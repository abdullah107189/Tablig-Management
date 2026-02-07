
import bcrypt from "bcrypt";
import config from "../../../config/index.js";


export const hashPassword = async (plain: string) => {
    const salt = Number(config.saltRound) || 10;
    return bcrypt.hash(plain, salt);
};
export const verifyPassword = async (plain: string, hash: string) => bcrypt.compare(plain, hash);
