import AnnouncementSkeleton from "@/components/views/Dashboard/Classroom/ClassroomAnnouncement/AnnouncementSkeleton/AnnouncementSkeleton";
import ClassroomAnnouncement from "@/components/views/Dashboard/Classroom/ClassroomAnnouncement/ClassroomAnnouncement";
import { Suspense } from "react";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <>
      <Suspense fallback={<AnnouncementSkeleton />}>
        <ClassroomAnnouncement classId={classId} />
      </Suspense>
    </>
  );
}
