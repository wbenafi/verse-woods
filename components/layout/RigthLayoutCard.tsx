export default function RightLayoutCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-60 mx-3 md:mx-auto px-6 lg:px-10 py-8 flex-shrink-0 bg-background mt-3 mb-24 md:mb-10 md:mt-10 rounded-[40px] relative max-h-full">
      {children}
    </div>
  );
}
