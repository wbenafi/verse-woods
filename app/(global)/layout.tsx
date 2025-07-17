import MobileNavBar from "@/components/mobile-nav-bar/MobileNavBar";
import Sidebar from "@/components/sidebar/Sidebar";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-primary flex justify-center relative overflow-y-auto max-h-[100dvh]">
      <div className="flex flex-row max-w-6xl mx-auto gap-x-10">
        <Sidebar className="hidden md:block" />
        <main className="max-w-7xl mx-3 md:mx-auto px-6 lg:px-10 py-8 flex-1 bg-background mt-3 mb-24 md:mb-10 md:mt-10 overflow-y-auto rounded-[40px]">
          {children}
        </main>
      </div>
      <MobileNavBar className="block md:hidden" />
    </div>
  );
}
