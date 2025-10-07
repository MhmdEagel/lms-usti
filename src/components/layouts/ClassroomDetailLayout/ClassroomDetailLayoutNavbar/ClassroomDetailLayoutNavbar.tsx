"use client";

import { usePathname } from "next/navigation";
import ClassroomDetailLayoutNavbarItem from "./ClassroomDetailLayoutNavbarItem";
import { Book, ListTodo, Megaphone, Settings, Users } from "lucide-react";

export default function ClassroomDetailLayoutNavbar({
  classId,
  type,
}: {
  classId: string;
  type: "dosen" | "mahasiswa";
}) {
  const pathname = usePathname();
  const url = `/${pathname.split("/").filter(Boolean).slice(0, 4).join("/")}`;

  return (
    <nav className="flex flex-col gap-2 mb-4">
      <div className="inline-flex w-full justify-center items-center p-0">
        <div className="w-full border-b-[1.5px]">
          <ClassroomDetailLayoutNavbarItem
            isActive={url === `/${type}/kelas/${classId}`}
            href={`/${type}/kelas/${classId}`}
          >
            <Megaphone size={16} />
            <span>Pengumuman</span>
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={url === `/${type}/kelas/${classId}/materi`}
            href={`/${type}/kelas/${classId}/materi`}
          >
            <Book size={16} />
            <span>Materi</span>
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={url === `/${type}/kelas/${classId}/tugas`}
            href={`/${type}/kelas/${classId}/tugas`}
          >
            <ListTodo size={16} />
            <span>Tugas</span>
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={url === `/${type}/kelas/${classId}/mahasiswa`}
            href={`/${type}/kelas/${classId}/mahasiswa`}
          >
            <Users size={16} />
            <span>Mahasiswa</span>
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={url === `/${type}/kelas/${classId}/pengaturan`}
            href={`/${type}/kelas/${classId}/pengaturan`}
          >
            <Settings size={16} />
            <span>Pengaturan</span>
          </ClassroomDetailLayoutNavbarItem>
        </div>
      </div> 
    </nav>
  );
}
