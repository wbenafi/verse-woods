export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-primary flex justify-center items-center w-full">
      {children}
    </div>
  );
}
