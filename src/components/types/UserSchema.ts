import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  phone: z.string(), //regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
