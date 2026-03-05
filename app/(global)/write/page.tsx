import MainLayout from "@/components/layout/MainLayout";
import { IdeaEditor } from "@/components/ideas/IdeaEditor";

export default async function WritePage({
  searchParams,
}: {
  searchParams: Promise<{ ideaId?: string }>;
}) {
  const { ideaId } = await searchParams;

  return (
    <MainLayout rightCards={[]}>
      <IdeaEditor ideaId={ideaId} />
    </MainLayout>
  );
}
