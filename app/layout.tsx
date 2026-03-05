import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

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
        <ClerkProvider>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
