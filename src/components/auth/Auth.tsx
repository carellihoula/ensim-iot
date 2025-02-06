"use client";
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
import Register from "./Register";
import Login from "./Login";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="max-w-[650px] w-[90%] mx-auto ">
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="account" className="h-8">
          Login
        </TabsTrigger>
        <TabsTrigger value="password" className="h-8">
          Register
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Register />
      </TabsContent>
      <TabsContent value="password">
        <Login />
      </TabsContent>
    </Tabs>
  );
}
