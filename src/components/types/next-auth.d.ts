/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username?: string;
      phone?: string;
      name?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id: string;
    email: string;
    username?: string;
    phone?: string;
  }
}
