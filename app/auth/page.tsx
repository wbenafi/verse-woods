import { AuthCard } from "@/components/auth/AuthCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return <AuthCard />;
}