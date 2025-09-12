import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getDayName, getTimeString } from "@/lib/utils";
import { UserDetail } from "@/types/User";
import { Pen } from "lucide-react";
import ShareClassroomCode from "../ShareClassroomCode/ShareClassroomCode";

interface PropTypes {
  class_id: string;
  class_name: string;
  room_number: number;
  day: number;
  time_start: Date;
  time_end: Date;
  dosen: UserDetail
}
export default function ClassroomHeader(props: PropTypes) {
  const {class_id, class_name, room_number, day, time_start, time_end, dosen} = props
  return (
    <>
        <CardContent className="bg-white/80 pt-4 pb-8 absolute bottom-0 left-0 right-0 border">
          <div className="font-bold text-primary text-lg">
            {class_name}
          </div>
          <div>Ruangan {room_number}</div>
          <div>
            {getDayName(day)}, {getTimeString(time_start)} -{" "}
            {getTimeString(time_end)}
          </div>
          <div>{dosen.fullname}</div>
        </CardContent>
        <div className="absolute top-2 right-2 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"}>
                <Pen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Kelas</p>
            </TooltipContent>
          </Tooltip>
          <ShareClassroomCode classroomCode={class_id} />
        </div>

    </>
  )
}
