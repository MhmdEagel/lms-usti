import { getClassroomAnnouncementByClassId } from "@/data/classroom";
import getCurrentUser from "@/lib/auth";
import AddAnnouncement from "./AddAnnouncement/AddAnnouncement";
import AnnouncementItem from "./AnnouncementItem/AnnouncementItem";

export default async function ClassroomAnnouncement({
  classId,
}: {
  classId: string;
}) {
  const listPengumuman = await getClassroomAnnouncementByClassId(classId);
  const user = await getCurrentUser();

  console.log(classId);

  if (listPengumuman && listPengumuman?.length > 0) {
    return (
      <>
        <AddAnnouncement
          userRole={user?.role}
          classId={classId}
          userId={user?.id}
        />
        <div className="mt-4">
          {listPengumuman.map((pengumuman) => (
            <AnnouncementItem
              key={pengumuman.id}
              user={pengumuman.user}
              content={pengumuman.content}
              annId={pengumuman.id}
            />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <AddAnnouncement
        userId={user?.id}
        userRole={user?.role}
        classId={classId}
      />
      <div className="h-32 flex justify-center items-center text-center">
        Belum ada pengumuman kelas.
      </div>
    </>
  );
}
