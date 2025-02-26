"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CustomDialog } from "../dialogs/CustomDialog";
import InputWithIcon from "../custom-ui/InputWithIcon";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { CiLock } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";

type DialogType = "edit-profile" | "change-password" | null;

export function DropdownMenuComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { data: session } = useSession();
  const openDialog = (type: DialogType) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };
  const handleConfirm = () => {
    if (dialogType === "edit-profile") {
      console.log("Profile updated:", formData.name, formData.email);
    } else if (dialogType === "change-password") {
      console.log(
        "Password changed:",
        formData.currentPassword,
        formData.newPassword
      );
    }
    setIsDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      await signOut({ callbackUrl: "/auth" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <DropdownMenu>
      <div className="flex items-center gap-1 font-bold ">
        <span className="truncate w-38 uppercase hover:underline text-sm">
          {session?.user?.name}
        </span>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-10 h-10 p-0 border-none">
            {/* Avatar */}
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://i.pravatar.cc/150?img=3"
                alt="User Avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => openDialog("edit-profile")}>
            <User className="mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openDialog("change-password")}>
            <Lock className="mr-2" />
            <span>Modifier le mot de passe</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* Dialog réutilisable */}
      <CustomDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title={
          dialogType === "edit-profile" ? "Edit Profile" : "Change Password"
        }
        description="Modify your account details."
        onConfirm={handleConfirm}
      >
        {dialogType === "edit-profile" && (
          <div className="grid gap-4">
            <InputWithIcon
              icon={FaUser}
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <InputWithIcon
              icon={MdEmail}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        )}

        {dialogType === "change-password" && (
          <div className="grid gap-4">
            <InputWithIcon
              icon={CiLock}
              type="password"
              placeholder="Entrez votre mot de passe actuel"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
            />
            <InputWithIcon
              icon={CiLock}
              type="password"
              placeholder="Entrez le nouveau mot de passe"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />

            <InputWithIcon
              icon={CiLock}
              type="password"
              placeholder="Confirmez le mot de passe"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
        )}
      </CustomDialog>
    </DropdownMenu>
  );
}
