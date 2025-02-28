import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen } from "lucide-react";
import { DropdownMenuComponent } from "../account/DropdownMenuComponent";

export default function Header() {
  return (
    <header className="w-full p-2 flex justify-end items-center ">
      {/* Logo ENSIM */}

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-2 top-2.5 text-gray-500 "
            size={18}
          />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-8 w-64"
          />
        </div>
        <Button variant="outline" className="hidden md:flex">
          <BookOpen className="mr-2" size={18} />
          Documentation
        </Button>

        <DropdownMenuComponent />
      </div>
    </header>
  );
}
