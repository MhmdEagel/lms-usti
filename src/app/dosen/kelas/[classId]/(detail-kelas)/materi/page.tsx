import Material from "@/components/views/Dashboard/Classroom/ClassroomAnnouncement/Material/Material";

export default async function MateriPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return (
    <Material classId={classId} />
  )
}
