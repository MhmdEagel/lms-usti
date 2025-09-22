import ClassroomAnnouncement from "@/components/views/Dashboard/Classroom/ClassroomAnnouncement/ClassroomAnnouncement";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ClassroomAnnouncement slug={slug} />;
}
