import InputDialog from "@/components/ui/input-dialog";

export default function MaterialHeader({
  userRole,
  classId,
}: {
  userRole: string | undefined;
  classId: string;
}) {
  return (
    <>
      <div className="pb-4 border-b-2 flex items-center">
        <div className="text-xl font-semibold">Materi Kelas</div>
        {userRole === "DOSEN" ? <InputDialog classId={classId} /> : null}
      </div>
    </>
  );
}
