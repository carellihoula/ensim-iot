"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

type UserLoginType = {
  email: string;
  password: string;
  username: string;
};

function Register() {
  const [userLoginData, setUserLoginData] = useState<UserLoginType>({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [confirmP, setConfirmP] = useState("");
  return (
    <Card className=" py-7 px-7">
      <CardHeader className="flex flex-row items-center justify-end">
        <CardDescription>
          <span>Vous avez déjà un compte ?</span>
          <Link href={"/dd#"}>
            <strong className="text-green-600 hover:underline text-right">
              Connectez-vous ici
            </strong>
          </Link>
        </CardDescription>
      </CardHeader>
      <AuthButtons />
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            className="h-11"
            id="username"
            name="username"
            value={userLoginData.username}
            onChange={handleChange}
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className="h-11"
            id="email"
            name="email"
            value={userLoginData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            className="h-11"
            id="password"
            name="password"
            value={userLoginData.password}
            onChange={handleChange}
            type="password"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirme Password</Label>
          <Input
            className="h-11"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmP}
            onChange={(e) => setConfirmP(e.target.value)}
            type="password"
            placeholder="Confirmez votre mot de passe"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="w-full h-11">S'inscrire</Button>
      </CardFooter>
    </Card>
  );
}

export default Register;
