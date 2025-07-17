export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary flex justify-center items-center w-full">
      {children}
    </div>
  );
}
