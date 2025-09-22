"use server";

import { prisma } from "@/lib/db";
import { IEditClassroom } from "@/types/Kelas";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

export const editDetailClassroom = async ({
  classId,
  classData,
}: {
  classId: string;
  classData: IEditClassroom;
}) => {
  console.log(classData, classId)
  const { class_name, day, time_start, time_end, room_number } = classData;

   const timeStartDateObj = dayjs(`10-10-2010 ${time_start}`);
    const timeEndDateObj = dayjs(`10-10-2010 ${time_end}`);

  try {
    await prisma.kelas.update({
      where: {
        id: classId,
      },
      data: {
        class_name,
        room_number,
        day: parseInt(day),
        time_start: timeStartDateObj.toISOString(),
        time_end: timeEndDateObj.toISOString(),
      },
    });
    revalidatePath(".");
    return { success: "Perubahan berhasil disimpan", error: null };


  } catch (e) {
    console.error((e as Error).message);
    return { success: null, error: "Terjadi kesalahan." };
  }
};
