import Link from "next/link";
import { Lightbulb, NotebookPen, NotebookText, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileNavBar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "w-full bg-background rounded-t-[40px] py-2 absolute bottom-0 left-0 right-0",
        className
      )}
    >
      <div className="flex flex-col gap-y-4 h-full">
        <div className="flex flex-row w-full justify-around">
          <Link
            href="/letras"
            className={`text-fraunces text-primary flex flex-col items-center justify-center hover:bg-primary/10 transition-all duration-300 text-sm gap-y-1 p-1`}
          >
            <NotebookText className="w-6 h-6" />
            Letras
          </Link>
          <Link
            href="/explorar"
            className={`text-fraunces text-primary flex flex-col items-center justify-center hover:bg-primary/10 transition-all duration-300 text-sm gap-y-1 p-1`}
          >
            <Search className="w-6 h-6" />
            Sala
          </Link>

          <Link
            href="/letras/new"
            className={`text-fraunces text-primary flex flex-col items-center justify-center hover:bg-primary/10 transition-all duration-300 text-sm gap-y-1 bg-accent rounded-xl py-2 px-4 -mt-6`}
          >
            <NotebookPen className="w-6 h-6" />
            Escribir
          </Link>
          <Link
            href="/ideas"
            className={`text-fraunces text-primary flex flex-col items-center justify-center hover:bg-primary/10 transition-all duration-300 text-sm gap-y-1 p-1`}
          >
            <Lightbulb className="w-6 h-6" />
            Ideas
          </Link>
          <Link
            href="/perfil"
            className={`text-fraunces text-primary flex flex-col items-center justify-center hover:bg-primary/10 transition-all duration-300 text-sm gap-y-1 p-1`}
          >
            <User className="w-6 h-6" />
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  );
}
