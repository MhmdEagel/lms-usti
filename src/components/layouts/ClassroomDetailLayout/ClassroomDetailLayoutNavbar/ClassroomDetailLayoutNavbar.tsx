"use client";

import { usePathname } from "next/navigation";
import ClassroomDetailLayoutNavbarItem from "./ClassroomDetailLayoutNavbarItem";

export default function ClassroomDetailLayoutNavbar({
  slug,
}: {
  slug: string;
}) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 py-2 mb-4">
      <div className="inline-flex w-full justify-center items-center p-0 h-9">
        <div className="[&>*]:p-3 [&>*]:flex-1 [&>*]:inline-flex  w-full border-b-1">
          
          <ClassroomDetailLayoutNavbarItem
            isActive={pathname === `/dosen/kelas/${slug}`}
            href={`/dosen/kelas/${slug}`}
          >
            Pengumuman
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={pathname === `/dosen/kelas/${slug}/materi`}
            href={`/dosen/kelas/${slug}/materi`}
          >
            Materi
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={pathname === `/dosen/kelas/${slug}/tugas`}
            href={`/dosen/kelas/${slug}/tugas`}
          >
            Tugas
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={pathname === `/dosen/kelas/${slug}/mahasiswa`}
            href={`/dosen/kelas/${slug}/mahasiswa`}
          >
            Mahasiswa
          </ClassroomDetailLayoutNavbarItem>
          <ClassroomDetailLayoutNavbarItem
            isActive={pathname === `/dosen/kelas/${slug}/pengaturan`}
            href={`/dosen/kelas/${slug}/pengaturan`}
          >
            Pengaturan
          </ClassroomDetailLayoutNavbarItem>
          
        </div>
      </div>
    </nav>
  );
}
