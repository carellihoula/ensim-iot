"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthButtons from "./AuthButtons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "https://ensim-iot.onrender.com/",
    });
    setIsLoading(false);
  };

  return (
    <Card className=" py-7 px-7">
      <CardHeader className="flex flex-row items-center justify-center">
        <h1 className="text-lg font-bold">Connexion</h1>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className="h-11"
            id="email"
            name="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            className="h-11"
            id="password"
            name="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Link href={"/dd#"}>
          <p className="text-green-600 hover:underline text-right">
            vous avez oublié votre mot de passe ?
          </p>
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-center">
        <Button className="w-full" onClick={handleSubmit}>
          {isLoading ? <Loader2 /> : "Se Connecter"}
        </Button>
        <AuthButtons />
      </CardFooter>
    </Card>
  );
}

export default Login;
