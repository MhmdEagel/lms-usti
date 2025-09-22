"use server";

import { prisma } from "@/lib/db";
import { IPengumuman } from "@/types/Kelas";
import { revalidatePath } from "next/cache";

export const createNewAnnouncement = async (
  data: IPengumuman,
  userRole: string,
  userId: string,
  classId: string
) => {
  if (userRole !== "DOSEN") return { success: null, error: "Unauthorized" };
  const { title, content } = data;

  try {
    await prisma.pengumuman.create({
      data: {
        title,
        content,
        kelas: {
          connect: {
            id: classId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    revalidatePath(".")
    return { success: "Pengumuman berhasil dibuat", error: null };
  } catch (e) {
    console.error((e as Error).message);
    return { success: null, error: "Terjadi kesalahan" };
  }
};
