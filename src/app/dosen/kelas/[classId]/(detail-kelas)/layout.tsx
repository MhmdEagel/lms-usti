import ClassroomDetailLayout from "@/components/layouts/ClassroomDetailLayout/ClassroomDetailLayout";
import { getClassroomDetailByClassId } from "@/data/classroom";

export default async function ClassroomDetailMainLayout({ children, params }: { children: React.ReactNode, params: Promise<{classId: string}> }) {  
  const {classId} = await params
  const classroomData = await getClassroomDetailByClassId(classId);
  return (
    <ClassroomDetailLayout type="dosen" classId={classId} classroom={classroomData!}>
      {children}
    </ClassroomDetailLayout>
  )
}
