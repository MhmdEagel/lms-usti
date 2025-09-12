import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotFound from "@/components/views/NotFound/NotFound";
import { getDayName, getTimeString } from "@/lib/utils";
import {
  Book,
  ClipboardList,
  Megaphone,
  Pen,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import ClassroomMembers from "./ClassroomMembers/ClassroomMembers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ShareClassroomCode from "./ShareClassroomCode/ShareClassroomCode";

interface PropTypes {
  slug: string;
}

export default async function ClassroomDetail(props: PropTypes) {
  const { slug } = props;
  const classroom = await getClassroomBySlug(slug);
  if (!classroom) {
    return <NotFound />;
  }
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
        <CardContent className="bg-white/80 pt-4 pb-8 absolute bottom-0 left-0 right-0 border">
          <div className="font-bold text-primary text-lg">
            {classroom.class_name}
          </div>
          <div>Ruangan {classroom.room_number}</div>
          <div>
            {getDayName(classroom.day)}, {getTimeString(classroom.time_start)} -{" "}
            {getTimeString(classroom.time_end)}
          </div>
          <div>{classroom.dosen.fullname}</div>
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
          <ShareClassroomCode classroomCode={classroom.id} />
        </div>
      </Card>
      <Card>
        <CardContent>
          <Tabs defaultValue="pengumuman">
            <TabsList className="bg-transparent p-0 rounded-none my-6 sm:my-0 w-full">
              <div className="border-b-2 broder-black w-full">
                <TabsTrigger className="p-3" value="pengumuman">
                  <Megaphone /> <span>Pengumuman</span>
                </TabsTrigger>
                <TabsTrigger className="p-3" value="materi">
                  <Book size={20} />
                  <span>Materi</span>
                </TabsTrigger>
                <TabsTrigger className="p-3" value="tugas">
                  <ClipboardList size={20} />
                  <span>Tugas</span>
                </TabsTrigger>
                <TabsTrigger className="p-3" value="mahasiswa">
                  <Users size={20} />
                  <span>Mahasiswa</span>
                </TabsTrigger>
                <TabsTrigger className="p-3" value="pengaturan">
                  <Settings size={20} />
                  <span>Pengaturan</span>
                </TabsTrigger>
              </div>
            </TabsList>
            <TabsContent className="mt-8 sm:mt-4" value="pengumuman">
              Ini halaman pengumuman
            </TabsContent>
            <TabsContent className="mt-8 sm:mt-4" value="materi">
              Ini halaman materi
            </TabsContent>
            <TabsContent className="mt-8 sm:mt-4" value="tugas">
              Ini halaman tugas
            </TabsContent>
            <TabsContent className="mt-8 sm:mt-4" value="mahasiswa">
              {<ClassroomMembers />}
            </TabsContent>
            <TabsContent className="mt-8 sm:mt-4" value="pengaturan">
              Ini halaman pengaturan
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
