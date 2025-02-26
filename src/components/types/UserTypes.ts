import { z } from "zod";
import { userSchema } from "./UserSchema";

// TypeScript type derived from the Zod schema
export type User = z.infer<typeof userSchema>;
