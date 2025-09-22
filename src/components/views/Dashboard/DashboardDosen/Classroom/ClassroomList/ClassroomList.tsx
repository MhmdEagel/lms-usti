import ClassroomItem from "@/components/common/ClassroomItem/ClassroomItem";
import { getAllClassroomByDosenId } from "@/data/classroom";
import getCurrentUser from "@/lib/auth";
import Image from "next/image";

export default async function ClassroomList() {
  const user = await getCurrentUser();
  const classes = await getAllClassroomByDosenId(user?.id)
  if (classes.length > 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {classes.map((classroom) => (
          <ClassroomItem type="dosen" key={classroom.id} classroom={classroom} />
        ))}
      </div>
    );
  }

  return (
      <div className="flex flex-col h-screen items-center justify-center gap-4 select-none">
        <Image
          src={"/images/ilustration/empty-class-dosen.svg"}
          alt="Kelas Kosong"
          width={250}
          height={250}
        />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-1">
            Tidak ada kelas
          </h2>
          <p className="text-gray-500">
            Sepertinya anda belum menambahkan kelas apapun.
          </p>
        </div>
      </div>
  );
}
