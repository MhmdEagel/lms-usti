import getCurrentUser from "@/lib/auth";
import { getAllClassroomByMahasiswaId } from "@/data/classroom";
import ClassroomItem from "@/components/common/ClassroomItem/ClassroomItem";

export default async function ListKelas() {
  const user = await getCurrentUser();
  const classes = await getAllClassroomByMahasiswaId(user?.id as string)

  if(!classes) return null;

  const {kelasMahasiswa} = classes

  if (kelasMahasiswa.length > 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {kelasMahasiswa.map((classroom) => (
          <ClassroomItem type="mahasiswa" key={classroom.id} classroom={classroom} />
        ))}
      </div>
    );
  }
}
