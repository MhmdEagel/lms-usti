import { Card, CardContent } from "@/components/ui/card";
import ClassroomHeader from "@/components/views/Dashboard/DashboardDosen/Classroom/ClassroomDetail/ClassroomHeader/ClassroomHeader";
import { UserDetail } from "@/types/User";
import { Kelas } from "@prisma/client";
import Image from "next/image";
import ClassroomDetailLayoutNavbar from "./ClassroomDetailLayoutNavbar/ClassroomDetailLayoutNavbar";

interface Classroom extends Kelas {
  dosen: UserDetail;
}

export default function ClassroomDetailLayout({
  children,
  classroom,
  slug,
}: {
  children: React.ReactNode;
  classroom: Classroom;
  slug: string
}) {
  return (
    <div className="space-y-4">
      <Card className="min-h-[250px] bg-blue-100 relative pt-1">
        <Image
          className="mx-auto block"
          src={"/images/ilustration/classroom/basic.svg"}
          width={250}
          height={250}
          alt="Classroom Cover"
        />
        <ClassroomHeader
          class_id={classroom.id}
          class_name={classroom.class_name}
          day={classroom.day}
          dosen={classroom.dosen}
          room_number={classroom.room_number}
          time_start={classroom.time_start}
          time_end={classroom.time_end}
        />
      </Card>
      <Card>
        <CardContent>
          <ClassroomDetailLayoutNavbar slug={slug} />
          {/* classroom content */}
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
