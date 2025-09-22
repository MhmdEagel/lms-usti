import { Card, CardContent } from "@/components/ui/card";
import ClassroomHeader from "@/components/layouts/ClassroomDetailLayout/ClassroomHeader/ClassroomHeader";
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
  classId,
  type,
}: {
  children: React.ReactNode;
  classroom: Classroom;
  classId: string;
  type: "dosen" | "mahasiswa";
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
          type={type}
          class_code={classroom.class_code}
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
          <ClassroomDetailLayoutNavbar type={type} classId={classId} />
          {/* classroom content */}
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
