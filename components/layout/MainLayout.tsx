import NoteBookEffect from "./NoteBookEffect";

export default function MainLayout({
  children,
  rightCards,
}: {
  children: React.ReactNode;
  rightCards: React.ReactNode[];
}) {
  return (
    <>
    
      <div className="w-auto mx-3 px-6 lg:px-10 py-8 flex-shrink-0 bg-background mt-3 mb-24 md:mb-10 md:mt-10 overflow-visible rounded-[40px] relative max-h-full aspect-[3/4]">
        <NoteBookEffect className="absolute top-8 -left-2 h-full overflow-hidden max-h-[calc(100dvh-150px)]" />
        <div className="overflow-y-auto h-full max-h-full">{children}</div>
      </div>
      <div className="flex flex-col gap-y-5">
        {rightCards.map((card, index) => (
          <div key={index}>{card}</div>
        ))}
      </div>
    </>
  );
}
