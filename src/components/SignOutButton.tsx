"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import Button from "./ui/Button";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setisSigningOut] = useState<boolean>(false);
  return (
    <Button
      {...props}
      className="w-max justify-between mb-4"
      onClick={async () => {
        setisSigningOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error("There was a problem signing out.");
        } finally {
          setisSigningOut(false);
        }
      }}
    >
      Signout
      {isSigningOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
