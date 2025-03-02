/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Call your Express.js API for authentication

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok || !data.user) {
          throw new Error("Invalid credentials");
        }

        return {
          id: data.user.id,
          email: data.user.email,
          username: data.user.phone,
          phone: data.user.phone,
        }; // Return user data to store in the session
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.phone = user.phone;
      }
      console.log("JWT Token:", token); //
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.phone = token.phone;
      console.log("Session Object:", session);
      return session;
    },
  },
  events: {
    async signOut() {
      // Optionnel : rafraîchir les sessions côté serveur après la déconnexion
      await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/logout`, {
        method: "POST",
      });
    },
  },
  pages: {
    signIn: "/auth",
    //error: "/auth/error", // Redirect to your custom auth page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
