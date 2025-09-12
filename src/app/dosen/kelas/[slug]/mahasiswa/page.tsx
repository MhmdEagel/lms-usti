import ClassroomMembers from "@/components/views/Dashboard/DashboardDosen/Classroom/ClassroomDetail/ClassroomMembers/ClassroomMembers";
import { Suspense } from "react";

export default async function MahasiswaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const {slug} = await params;
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <ClassroomMembers slug={slug} />
    </Suspense>
    </>
  )
}
