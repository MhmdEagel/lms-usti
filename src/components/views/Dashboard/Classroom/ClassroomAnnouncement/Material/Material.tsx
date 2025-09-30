import getCurrentUser from "@/lib/auth";
import MaterialHeader from "./MaterialHeader/MaterialHeader";
import { getAllMateriByClassId } from "@/data/materi";
import MaterialItem from "./MaterialItem/MaterialItem";

export default async function Material({ classId }: { classId: string }) {
  const user = await getCurrentUser();
  const listMateri = await getAllMateriByClassId(classId);
  console.log(listMateri);

  return (
    <>
      <MaterialHeader classId={classId} userRole={user?.role} />
      <div className="mt-4">
        {listMateri.map((item) => (
          <MaterialItem
          key={item.id}
          materialId={item.id}
            title={item.title}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </>
  );
}
