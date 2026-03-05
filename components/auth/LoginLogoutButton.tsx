"use client";

import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";

export function LoginLogoutButton({ className }: { className?: string }) {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <SignOutButton>
        <Button variant="poetic-ghost" className={cn("mx-4", className)}>
          <LogOut className="w-4 h-4 mr-2" />
          Salir
        </Button>
      </SignOutButton>
    );
  }

  return (
    <Button asChild variant="poetic-ghost" className={cn("mx-4", className)}>
      <Link href="/auth" className="flex items-center">
          <LogIn className="w-4 h-4 mr-2" />
          Iniciar sesión
      </Link>
    </Button>
  );
}
