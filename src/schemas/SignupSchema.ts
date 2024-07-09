import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "username must be at least 3 characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
});
