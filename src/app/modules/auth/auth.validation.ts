
import { z } from "zod";

export const registerValidationSchema = z.object({
    body: z.object({
        name: z.string("Name is required").min(2, "Name is too short"),

        phone: z.string("Phone number is required").min(10, "Phone number is too short").max(15, "Phone number is too long"),

        email: z.string().email("Invalid email").optional().nullable(),

        password: z.string("Password is required").min(6, "Password must be at least 6 characters"),
    }),
});