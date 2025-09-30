
import { CardContent } from "@/components/ui/card";
import { getDayName, getTimeString } from "@/lib/utils";
import { UserDetail } from "@/types/User";
import ShareClassroomCode from "../ShareClassroomCode/ShareClassroomCode";

interface PropTypes {
  class_code: string;
  class_name: string;
  room_number: number;
  day: number;
  time_start: Date;
  time_end: Date;
  dosen: UserDetail;
  type: "mahasiswa" | "dosen";
  semester: string;
}
export default function ClassroomHeader(props: PropTypes) {
  const {
    class_code,
    class_name,
    room_number,
    day,
    time_start,
    time_end,
    dosen,
    type,
    semester,
  } = props;


  return (
    <>
      <CardContent className="bg-white/80 pt-4 pb-8 absolute bottom-0 left-0 right-0 border">
        {}
        <>
          <div className="font-bold text-primary text-lg">{class_name}</div>
          <div>Ruangan {room_number}</div>
          <div>Semester {semester}</div>
          <div>
            {getDayName(day)}, {getTimeString(time_start)} -{" "}
            {getTimeString(time_end)}
          </div>
          <div className="font-bold">{dosen.fullname}</div>
        </>
      </CardContent>
      <div className="absolute top-2 right-2 flex gap-2">
        {type === "dosen" ? (
          <ShareClassroomCode classroomCode={class_code} />
        ) : null}
      </div>
    </>
  );
}
