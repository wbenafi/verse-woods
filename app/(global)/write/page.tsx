import MainLayout from "@/components/layout/MainLayout";
import RightLayoutCard from "@/components/layout/RigthLayoutCard";

export default function WritePage() {
  return (
    <>
      <MainLayout rightCards={[
        <RightLayoutCard id="right-layout-card-1">
          <div>
            <h2>
              Ideas
            </h2>
          </div>
        </RightLayoutCard>,
      ]}>
        <div className="mb-8">
          <h2
            className={`text-2xl md:text-3xl font-bold text-primary text-fraunces`}
          >
            Hola! Escribe lo que sea, y deja que tu espíritu fluya en cada verso
          </h2>
        </div>
      </MainLayout>
    </>
  );
}
