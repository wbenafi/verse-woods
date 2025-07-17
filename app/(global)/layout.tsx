import Sidebar from "@/components/sidebar/Sidebar";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary flex justify-center">
      <div className="flex flex-row max-w-6xl mx-auto gap-x-10">
        <Sidebar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 flex-1 bg-background my-10 overflow-y-auto rounded-[40px]">
          {children}
        </main>
      </div>
    </div>
  );
}
