import ClassroomDetailLayout from "@/components/layouts/ClassroomDetailLayout/ClassroomDetailLayout";
import { getClassroomDetailBySlug } from "@/data/classroom";

export default async function ClassroomDetailMainLayout({ children, params }: { children: React.ReactNode, params: Promise<{slug: string}> }) {  
  const {slug} = await params
  const classroomData = await getClassroomDetailBySlug(slug);
  return (
    <ClassroomDetailLayout type="mahasiswa" slug={slug} classroom={classroomData!}>
      {children}
    </ClassroomDetailLayout>
  )
}
