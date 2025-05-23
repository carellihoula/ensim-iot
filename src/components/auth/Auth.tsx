import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Login";
import Login from "./Register";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="max-w-[650px] w-[90%] mx-auto ">
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="account" className="h-8">
          Connexion
        </TabsTrigger>
        <TabsTrigger value="password" className="h-8">
          Inscription
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
