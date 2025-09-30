"use server";

import getCurrentUser from "@/lib/auth";
import dayjs from "dayjs";
import generateJoinCode from "@/lib/classroom";
import { prisma } from "@/lib/db";
import { INewClassroom } from "@/types/Kelas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export const createNewClassroom = async (data: INewClassroom) => {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");
  if (user.role !== "DOSEN") throw new Error("Unauthorized");

  const { class_name, day, room_number, time_start, time_end, semester } = data;
  const timeStartDateObj = dayjs(`10-10-2010 ${time_start}`);
  const timeEndDateObj = dayjs(`10-10-2010 ${time_end}`);
  try {
    await prisma.kelas.create({
      data: {
        class_code: generateJoinCode(),
        class_name,
        day,
        semester,
        slug: slugify(class_name),
        room_number,
        time_start: timeStartDateObj.toISOString(),
        time_end: timeEndDateObj.toISOString(),
        dosen: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    revalidatePath("/dosen/kelas");
    return { success: "Kelas berhasil dibuat" };
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
  }
};
