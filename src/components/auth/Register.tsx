"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import React, { FormEvent, useState } from "react";
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
import { User } from "../types/UserTypes";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState<User>({
    email: "",
    password: "",
    username: "",
    phone: "",
  });
  const [confirmP, setConfirmP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(formData);
      toast.success("Registration successful!", {
        style: {
          background: "green",
        },
      });
      setFormData({
        email: "",
        password: "",
        username: "",
        phone: "",
      });
      setConfirmP("");
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          background: "red",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className=" py-7 px-7">
      <CardHeader className="flex flex-row items-center justify-center">
        <h1 className="text-lg font-bold">Inscription</h1>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            className="h-11"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Entrez votre nom d'utilisateur"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            className="h-11"
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Entrez votre téléphone"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            className="h-11"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            className="h-11"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Entrez votre mot de passe"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            className="h-11"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmP}
            onChange={(e) => setConfirmP(e.target.value)}
            type="password"
            placeholder="Confirmez votre mot de passe"
            required
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 justify-center">
        <Button
          className="w-full  "
          onClick={handleSubmit}
          disabled={!(confirmP === formData.password)}
        >
          {isLoading ? <Loader2 /> : "S'inscrire"}
        </Button>
        <AuthButtons />
      </CardFooter>
    </Card>
  );
}

export default Register;
