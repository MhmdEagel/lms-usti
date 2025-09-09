import ClassroomDetail from "@/components/views/Dashboard/DashboardDosen/Classroom/ClassroomDetail/ClassroomDetail";

export default async function ClassDetailPage({
  params
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params
  return <ClassroomDetail slug={slug} />;
}
