import { AuthCard } from "@/components/auth/AuthCard";
import { createClient } from "@/utils/subabase/server";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return <AuthCard />;
}