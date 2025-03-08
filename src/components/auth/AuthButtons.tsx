"use client";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Utilisation de React Icons pour les logos
import { signIn } from "next-auth/react";

const AuthButtons = () => {
  return (
    <div className="flex space-x-4 justify-center  w-full">
      {/* Bouton GitHub */}
      <Button
        variant="outline"
        className="flex items-center text-sm font-medium border-gray-300 w-full"
        onClick={() => signIn("github")}
      >
        <FaGithub className="mr-2 text-gray-800" />
        GitHub
      </Button>
    </div>
  );
};

export default AuthButtons;
