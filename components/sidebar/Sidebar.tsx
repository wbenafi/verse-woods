import Link from "next/link";
import { Lightbulb, NotebookPen, NotebookText } from "lucide-react";
import { VerseWoodsIcon } from "../icons/VerseWoodsIcon";
import { LoginLogoutButton } from "../auth/LoginLogoutButton";
import { cn } from "@/lib/utils";

export default function Sidebar({ className }: { className?: string }) {

  return (
    <nav className={cn("w-60 bg-background my-10 rounded-[40px] py-8", className)}>
      <div className="flex flex-col gap-y-4 h-full">
        <div className="flex flex-row items-center gap-x-2 justify-center">
          <VerseWoodsIcon className="w-14 h-14 text-primary" />
          <h2 className={`text-2xl font-bold text-primary text-fraunces`}>
            Verse <br /> Woods
          </h2>
        </div>
        <div className="flex flex-col gap-y-2 justify-between h-full mt-5">
          <div className="flex flex-col">
            <Link
              href="/letras/new"
              className={`py-4 text-lg text-fraunces bg-accent text-primary rounded-lg mx-4 flex items-center justify-center hover:bg-primary/10 transition-all duration-300 mb-2`}
            >
              <NotebookPen className="w-6 h-6 mr-2" />
              Escribir
            </Link>
            <Link
              href="/letras"
              className={`w-full py-4 text-lg text-fraunces text-primary flex items-center justify-center hover:bg-primary/10 transition-all duration-300`}
            >
              <NotebookText className="w-6 h-6 mr-2" />
              Letras
            </Link>
            <Link
              href="/ideas"
              className={`w-full py-4 text-lg text-fraunces text-primary flex items-center justify-center hover:bg-primary/10 transition-all duration-300`}
            >
              <Lightbulb className="w-6 h-6 mr-2" />
              Ideas
            </Link>
          </div>
          <LoginLogoutButton className="mx-6" />
        </div>
      </div>
    </nav>
  );
}
