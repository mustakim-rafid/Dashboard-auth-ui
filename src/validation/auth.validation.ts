import z from "zod"

export const loginUserZodSchema = z.object({
    email: z.email().nonempty("Email is required"),
    password: z.string().min(6, "Password must be 6 characters long")
});