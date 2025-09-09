import { Mahasiswa } from "@/types/Kelas";
import ClassroomMemberItem from "./ClassroomMemberItem/ClassroomMemberItem";
interface PropTypes {
  listMahasiswa?: Mahasiswa[];
}
export default function ClassroomMembers(props: PropTypes) {
  const { listMahasiswa } = props;

  if (!listMahasiswa) {
    return <div className="h-32 flex justify-center items-center text-center">
      Belum ada yang bergabung ke dalam kelas.
    </div>
  }
  
  return (
    <div className="mt-4">
      <div className="flex flex-col gap-8">
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
