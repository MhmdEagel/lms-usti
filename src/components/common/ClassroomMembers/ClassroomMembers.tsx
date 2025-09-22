import React from "react";
import { getClassroomMahasiswaByClassId } from "@/data/classroom";
import MemberItem from "./MemberItem/MemberItem";
import getCurrentUser from "@/lib/auth";

export default async function ClassroomMembers({
  classId,
}: {
  classId: string;
}) {
  const dataKelas = await getClassroomMahasiswaByClassId(classId);
  const user = await getCurrentUser();
  if (!dataKelas) {
    return (
      <div className="h-32 flex justify-center items-center text-center">
        Terjadi kesalahan. Periksa jaringan anda
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-6">
      <div className="flex flex-col gap-4 border-b-2 pb-6">
        <div className="text-lg font-bold">
          {user?.role !== "DOSEN" ? "Dosen" : "Anda"}
        </div>
        <MemberItem
          userRole={user?.role}
          userId=""
          fullname={dataKelas.dosen?.fullname}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">Mahasiswa</div>
        {dataKelas.mahasiswa && dataKelas.mahasiswa.length > 0 ? (
          dataKelas.mahasiswa?.map((mahasiswa) => (
            <MemberItem
              userRole={user?.role}
              userId={user?.id}
              key={mahasiswa.id}
              fullname={mahasiswa.fullname}
            />
          ))
        ) : (
          <div className="h-24 flex justify-center items-center text-center">
            Belum ada yang bergabung ke dalam kelas
          </div>
        )}
      </div>
    </div>
  );
}
