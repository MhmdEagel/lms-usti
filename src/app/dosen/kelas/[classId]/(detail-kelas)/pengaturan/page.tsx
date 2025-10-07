import ClassSettings from "@/components/views/Dashboard/DashboardDosen/ClassSettings/ClassSettings";


export default async function PengaturanPage({
  params,
}: {
  params: Promise<{ classId: string }>
}) {
  const {classId} = await params
  return (
   <ClassSettings classId={classId} />
  )
}
