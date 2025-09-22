import { editClassroomSchema } from "@/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Kelas } from "@prisma/client";
import { useForm } from "react-hook-form";
import { getTimeString } from "@/lib/utils";
import { editDetailClassroom } from "@/actions/edit-detail-classroom";
import { toast } from "sonner";
import { IEditClassroom } from "@/types/Kelas";



export const useDetail = (classId: string, classDetail: Kelas) => {
    console.log(classId)
  const editForm = useForm({
    resolver: zodResolver(editClassroomSchema),
    defaultValues: {
      class_name: classDetail.class_name,
      room_number: classDetail.room_number,
      time_start: getTimeString(classDetail.time_start),
      time_end: getTimeString(classDetail.time_end),
      day: classDetail.day.toString(),
    },
  });

  const handleEdit = async (data: IEditClassroom) => {
    const res = await editDetailClassroom({ classId, classData: data });

    if (res.success && !res.error) {
      toast.success(res.success);
      return;
    }

    toast.error(res.error);
  };
  return {
    editForm,
    handleEdit,
  };
};
