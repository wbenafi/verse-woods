import MobileNavBar from "@/components/mobile-nav-bar/MobileNavBar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-primary flex justify-center relative overflow-y-auto max-h-[100dvh]">
      <div className="flex flex-row gap-x-5 max-h-full justify-center">
        <Sidebar className="hidden md:block" />
        {children}
      </div>
      <MobileNavBar className="block md:hidden" />
    </div>
  );
}
