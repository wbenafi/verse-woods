import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Lightbulb, LucideTrees, NotebookPen } from "lucide-react";
import localFont from "next/font/local";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Sidebar from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verse Woods",
  description: "A modern writing app for your lyrics and ideas",
};

const fraunces = localFont({
  src: "./fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  display: "swap",
  variable: "--font-fraunces",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, fraunces.variable, "bg-background")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
