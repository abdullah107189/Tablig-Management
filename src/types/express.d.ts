import type { GlobalRole } from "../../prisma/generated/prisma/enums.ts";

declare global {
    namespace Express {
        interface Request {
            user?: {
                sub: string;
                email?: string;
                gRole: GlobalRole;
                mId: string | null;
                mRole: string | null;
            };
        }
    }
}

export { };