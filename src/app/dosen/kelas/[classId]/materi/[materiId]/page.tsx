export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ materiId: string }>
}) {
  const {materiId} = await params

  return (
    <div>Ini halaman Material Detail</div>
  )
}
