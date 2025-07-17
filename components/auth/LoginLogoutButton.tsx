"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LoginLogoutButton({ className }: { className?: string }) {
  const { signOut, user } = useAuth();

  return (
    <Button variant="outline" className={cn("mx-4", className)} onClick={() => signOut()}>
      {user ? (
        <>
          <LogOut className="w-4 h-4 mr-2" onClick={() => signOut()} />
          Salir
        </>
      ) : (
        <Link href="/auth" className="flex items-center">
          <LogIn className="w-4 h-4 mr-2" />
          Iniciar sesión
        </Link>
      )}
    </Button>
  );
}
