"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthButtons from "./AuthButtons";
import Link from "next/link";

function Login() {
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
          <Label htmlFor="name">Username</Label>
          <Input
            className="h-11"
            id="name"
            placeholder="Entrez votre username"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <Input className="h-11" id="name" placeholder="Entrez votre email" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            className="h-11"
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Confirme Password</Label>
          <Input
            className="h-11"
            id="password"
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

export default Login;
