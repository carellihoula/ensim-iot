import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Rediriger vers /auth si l'utilisateur n'est pas connecté
    return NextResponse.redirect(new URL("/auth", req.url));
  },
  {
    pages: {
      signIn: "/auth", // Page d'authentification
    },
  }
);

// 🔒 Appliquer le middleware uniquement aux routes protégées
export const config = {
  matcher: ["/"], // Bloque uniquement la page "/"
};
