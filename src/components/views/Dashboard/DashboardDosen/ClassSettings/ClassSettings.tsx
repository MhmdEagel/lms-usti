import { getClassroomGeneralDetailByClassId } from "@/data/classroom";
import Content from "./Content/Content";


export default async function ClassSettings({ classId }: { classId: string }) {
  const classDetail = await getClassroomGeneralDetailByClassId(classId)

  return (
    <div className="flex min-h-[450px]">
      <Content classId={classId} classDetail={classDetail!} />
    </div>
  );
}
