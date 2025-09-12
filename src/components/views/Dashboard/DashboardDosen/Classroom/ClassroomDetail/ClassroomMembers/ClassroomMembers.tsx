import { Mahasiswa } from "@/types/Kelas";
import ClassroomMemberItem from "./ClassroomMemberItem/ClassroomMemberItem";
import { getClassroomMahasiswaBySlug } from "@/data/classroom";



export default async function ClassroomMembers({slug}: {slug: string}) {
  const listMahasiswa: Mahasiswa[] | undefined  = await getClassroomMahasiswaBySlug(slug);
  if (!listMahasiswa) {
    return <div className="h-32 flex justify-center items-center text-center">
      Belum ada yang bergabung ke dalam kelas.
    </div>
  }
  return (
    <div className="mt-4 space-y-6">
      <div className="flex flex-col gap-4 border-b-2 pb-6">
        <div className="text-lg font-bold">Anda</div>
        <ClassroomMemberItem fullname={"Asuka Matsumoto"} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">Mahasiswa</div>
        {listMahasiswa?.map((mahasiswa) => (
          <ClassroomMemberItem
            key={mahasiswa.id}
            fullname={mahasiswa.fullname}
          />
        ))}
      </div>
    </div>
  );
}
