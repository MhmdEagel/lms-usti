import MaterialDetail from "@/components/common/MaterialDetail/MaterialDetail"

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ materiId: string }>
}) {
  const {materiId} = await params

  return (
    <MaterialDetail materiId={materiId}  />
  )
}
