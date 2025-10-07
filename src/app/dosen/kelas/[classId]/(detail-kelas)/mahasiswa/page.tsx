
import ClassroomMembers from "@/components/common/ClassroomMembers/ClassroomMembers";
import MembersSkeleton from "@/components/common/ClassroomMembers/MembersSkeleton/MembersSkeleton";
import { Suspense } from "react";

export default async function MahasiswaPage({
  params,
}: {
  params: Promise<{ classId: string }>
}) {
  const {classId} = await params;
  return (
    <>
    <Suspense fallback={<MembersSkeleton />}>
      <ClassroomMembers classId={classId} />
    </Suspense>
    </>
  )
}
